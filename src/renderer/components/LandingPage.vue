<template>
  <div>
    
    <SelectSourcePath/>
    <ProjectManagement />
    <MainView/>
    
  </div>
</template>

<script>
  import {response} from '../common/APIList.js'
  import InputClass from './InputClass.vue'
  import SelectSourcePath from './SelectSourcePath.vue'
  import FileSelectModal from './FileSelectModal.vue'
  import MainView from "./MainView.vue"
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import ProjectManagement from './ProjectManagement.vue'
  export default {
    name: 'landing-page',
    components:{
      InputClass,SelectSourcePath, FileSelectModal, MainView, ProjectManagement
    },
    methods: {
      
    },
    data(){
      return {
        values : Object,
      }
    },
    /*
    async mounted(){
      await response("http://localhost:8080/", "GET").then((data)=>{
        this.values = JSON.parse(data.body);
        console.log(JSON.parse(data.body))
      })
    }
    */
  }
</script>

<style>

</style>
