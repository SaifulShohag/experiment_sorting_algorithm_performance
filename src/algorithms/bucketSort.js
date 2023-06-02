import { nop } from "@/utils/datas";

export function bucketSort(arr) {
    const n = arr.length;
    if (n <= 1) return arr;

    let min = arr[0];
    let max = arr[0];
    for (let i = 1; i < n; i++) {
        if (arr[i] < min) {
            nop.total++; // number of operations performed
            min = arr[i];
        } else if (arr[i] > max) {
            nop.total++; // number of operations performed
            max = arr[i];
        }
    }

    const range = max - min + 1;
    const numBuckets = Math.ceil(Math.sqrt(n));

    const buckets = Array.from({ length: numBuckets }, () => []);

    for (let i = 0; i < n; i++) {
        const value = arr[i];
        const index = Math.floor((value - min) / range * numBuckets);
        buckets[index].push(value);

        nop.total++; // number of operations performed
    }

    const sortedArr = [];
    for (let i = 0; i < numBuckets; i++) {
        buckets[i].sort((a, b) => a - b);
        sortedArr.push(...buckets[i]);
        nop.total++; // number of operations performed
    }

    return sortedArr;
}