export class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }

    hash(key) {
        let hashCode = 0;

        const primeNum = 31;
        for(let i = 0; i < key.length; i ++) {
            hashCode = primeNum * hashCode + key.charCodeAt(i) % this.capacity;
        }

        return hashCode;
    }

    bucket(key) {
        let hash = this.hash(key);
        return this.buckets[hash % this.buckets.length];
    }

    entry(bucket, key) {
        for(let entry of bucket) {
            if(entry.key === key) {
                return entry;
            }
        }
        return null;
    }

    set(key, value) {
        let bucket = this.bucket(key);
        let entry = this.entry(bucket, key);
        if(entry) {
            entry.value = value;
            return;
        }
        bucket.push({ key, value });
    }

    get(key) {
        let bucket = this.bucket(key);
        let entry = this.entry(bucket, key);
        if(entry) {
            return entry.value;
        }
        return null;
    }
}

/*
Use the following snippet whenever you access a bucket through an index

if (index < 0 || index >= buckets.length) {
  throw new Error("Trying to access index out of bounds");
}

*/