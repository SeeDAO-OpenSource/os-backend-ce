// import { getCdkey, insertKeys } from '../api/dotbit/dotbit.cdkey';

// export async function generateSubDIDCdkeys(num: number) {
//   const cdkeys = new Set<string>();

//   while (cdkeys.size < num) {
//     const generatedKeys = generateKeys(num - cdkeys.size);
//     const existingKeys = await getExistingCdkeys(generatedKeys);

//     for (const key of generatedKeys) {
//       if (!existingKeys.has(key)) {
//         cdkeys.add(key);
//       }
//     }
//   }

//   await insertKeys(Array.from(cdkeys));
// }

// const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// function generateKeys(num: number): string[] {
//   const keys: string[] = [];

//   for (let i = 0; i < num; i++) {
//     let key = '';
//     for (let j = 0; j < 6; j++) {
//       const index = Math.floor(Math.random() * chars.length);
//       key += chars[index];
//     }
//     keys.push(key);
//   }

//   return keys;
// }

// async function getExistingCdkeys(keys: string[]): Promise<Set<string>> {
//   const existingKeys = new Set<string>();

//   const cdkeys = await getCdkey(keys);
//   for (const cdkey of cdkeys) {
//     existingKeys.add(cdkey);
//   }

//   return existingKeys;
// }