<template>
  <div>{{this.value}}</div>
</template>

<script>
  import {response} from '../common/APIList.js'
  export default {
    name: 'landing-page',
    methods: {
      
    },
    data(){
      return {
        value : ''
      }
    },
    async mounted(){
      await response("http://localhost:8080/", "GET").then((data)=>{
        this.value = data.body;
        console.log(JSON.parse(data.body))
      })
    }
  }
</script>

<style>

</style>
