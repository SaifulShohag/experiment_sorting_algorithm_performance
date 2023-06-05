function radixSort(arr) {
    const n = arr.length;
    if (n <= 1) return arr;

    let max;
    let maxLength = 0;
    const dataType = typeof arr[0];

    if(dataType === 'string') {
        for (let i = 0; i < n; i++) {
            maxLength = Math.max(maxLength, arr[i].length);
        }
    
        for (let i = maxLength - 1; i >= 0; i--) {
            countingStringSort(arr, i);
        }
    } else {
        if (dataType === 'object') {
            max = arr[0].id;
            for (let i = 1; i < n; i++) {
                max = Math.max(max, arr[i].id);
            }
        } else {
            max = arr[0];
            for (let i = 1; i < n; i++) {
                max = Math.max(max, arr[i]);
            }
        }
    
        let exp = 1;
        while (Math.floor(max / exp) > 0) {
            countingSort(arr, exp, dataType);
            exp *= 10;
        }
    }

    return arr;
}

function countingStringSort(arr, position) {
    const n = arr.length;
    const count = new Array(256).fill(0);
    const output = new Array(n);

    for (let i = 0; i < n; i++) {
        const charCode = position < arr[i].length ? arr[i].charCodeAt(position) : 0;
        count[charCode]++;
    }

    for (let i = 1; i < 256; i++) {
        count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
        const charCode = position < arr[i].length ? arr[i].charCodeAt(position) : 0;
        output[count[charCode] - 1] = arr[i];
        count[charCode]--;

        
    }

    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

function countingSort(arr, exp, dataType) {
    const n = arr.length;
    const count = new Array(10).fill(0);
    const output = new Array(n);

    // Count occurrences of each digit
    for (let i = 0; i < n; i++) {
        let digit;
        if (dataType === 'object') {
            digit = Math.floor(arr[i].id / exp) % 10;
        } else {
            digit = Math.floor(arr[i] / exp) % 10;
        }
        count[digit]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
        let digit;
        if (dataType === 'object') {
            digit = Math.floor(arr[i].id / exp) % 10;
        } else {
            digit = Math.floor(arr[i] / exp) % 10;
        }

        
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

// Listen for messages from the main thread
onmessage = function (e) {
    var arr = e.data;
    var sorted = radixSort(arr);
    postMessage(sorted);
};