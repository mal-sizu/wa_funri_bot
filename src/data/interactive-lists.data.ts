// src/data/interactive-lists.data.ts

// import { title } from "process";

// Define the structure of an interactive list payload for type safety
interface InteractiveListPayload {
    messaging_product: 'whatsapp';
    to: string;
    type: 'interactive';
    interactive: object;
  }
  
  // Define all your lists here
  const lists = {
    mainMenu: {
      type: 'list',
      header: { type: 'text', text: 'Small Notice to our island wide trusted Customers:' },
      body: { 
        text: `
          අපි මිල ඉතා සුළු ප්‍රමාණයක් වැඩි උසස් තත්වයක් නඩත්තු කරන  නිපැයුම්කරුවන් සමඟ පමණක් සම්බන්ද වන ආයතනයක්. තරමක් අඩු මිලට නිශ්පාදනය කරන නිපැයුම්කරුවන්ගෙ භාණ්ඩ වල පාරිභෝගික ගැටලු ඉහළ වීම ඊට හේතුවයි. එම මිලට ගෙන අවම මුදලට ලබාදීමෙන් ඉහළ විකිණුම් ප්‍රමාණයක් අපි අපේක්ශා කරනව. 

          ඉතින් මේ අපට ලබාදිය හැකි අවම මිල ගණන් වනවා සේම එවැනි විශේෂ මිලකට උසස් තත්වයෙ භාණ්ඩ ලබාගන්න ඔබට දැන් අවස්ථාවක් ලැබිල තියෙනව. 

          We are an organization that connects only with manufacturers who maintain high quality at a slightly higher price. The reason is that products from low-cost manufacturing tend to have more customer complaints. By offering these high-quality products at the lowest possible price, we aim to achieve higher sales volume.

          So, you now have the opportunity to get high-quality products from us at the lowest price.

          So, you now have the opportunity to get high-quality products from us at the lowest price.
        ` 
      },
      action: {
        button: 'Search 🔍',
        sections: [{
          rows: [
            {
              id: 'dressing-tables',
              title: '🪞 Dressing Tables',
              description: 'තේක්ක සහ මෙලමයින් | Teak & Melamine models for your selection.'
            },
            {
              id: 'beds',
              title: '🛏 Beds & Mattresses',
              description: 'තේක්ක, ඇක්ටෝනියා ඇඳන් | Spring, Form & Hybrid mattresses'
            },
            {
              id: 'room-packages',
              title: '📦 Bed Room Sets',
              description: 'ඇඳ, කබඩ්, මේස සමඟ | Complete sets with bed, cupboard & table.'
            },
            {
              id: 'tables',
              title: '🪑 Tables',
              description: 'තේක්ක, මෙලමයින් මේස | Teak, Melamine, and other wooden tables.'
            },
            {
              id: 'racks',
              title: '📚 Racks & Shelves',
              description: 'මෙලමයින් රාක්ක මාදිලි | Stylish Melamine racks and shelves.'
            },
            {
              id: 'sofa',
              title: '🛋 Sofa Sets | සෝෆා',
              description: 'Modern & classic designs. Fabric & leather options. විවිධ මාදිලි.'
            },
            {
              id: 'iron-cupboards',
              title: '🥌 Iron Cupboards | කබඩ්',
              description: 'ශක්තිමත් සහ ආරක්ෂිතයි | Durable & secure storage. Multiple sizes.'
            },
            {
              id: 'other-furniture',
              title: '🪄 වෙනත් | Other',
              description: 'පුටු, ස්ටෑන්ඩ් සහ තවත් | Stools, stands, and more furniture.'
            }
          ],
          }],
      },
    },
    wardrobeMenu: {
      type: 'list',
      header: { type: 'text', text: '🚪Browse Wardrobes | අල්මාරි මාදිලි' },
      body: {
         text: `Browse your Wardrobe ✨
                ඔබගේ සිතැඟි අල්මාරිය සොයාගන්න ✨` 
          },
      action: {
        button: 'Categories',
        sections: [{
          rows: [
            { id: 'melamine-two-door', title: '2 Door | දොර 2', description: '' },
            { id: 'melamine-three-door', title: '3 Door | දොර 3', description: '' },
            { id: 'melamine-four-door', title: '4 Door | දොර 4', description: '' },
            { id: 'steel-cupboards', title: 'Steel Cupboards | වානේ අල්මාරි', description: '' },
            { id: 'half-cupboards', title: 'Half Cupboards | භාග අල්මාරි', description: '' },
            { id: 'other-cupboards', title: 'Others | වෙනත්', description: '' },
          ],
        }],
      },
    },
    // Add more lists here as needed...
  };
  
  /**
   * Gets the full payload for a given list ID.
   * @param listId The ID of the list (e.g., 'mainMenu').
   * @param to The recipient's phone number.
   * @returns The complete WhatsApp API payload.
   */
  export function getListPayload(listId: keyof typeof lists, to: string): InteractiveListPayload | null {
    const listInteractiveData = lists[listId];
    if (!listInteractiveData) {
      return null;
    }
    return {
      messaging_product: 'whatsapp',
      to: to,
      type: 'interactive',
      interactive: listInteractiveData,
    };
  }