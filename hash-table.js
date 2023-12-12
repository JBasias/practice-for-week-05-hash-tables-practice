const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {


    this.count = 0;
    //this.length = numBuckets;
    this.capacity = numBuckets; // Number of buckets (size of the array)
    this.data = new Array(numBuckets).fill(null); // Initialize an array to store data
   // this.data.length = numBuckets;
    //this.count=0;
    // Your code here
  }

  hash(key) {

    const sha256Hash = sha256(key);
    const first8Chars = sha256Hash.substring(0, 8);
    return parseInt(first8Chars, 16);


    // Your code here
  }

  hashMod(key) {

    return this.hash(key)%this.capacity
    // Your code here
  }

  insertNoCollisions(key, value) {

    const index = this.hashMod(key);

    if (this.data[index] != undefined) {
      throw new Error('hash collision or same key/value pair already exists!');
    }

    if (this.data[index]!= undefined && this.data[index].key === key) {
      throw new Error('hash collision or same key/value pair already exists!');
    }

    this.data[index] = new KeyValuePair(key, value);
    this.count++;

    // Your code here
  }

  insertWithHashCollisions(key, value) {


    const index = this.hashMod(key);

    if (this.data[index] == null)
    {
      this.data[index] = new KeyValuePair(key, value);
    }
    else
    {

      let current = this.data[index];

      /*
      while (current.next)
      {
        current = current.next;
      }*/

      let add = new KeyValuePair(key, value);

      add.next = current;
      this.data[index]  = add;
    }


    this.count++;

    // Your code here
  }

  insert(key, value)
  {


    const index = this.hashMod(key);
    this.count++;

    if (this.data[index]) {
      // If a key already exists at this index, check if it matches the current key
      let current = this.data[index];


      while (current) {
        if (current.key === key) {
          // Update the value for the existing key
          current.value = value;
          return; // Exit the method after updating
        }
        current = current.next;
      }

      current = this.data[index];

      let add = new KeyValuePair(key, value);

      add.next = current;
      this.data[index]  = add;

      return;

    }

    this.data[index] = new KeyValuePair(key, value);
    return;

  }

}


module.exports = HashTable;
