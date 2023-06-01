export function mergeSort(array) {
	if(array.length > 1) {
		const len = array.length;
		const middle = Math.floor(len / 2);
		let left = mergeSort(array.slice(0, middle));
		let right = mergeSort(array.slice(middle, len));
		array =  merge(left, right);
	}
    
	return array;
}

function merge(left, right) {
	let i = 0;
	let j = 0;
	const result = [];
	while(i < left.length && j < right.length) {
        if (typeof left[i] === 'object') {
            result.push(left[i].id < right[j].id ? left[i++] : right[j++]);
        } else {
            result.push(left[i] < right[j] ? left[i++] : right[j++]);
        }
	}

	return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}