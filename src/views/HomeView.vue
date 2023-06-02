<template>
    <div class="home-component">
        <h1>Experiment the Efficiency of Different Sorting Algorithms on Large Data Sets</h1>

        <div class="form-filter">

            <div class="row">

                <div class="col-4">
                    <h5>Select Algorithms</h5>
                </div>

                <div class="col-4">
                    <h5>Select Data Type</h5>
                </div>

                <div class="col-4">
                    <h5>Select Array Length</h5>
                </div>

            </div>

            <div class="row">

                <div class="col-4">
                    <select class="form-select form-select-sm" v-model="algorithmInput" >
                        <option v-for="list in algorithmsList" :value="list.value" :key="list.value" >{{ list.title }}</option>
                    </select>
                </div>

                <div class="col-4">
                    <select class="form-select form-select-sm" v-model="dataTypeInput" >
                        <option v-for="list in dataTypeList" :value="list.value" :key="list.value" >{{ list.title }}</option>
                    </select>
                </div>

                <div class="col-4">
                    <select class="form-select form-select-sm" v-model="arrayLenInput" >
                        <option v-for="list in arrayLenList" :value="list.value" :key="list.value" >{{ list.title }}</option>
                    </select>
                </div>

            </div>

        </div>

        <ExperimentCard v-for="exp in expCardList" :key="exp.type" :title="exp.name" :cmpType="exp.type" class="expCard"
            @click="onSelectedExecute(exp.type, this)" :class="{bgColorGrey: exp.type === executeBtnClicked, bgColorGreen: exp.type !== executeBtnClicked}" />

    </div>
</template>

<script>
// @ is an alias to /src
import ExperimentCard from '@/components/ExperimentCard.vue'
import { arrayData } from '@/utils/datas';

export default {
    name: 'HomeView',
    components: {
        ExperimentCard
    },
    mounted() {
        arrayData.int = [];
        arrayData.float = [];
    },
    data() {
        return {
            algorithmInput: 'merge',
            dataTypeInput: 'int',
            arrayLenInput: 100000,
            executeBtnClicked: ''
        };
    },
    computed: {
        expCardList() {
            return [
                { type: 'cpu', name: 'Performace on CPU' },
                { type: 'gpu', name: 'Performace on GPU' },
                { type: 'sur', name: 'Speed Up Ratio' },
            ];
        },
        algorithmsList() {
            return [
                { title: 'Merge Sort', value: 'merge' },
                { title: 'Quick Sort', value: 'quick' },
                { title: 'Heap Sort', value: 'heap' },
                { title: 'Radix Sort', value: 'radix' },
                { title: 'Count Sort', value: 'count' },
                { title: 'Bucket Sort', value: 'bucket' }
            ];
        },
        dataTypeList() {
            return [
                { title: 'Integer', value: 'int' },
                { title: 'Float', value: 'float' },
                { title: 'String', value: 'string' },
                { title: 'Object', value: 'object' }
            ];
        },
        arrayLenList() {
            return [
                { title: '10,000', value: 10000 },
                { title: '50,000', value: 50000 },
                { title: '100,000', value: 100000 },
                { title: '400,000', value: 400000 },
                { title: '500,000', value: 500000 },
                { title: '700,000', value: 700000 },
                { title: '1,000,000', value: 1000000 }
            ];
        }
    },
    methods: {
        onSelectedExecute( executeType ) {
            if(this.executeBtnClicked === '') {
                this.executeBtnClicked = executeType;
                this.generateArrayData(this.dataTypeInput);

                this.$router.push({ 
                    name: 'executeVue', 
                    params: { 
                        algorithm: this.algorithmInput, 
                        dataType: this.dataTypeInput, 
                        arrayLen: Number( this.arrayLenInput ), 
                        executeType: executeType 
                    }
                }).then(() => this.executeBtnClicked = '');
            }
        },

        generateArrayData(dataType) {
            if (dataType === 'int') {
                for (let i = 0; i < Number( this.arrayLenInput ); i++) {
                    arrayData[dataType].push(Math.floor(Math. random() * 1100000) + 1);
                }
            } else if (dataType === 'float') {
                for (let i = 0; i < Number( this.arrayLenInput ); i++) {
                    let num = Math.random() * (1000000.00 - 1.00) + 1.00;
                    arrayData[dataType].push(Math.round(num * 100) / 100);
                }
            } else if (dataType === 'string') {
                for (let i = 0; i < Number( this.arrayLenInput ); i++) {
                    arrayData[dataType].push(this.generateRandomString(10));
                }
            } else if (dataType === 'object') {
                for (let i = 0; i < Number( this.arrayLenInput ); i++) {
                    arrayData[dataType].push({id: Math.floor(Math. random() * 1000000) + 1, name: this.generateRandomString(8)});
                }
            }
        },
        
        generateRandomString(length) {
            let result = '';
            const characters = 'abcdefghijklmnopqrstuvwxyz';
            const charactersLength = characters.length;

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charactersLength);
                result += characters.charAt(randomIndex);
            }

            return result;
        }
    }
}
</script>

<style scoped >
h1 {
    margin-top: 20px;
    margin-bottom: 50px;
    text-align: center;
    text-decoration: underline;
}
h5 {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    background-color: aliceblue;
}

.home-component {
    margin: 0 auto;
    max-width: 980px;
}
div.form-filter {
    padding: 20px 0;
}
.expCard {
    cursor: pointer;
}
.expCard:hover {
    background-color: grey !important;
}

.bgColorGrey {
    background-color: grey;
}
.bgColorGreen {
    background-color: #198754;
}
</style>