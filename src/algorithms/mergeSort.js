import { nop } from "@/utils/datas";

export function mergeSort(array) {
	if(array.length > 1) {
		nop.total++; // number of operations performed
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
		nop.total++; // number of operations performed
        if (typeof left[i] === 'object') {
            result.push(left[i].id < right[j].id ? left[i++] : right[j++]);
        } else {
            result.push(left[i] < right[j] ? left[i++] : right[j++]);
        }
	}

	nop.total++; // number of operations performed
	return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}