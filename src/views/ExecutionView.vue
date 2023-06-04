<template>
    <div class="executionView">
        <div class="card bg-light">
            <div class="card-body">
                <h1>Perform Test</h1>
                <h5>Algorithms: {{ algorithm }}</h5>
                <h5>Data Type: {{ dataType }}</h5>
                <h5>Data Length: {{ arrayLen }}</h5>
                <h5>Execute Mode: {{ executeType }}</h5>
                <br />

                <button class="btn btn-success" @click="onPerformTest()">{{ executeBtnName  }}</button>
                <p>click on 'START' multiple times to get more accurate data.</p>
            </div>
        </div>

        <div v-if="showResult" class="card bg-success text-white">
            <div class="card-body" style="padding: 30px;">
                <h5>Execution Time: {{ exTime }} ms</h5>
                <h5>Memory Used: {{ exMemory }} MB</h5>
                <h5>Number of Operation Performed: {{ nop }}</h5>
                <h5>Is Stable: {{ isStable }}</h5>
                <p style="font-size: 14px;" > 
                    {{ typeof sortedArray[0] === 'object' ? JSON.stringify(sortedArray.slice(0, 1000)).replace(/\[|]/g, '') 
                    : sortedArray.slice(0, 1000).toString() }}..... 
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { arrayData, nop } from '@/utils/datas';
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
    data() {
        return {
            exTime: 0,
            exMemory: 0,
            showResult: false,
            sortedArray: [],
            clickedStart: false,
            executeBtnName: 'START'
        }
    },
    watch: {
        clickedStart(value) {
            this.executeBtnName = value ? 'START' : 'Please Wait...';
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
        nop() {
            return nop.total;
        },
        isStable() {
            if (this.algorithm == 'merge' || this.algorithm == 'radix' || this.algorithm == 'count') {
                return 'Yes';
            } else {
                return 'No'
            }
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
        onPerformTest() {
            if (!this.clickedStart) {
                this.clickedStart = true;
                this.showResult = false;
                nop.total = 0;

                const startMemory = performance.memory.usedJSHeapSize;
                let start = window.performance.now();
                this.sortedArray = this.excutedMethods[this.algorithm](arrayData[this.dataType]);
                let end = window.performance.now();
                const endMemory = performance.memory.usedJSHeapSize;
                
                const memoryUsed = endMemory - startMemory;
                let time = end - start;
                
                this.exTime = Math.floor(Math.abs(time));
                this.exMemory = Math.abs(memoryUsed) / Math.pow(1000, 2);

                this.showResult = true;
                this.clickedStart = false;
                
            }
        }
    }
}
</script>

<style scoped >
h1 {
    margin-bottom: 20px;
    text-align: center;
    text-decoration: underline;
}
h5 {
    font-size: 22px;
    font-weight: 700;
    text-align: center;
}
p{
    font-size: 13px; 
    margin: 0; 
    padding-top: 10px;
}

.btn {
    padding: 8px 20px;
    font-weight: bold;
    font-size: 18px;
}
.executionView {
    margin: 0 auto;
    max-width: 1180px;
}

div.card {
  margin: 20px 0;
}
</style>