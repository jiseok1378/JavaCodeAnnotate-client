<template>
  <div>
      <b-form-checkbox
        v-for="file in files"
        v-model="selected"
        :key="file.path"
        :value="file.path"
        @change="setFileList"
      >
        {{ file.name }}
      </b-form-checkbox>
    <div>Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    props:{
      files : Array
    },
    data() {
      return {
        selected: [], // Must be an array reference!\
      }
    },
    methods:{
      setFileList(){
        console.log("!!!" + selected)
        this.$store.state.event.selectFileList = selected
      }
    }
  }
</script>

<style>

</style>