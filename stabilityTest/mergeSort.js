// Helper function to merge two sorted arrays while maintaining stability
function merge(left, right) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i].value <= right[j].value) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Copy any remaining elements from the left and right arrays
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }

  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}

// Merge Sort implementation
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

// Test case to demonstrate stability
const data = [
  { value: 5, index: 0 },
  { value: 3, index: 1 },
  { value: 7, index: 2 },
  { value: 3, index: 3 },
  { value: 2, index: 4 },
];

// Sorting the array using Merge Sort
const sortedData = mergeSort(data);

// Displaying the sorted array and checking stability
console.log("Sorted Data:");
console.log(sortedData);

let stable = true;
// Checking stability by comparing the original indices
for (let i = 1; i < sortedData.length; i++) {
  const prev = sortedData[i - 1];
  const current = sortedData[i];

  if (current.value === prev.value && current.index < prev.index) {
    console.log("Merge Sort is not stable.");
    stable = false;
    break;
  }
}

// If the loop completes without any issues, the sort is stable
if(stable) console.log("Merge Sort is stable.");
