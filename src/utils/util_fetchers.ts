import { promises as fs } from 'fs';
import { existsSync } from 'fs';
import path from 'path';

/**
 * Supported image file extensions
 */
const SUPPORTED_IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'] as const;

/**
 * Type for supported image file extensions
 */
type ImageExtension = typeof SUPPORTED_IMAGE_EXTENSIONS[number];

/**
 * Configuration options for getImageUrls function
 */
interface GetImageUrlsOptions {
  /** Base URL for serving assets (defaults to GitHub raw URL) */
  baseUrl?: string;
  /** Whether to include subdirectories (defaults to false) */
  recursive?: boolean;
  /** Custom file extensions to include (extends default supported extensions) */
  additionalExtensions?: string[];
  /** GitHub repository details */
  github?: {
    owner: string;
    repo: string;
    branch?: string;
  };
}

/**
 * Result of the getImageUrls function
 */
interface GetImageUrlsResult {
  /** Array of image URLs */
  urls: string[];
  /** Number of images found */
  count: number;
  /** Directory path that was scanned */
  directoryPath: string;
}

/**
 * Validates if a folder name is safe from path traversal attacks
 * 
 * @param folderName - The folder name to validate
 * @returns True if the folder name is safe
 */
function isValidFolderName(folderName: string): boolean {
  // Check for path traversal patterns
  if (folderName.includes('..')) {
    return false;
  }
  
  // Check for absolute paths
  if (path.isAbsolute(folderName)) {
    return false;
  }
  
  // Check for drive letters (Windows)
  if (/^[a-zA-Z]:/.test(folderName)) {
    return false;
  }
  
  // Check for protocol schemes
  if (/^[a-zA-Z]+:\/\//.test(folderName)) {
    return false;
  }
  
  return true;
}

/**
 * Generates a GitHub raw URL for an image
 * 
 * @param folderName - The folder path
 * @param fileName - The file name
 * @param github - GitHub repository details
 * @returns GitHub raw URL
 */
function generateGitHubRawUrl(folderName: string, fileName: string, github?: GetImageUrlsOptions['github']): string {
  const defaultGithub = {
    owner: 'mal-sizu',
    repo: 'wa_funri_bot',
    branch: 'master'
  };
  
  const { owner, repo, branch } = github || defaultGithub;
  const encodedFolder = encodeURIComponent(folderName);
  const encodedFile = encodeURIComponent(fileName);
  
  return `https://github.com/${owner}/${repo}/blob/${branch}/assets/${encodedFolder}/${encodedFile}?raw=true`;
}

/**
 * Gets an array of image URLs from a specified folder within the 'assets' directory.
 *
 * @param folderName - The name of the folder inside the 'assets' directory.
 * @param options - Configuration options for the function.
 * @returns A promise that resolves to an object containing image URLs and metadata.
 * @throws {Error} When folderName is invalid or directory cannot be read.
 */
async function getImageUrls(
  folderName: string, 
  options: GetImageUrlsOptions = {}
): Promise<GetImageUrlsResult> {
  const {
    baseUrl,
    recursive = false,
    additionalExtensions = [],
    github
  } = options;

  // Validate input
  if (!folderName || typeof folderName !== 'string') {
    throw new Error('folderName must be a non-empty string');
  }

  // Prevent path traversal attacks with improved validation
  if (!isValidFolderName(folderName)) {
    throw new Error('Invalid folder name: path traversal not allowed');
  }

  // The path to the directory you want to read
  // Assets folder is at the root level, so we need to go up from src/utils/
  const directoryPath = path.join(__dirname, '..', '..', 'assets', folderName);
  const imageUrls: string[] = [];

  try {
    // Check if directory exists
    if (!existsSync(directoryPath)) {
      console.warn(`Directory does not exist: ${directoryPath}`);
      return {
        urls: imageUrls,
        count: 0,
        directoryPath
      };
    }

    // Get all supported extensions
    const allSupportedExtensions = [...SUPPORTED_IMAGE_EXTENSIONS, ...additionalExtensions];

    // Read all files in the directory
    const files = await fs.readdir(directoryPath);

    // Filter for image files and create the URL
    for (const file of files) {
      const fileExtension = path.extname(file).toLowerCase();
      
      if (allSupportedExtensions.includes(fileExtension as ImageExtension)) {
        // Generate the appropriate URL based on configuration
        let imageUrl: string;
        
        if (baseUrl) {
          // Use custom base URL
          imageUrl = `${baseUrl}${folderName}/${file}`;
        } else {
          // Use GitHub raw URL
          imageUrl = generateGitHubRawUrl(folderName, file, github);
        }
        
        imageUrls.push(imageUrl);
      }
    }

    // Handle recursive search if enabled
    if (recursive) {
      const subdirectories = await getSubdirectories(directoryPath);
      for (const subdir of subdirectories) {
        const subdirName = path.basename(subdir);
        const subdirOptions = { ...options, recursive: false };
        const subdirResult = await getImageUrls(`${folderName}/${subdirName}`, subdirOptions);
        imageUrls.push(...subdirResult.urls);
      }
    }

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('Error reading directory:', err);
    throw new Error(`Failed to read directory: ${errorMessage}`);
  }

  return {
    urls: imageUrls,
    count: imageUrls.length,
    directoryPath
  };
}

/**
 * Gets subdirectories within a given directory
 * 
 * @param directoryPath - Path to the directory to scan
 * @returns Promise that resolves to array of subdirectory paths
 */
async function getSubdirectories(directoryPath: string): Promise<string[]> {
  const subdirectories: string[] = [];
  
  try {
    const items = await fs.readdir(directoryPath, { withFileTypes: true });
    
    for (const item of items) {
      if (item.isDirectory()) {
        subdirectories.push(path.join(directoryPath, item.name));
      }
    }
  } catch (err) {
    console.warn(`Failed to read subdirectories in ${directoryPath}:`, err);
  }
  
  return subdirectories;
}

/**
 * Validates if a file extension is supported
 * 
 * @param extension - File extension to validate
 * @returns True if the extension is supported
 */
function isSupportedImageExtension(extension: string): extension is ImageExtension {
  return SUPPORTED_IMAGE_EXTENSIONS.includes(extension as ImageExtension);
}

export {
  getImageUrls,
  getSubdirectories,
  isSupportedImageExtension,
  SUPPORTED_IMAGE_EXTENSIONS,
  isValidFolderName,
  generateGitHubRawUrl
};

export type {
  GetImageUrlsOptions,
  GetImageUrlsResult,
  ImageExtension
};