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
        url: 'https://photos.fife.usercontent.google.com/pw/AP1GczNYoNCa1kAunzG3wpRYH7qE9AaNRC7r3WtLoponrK23cRtMZBGvtN0=w488-h651-s-no-gm?authuser=0',
        caption: 'Stylish and comfortable footwear.'
      },
      {
        url: 'https://drive.google.com/file/d/11A-C94f9GKp6YgG8AdW_7jL4nn1Oxoua/view?usp=sharing',
        caption: 'Classic formal wear for any occasion.'
      },
      {
        url: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
        caption: 'Casual jackets for a modern look.'
      }
    ],
    wardrobes: [
      {
        url: '',
        caption: `
          CATALOGUE

          Hi! Welcome to Furnistore!

          අඩුවට තියෙන බාල මෙලමයින් අල්මාරි වලින් එහා යමක් සාදාරණ ගානට ඔයත් හොයනවද? ඔයාගෙ අල්මාරියත් මෙතන ඇති👇

          Our Wardrobe collection: 

          👑   5 YEARS WARRANTY 
          🛠   Made with high grade melamine. 
          🟡   12 mm Thickness

          💸 CASH ON DELIVERY 
          🚛 Island wide delivery 

          🟡 different designs 

          2 Door | 3 Door | 4 Door
          - With drawers
          - Without drawres 
          - 2 drawer types 
          - With mirror 
          - Without mirrors 

          🟡 different colors of your choice
          - Teak Brown 
          - White 
          - American Ash
          - Black
        `,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
      {
        url: '',
        caption: ``,
      },
    ]
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