export function radixSort(arr) {
    // Find the maximum number to know the number of digits
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        let val = arr[i];
        if (typeof val === 'object' && val.id !== undefined) {
            val = val.id;
        }
        if (typeof val === 'string') {
            val = parseInt(val);
        }
        max = Math.max(max, val);
    }
    let maxNumDigits = Math.floor(Math.log10(Math.abs(max))) + 1;

    for (let k = 0; k < maxNumDigits; k++) {
        let buckets = Array.from({ length: 10 }, () => []);
        for (let i = 0; i < arr.length; i++) {
            let digit;
            let val = arr[i];
            if (typeof val === 'object' && val.id !== undefined) {
                digit = Math.floor(Math.abs(val.id) / Math.pow(10, k)) % 10;
            } else if (typeof val === 'string') {
                digit = Math.floor(Math.abs(parseInt(val)) / Math.pow(10, k)) % 10;
            } else {
                digit = Math.floor(Math.abs(val) / Math.pow(10, k)) % 10;
            }
            buckets[digit].push(arr[i]);
        }
        arr = [].concat(...buckets);
    }
    return arr;
}
