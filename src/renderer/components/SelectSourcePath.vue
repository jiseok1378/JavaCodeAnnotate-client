<template>
  <div>
    <b-container fluid="lg">
    <b-row >
      <b-col cols = "0">
        <label>프로젝트 경로 : </label>
      </b-col>
      <b-col>
        <b-input :value='this.javaSourcePath' disabled='true'/>
      </b-col>
      <b-col cols = "0" >
        <b-button size="sm" @click="selectPath">경로 선택</b-button>
      </b-col>
    </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
    name : 'SelectSourcePath',
    data(){
        return {
          javaSourcePath : "",
          javaFiles : [],
        }
    },
    methods:{
      async selectPath(){
        this.javaFiles = [];
        const remote = require('electron').remote
        await remote.dialog
        .showOpenDialog({ properties: ["openDirectory"]})
        .then((directoryPath) => {
          this.$store.state.event.javaSourcePath = directoryPath.filePaths[0]
          this.javaSourcePath = this.$store.state.event.javaSourcePath
        });

        const dirTree = await require("directory-tree");
        const tree = await dirTree( this.javaSourcePath, { extensions: /\.java/ }, (item, PATH, stats)=>{
          let files = item.path
          this.javaFiles.push(files);
          this.$store.state.event.javaFiles = this.javaFiles
        });
        console.log(this.$store.state.event.javaFiles)
      }
    }
}
</script>

<style>

</style>