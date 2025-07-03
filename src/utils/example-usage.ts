import { getImageUrls } from './util_fetchers';

/**
 * Example usage of the getImageUrls function
 */
async function exampleUsage() {
  try {
    // Basic usage - now generates GitHub raw URLs by default
    console.log('=== Basic Usage (GitHub Raw URLs) ===');
    const basicResult = await getImageUrls('w2/w2d');
    console.log(`Found ${basicResult.count} images in w2/w2d`);
    console.log('GitHub Raw URLs:');
    basicResult.urls.forEach((url, index) => {
      console.log(`  ${index + 1}. ${url}`);
    });

    // Test with custom GitHub repository
    console.log('\n=== Custom GitHub Repository ===');
    const customGithubResult = await getImageUrls('w3/w3ld', {
      github: {
        owner: 'mal-sizu',
        repo: 'wa_funri_bot',
        branch: 'main'
      }
    });
    console.log(`Found ${customGithubResult.count} images in w3/w3ld`);
    console.log('Custom GitHub URLs:');
    customGithubResult.urls.slice(0, 2).forEach((url, index) => {
      console.log(`  ${index + 1}. ${url}`);
    });

    // Test with custom base URL (for local development)
    console.log('\n=== Custom Base URL (Local Development) ===');
    const localResult = await getImageUrls('w2/w2hc', {
      baseUrl: '/static/images/'
    });
    console.log(`Found ${localResult.count} images in w2/w2hc`);
    console.log('Local URLs:');
    localResult.urls.slice(0, 2).forEach((url, index) => {
      console.log(`  ${index + 1}. ${url}`);
    });

    // Recursive search with GitHub URLs
    console.log('\n=== Recursive Search (GitHub URLs) ===');
    const recursiveResult = await getImageUrls('w3', {
      recursive: true
    });
    console.log(`Found ${recursiveResult.count} images in w3 (recursive)`);
    console.log('Sample GitHub URLs:');
    recursiveResult.urls.slice(0, 3).forEach((url, index) => {
      console.log(`  ${index + 1}. ${url}`);
    });

    // Error handling
    console.log('\n=== Error Handling ===');
    try {
      await getImageUrls('nonexistent-folder');
    } catch (error) {
      console.log('Expected error for nonexistent folder:', error instanceof Error ? error.message : error);
    }

    // Test path traversal protection
    console.log('\n=== Security Test ===');
    try {
      await getImageUrls('../etc/passwd');
    } catch (error) {
      console.log('Security test passed - blocked path traversal:', error instanceof Error ? error.message : error);
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the example
exampleUsage().catch(console.error); 