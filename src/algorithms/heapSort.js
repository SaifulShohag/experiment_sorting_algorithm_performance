export function heapSort(arr) {
    // Build max heap
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      heapify(arr, arr.length, i);
    }
  
    // Extract elements from heap
    for (let i = arr.length - 1; i >= 0; i--) {
      // Move current root to end
      [arr[0], arr[i]] = [arr[i], arr[0]];
  
      // Heapify root element
      heapify(arr, i, 0);
    }
  
    return arr;
}
  
function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
  
    if (typeof arr[0] === 'object') {
        if (left < n && arr[left].id > arr[largest].id) {
            largest = left;
        }
        if (right < n && arr[right].id > arr[largest].id) {
            largest = right;
        }
    } else {
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
    }
  
    // If largest is not root
    if (largest != i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
  
      // Recursively heapify the affected sub-tree
      heapify(arr, n, largest);
    }
}