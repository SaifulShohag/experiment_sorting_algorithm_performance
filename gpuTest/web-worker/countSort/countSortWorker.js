function countingSort(arr) {
    const n = arr.length;
    if (n <= 1) return arr;

    let max = arr[0];
    for (let i = 1; i < n; i++) {
        if (arr[i] > max) {
            
            max = arr[i];
        }
    }

    const count = new Array(max + 1).fill(0);

    for (let i = 0; i < n; i++) {
        count[arr[i]]++;
    }

    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    const output = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
        
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    return output;
}

// Listen for messages from the main thread
onmessage = function (e) {
    var arr = e.data;
    var sorted = countingSort(arr);
    postMessage(sorted);
};