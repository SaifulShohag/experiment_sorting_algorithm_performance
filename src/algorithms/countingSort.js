export function countingSort(arr) {
    const n = arr.length;
    if (n <= 1) return arr;

    // Find the maximum value in the array
    let max = arr[0];
    for (let i = 1; i < n; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    // Create a count array to store the frequency of each value
    const count = new Array(max + 1).fill(0);

    // Compute the frequency of each value
    for (let i = 0; i < n; i++) {
        count[arr[i]]++;
    }

    // Compute the cumulative sum of the frequencies
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    const output = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    return output;
}