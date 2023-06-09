function quickSort(array) {
    return quick(0, array.length - 1, array);
}

function quick(left, right, array) {
    if(array.length > 1) {
        let index = partition(left, right, array);
        if(left < index -1) {
            quick(left, index - 1, array);
        }
        if(index < right) {
            quick(index, right, array);
        }
    }
    return array;
}

function partition(left, right, array) {
    const pivot = array[Math.floor((left+right)/2)];
    let i = left;
    let j = right;
    while(i <= j) {
        while( typeof array[i] === 'object' ? array[i].value < pivot.value : array[i] < pivot ) {
            i++;
        }
        while(typeof array[j] === 'object' ? array[j].value > pivot.value : array[j] > pivot) {
            j--;
        }
        if(i <= j) {
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            i++; 
            j--;
        }
    }
    return i;
}

// Test case to demonstrate instability
const data = [
  { value: 5, index: 0 },
  { value: 3, index: 1 },
  { value: 7, index: 2 },
  { value: 3, index: 3 },
  { value: 2, index: 4 },
];

// Sorting the array using Quick Sort
const sortedData = quickSort(data);

// Displaying the sorted array and checking stability
console.log("Sorted Data:");
console.log(sortedData);

// Checking stability by comparing the original indices
let stable = true;
for (let i = 1; i < sortedData.length; i++) {
  const prev = sortedData[i - 1];
  const current = sortedData[i];

  if (current.value === prev.value && current.index < prev.index) {
    console.log("Quick Sort is not stable.");
    stable = false;
    break;
  }
}

if(stable) console.log("Quick Sort is stable.");