<template>
  <div class="about">
    <h1>This is an Execution page</h1>
    <button @click="onTest()" >Test</button>
  </div>
</template>

<script>
import { arrayData } from '@/utils/datas';
import { mergeSort } from '@/algorithms/mergeSort';
import { quickSort } from '@/algorithms/quickSort';
import { radixSort } from '@/algorithms/radixSort';
import { countingSort } from '@/algorithms/countingSort';
import { bucketSort } from '@/algorithms/bucketSort';
import { heapSort } from '@/algorithms/heapSort';

export default {
    name: 'ExecutionView',
    mounted() {
        if ( arrayData[this.dataType].length === 0 ) {
            this.$router.push('/');
        }
    },  
    computed: {
        algorithm() {
            return this.$route.params.algorithm;
        },
        dataType() {
            return this.$route.params.dataType;
        },
        arrayLen() {
            return this.$route.params.arrayLen;
        },
        executeType() {
            return this.$route.params.executeType;
        },
        excutedMethods() {
            return {
                merge: mergeSort,
                quick: quickSort,
                radix: radixSort,
                count: countingSort,
                bucket: bucketSort,
                heap: heapSort
            }
        }
    },
    methods: {
        onTest() {
            console.log(this.algorithm, this.dataType, this.arrayLen, this.executeType);
            console.log(`${performance.memory.usedJSHeapSize / Math.pow(1000, 2)} MB`);
            
            console.time('Execution Time');
            console.log(this.excutedMethods[this.algorithm](arrayData[this.dataType]));
            console.timeEnd('Execution Time');
        }
    }
}
</script>