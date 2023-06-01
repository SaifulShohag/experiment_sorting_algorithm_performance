export function quickSort(array) {
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
        while( typeof array[i] === 'object' ? array[i].id < pivot.id : array[i] < pivot ) {
            i++;
        }
        while(typeof array[j] === 'object' ? array[j].id > pivot.id : array[j] > pivot) {
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