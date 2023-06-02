import { nop } from "@/utils/datas";

export function countingSort(arr) {
    const n = arr.length;
    if (n <= 1) return arr;

    let max = arr[0];
    for (let i = 1; i < n; i++) {
        if (arr[i] > max) {
            nop.total++; // number of operations performed
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
        nop.total++; // number of operations performed
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    return output;
}