const testKey1 = process.env.TEST_API_KEY_PLAIN;
const testKey2 = process.env.TEST_API_KEY_SECRET;
const testKey3 = process.env.TEST_API_KEY_SENSITIVE;

console.log('testKey1: ', testKey1);
console.log('testKey2: ', testKey2);
console.log('testKey3: ', testKey3);

export const fetchIngredient = async (itemName: string) => {
  const response = await fetch(
    `https://api.example.com/grocery?name=${itemName}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch the grocery item');
  }
  return response.json();
};
