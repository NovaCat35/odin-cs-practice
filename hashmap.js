function hashMap(capacity = 16) {
   const bucket = Array(capacity);
   let loadFactor = 0.75;
   let itemCount = 0;

   const hash = (key) => {
       let hashCode = 0;
       const prime = 31;
       for (let i = 0; i < key.length; i++) {
           hashCode = (hashCode * prime + key.charCodeAt(i)) % capacity;
       }
       return hashCode;
   };

   const set = (key, value) => {
       const hashKey = hash(key);
       let currItem = bucket[hashKey];
       if (currItem === undefined) {
           bucket[hashKey] = { key, value };
       } else {
           while (true) {
               if (currItem.key === key) {
                   currItem.value = value;
                   return;
               }
               if (currItem.nextItem === null) {
                   currItem.nextItem = { key, value, nextItem: null };
                   break;
               }
               currItem = currItem.nextItem;
           }
       }
       itemCount++;
       const currentLoadFactor = itemCount / capacity;
       if (currentLoadFactor > loadFactor) {
           const newCapacity = capacity * 2;
           const newBucket = Array(newCapacity);
           bucket.forEach((item) => {
               let currentItem = item;
               while (currentItem !== null) {
                   const newHashKey = hash(currentItem.key) % newCapacity;
                   if (newBucket[newHashKey] === undefined) {
                       newBucket[newHashKey] = currentItem;
                   } else {
                       let newItem = newBucket[newHashKey];
                       while (newItem.nextItem !== null) {
                           newItem = newItem.nextItem;
                       }
                       newItem.nextItem = currentItem;
                   }
                   const nextItem = currentItem.nextItem;
                   currentItem.nextItem = null;
                   currentItem = nextItem;
               }
           });
           bucket = newBucket;
           capacity = newCapacity;
       }
   };

   const remove = (key) => {
       let index = hash(key);
       let currItem = bucket[index];
       if (currItem.key === key) {
           itemCount--;
           bucket[index] = currItem.nextItem === null ? undefined : currItem.nextItem;
           return true;
       }
       while (currItem.nextItem !== null) {
           if (currItem.nextItem.key === key) {
               itemCount--;
               currItem.nextItem = currItem.nextItem.nextItem;
               return true;
           }
           currItem = currItem.nextItem;
       }
       return false;
   };

   const length = () => itemCount;

   const clear = () => {
       for (let i = 0; i < bucket.length; i++) {
           bucket[i] = undefined;
       }
       itemCount = 0;
   };

   const keys = () => {
       const result = [];
       for (let i = 0; i < bucket.length; i++) {
           let currItem = bucket[i];
           while (currItem !== null && currItem !== undefined) {
               result.push(currItem.key);
               currItem = currItem.nextItem;
           }
       }
       return result;
   };

   const values = () => {
       const result = [];
       for (let i = 0; i < bucket.length; i++) {
           let currItem = bucket[i];
           while (currItem !== null && currItem !== undefined) {
               result.push(currItem.value);
               currItem = currItem.nextItem;
           }
       }
       return result;
   };

   const entries = () => {
       const result = [];
       for (let i = 0; i < bucket.length; i++) {
           let currItem = bucket[i];
           while (currItem !== null && currItem !== undefined) {
               result.push([currItem.key, currItem.value]);
               currItem = currItem.nextItem;
           }
       }
       return result;
   };

   return {
       hash,
       set,
       remove,
       length,
       clear,
       keys,
       values,
       entries,
   };
}


let newHashMap = new hashMap(4);
newHashMap.set("key1", "value1");
newHashMap.set("key2", "value2");
newHashMap.set("key3", "value3");

console.log(newHashMap.keys());
console.log(newHashMap.values());
console.log(newHashMap.entries());
console.log(newHashMap.length());
newHashMap.remove("key2");
console.log(newHashMap.keys());
newHashMap.clear();
console.log(newHashMap.keys());
