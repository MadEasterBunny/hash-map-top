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
            hashCode = primeNum * hashCode + key.charCodeAt(i);
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

    grow() {
        const oldEntries = this.entries();
        this.capacity *= 2;
        this.clear();
        oldEntries.forEach(entry => {
            this.set(entry.key, entry.value);
        })
    }

    set(key, value) {
        if(this.length() + 1 > this.capacity * this.loadFactor) {
            this.grow();
        }
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

    has(key) {
        let bucket = this.bucket(key);
        let entry = this.entry(bucket, key);
        if(entry) {
            if(entry.key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        let bucket = this.bucket(key);
        let index = bucket.findIndex(entry => entry.key === key);
        if(index !== -1) {
            bucket.splice(index, 1);
            return true;
        }
        return false;
    }

    length() {
        return this.buckets.reduce((acc, bucket) => {
            if(bucket) {
                return acc + bucket.length;
            }
        }, 0);
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }

    keys() {
        let keysArr = [];
        for(let entries of this.buckets) {
            for(let entry of entries) {
                keysArr.push(entry.key);
            }
        }
        return keysArr;
    }

    values() {
        let valuesArr = [];
        for(let entries of this.buckets) {
            for(let entry of entries) {
                valuesArr.push(entry.value);
            }
        }
        return valuesArr;
    }

    entries() {
        let entriesArr = [];
        for(let entries of this.buckets) {
            for(let entry of entries) {
                entriesArr.push(entry);
            }
        }
        return entriesArr;
    }
}