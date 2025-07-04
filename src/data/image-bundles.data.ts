// src/data/image-bundles.data.ts

interface Image {
    url: string;
    caption: string;
  }
  
  // Define your image bundles here
  const bundles: Record<string, Image[]> = {
    electronics: [
      {
        url: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg',
        caption: 'High-performance laptops for work and play.'
      },
      {
        url: 'https://images.pexels.com/photos/3585093/pexels-photo-3585093.jpeg',
        caption: 'The latest smartphones with stunning cameras.'
      }
    ],
    clothing: [
      {
        url: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
        caption: 'Stylish and comfortable footwear.'
      },
      {
        url: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg',
        caption: 'Classic formal wear for any occasion.'
      },
      {
        url: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
        caption: 'Casual jackets for a modern look.'
      }
    ],
    // Add more bundles as needed
  };
  
  /**
   * Gets a specific image bundle by its ID.
   * @param bundleId The ID of the bundle (e.g., 'electronics').
   * @returns An array of Image objects or null if not found.
   */
  export function getImageBundle(bundleId: string): Image[] | null {
    return bundles[bundleId] || null;
  }