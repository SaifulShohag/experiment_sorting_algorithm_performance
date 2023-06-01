<template>
  
  <div class="card text-white">
    <div class="card-body">{{ title }}</div>
  </div>

</template>

<script>
export default {
  name: 'ExperimentCard',
  props: {
    title: String,
    cmpType: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.card {
  margin: 20px 0;
}
div.card-body {
  font-weight: 700;
}
</style>
