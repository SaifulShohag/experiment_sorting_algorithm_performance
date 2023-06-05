function bucketSort(arr) {
    const n = arr.length;
    if (n <= 1) return arr;

    let min = arr[0];
    let max = arr[0];
    for (let i = 1; i < n; i++) {
        if (arr[i] < min) {
            
            min = arr[i];
        } else if (arr[i] > max) {
            
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
    }

    const sortedArr = [];
    for (let i = 0; i < numBuckets; i++) {
        buckets[i].sort((a, b) => a - b);
        sortedArr.push(...buckets[i]);
    }

    return sortedArr;
}

// Listen for messages from the main thread
onmessage = function (e) {
    var arr = e.data;
    var sorted = bucketSort(arr);
    postMessage(sorted);
};