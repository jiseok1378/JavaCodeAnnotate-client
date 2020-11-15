<template>
    <div>
        <ProjectManagement />
        <div v-for="projectFile in this.projectFiles" :key="projectFile">
            <Project/>
        </div>
        
    </div>
</template>

<script>
import Project from "./Project.vue"
import ProjectManagement from "./ProjectManagement.vue"
export default {
    components : {
        Project, ProjectManagement
    },
    data(){
        return{
            projectFiles : []
        }
    },
    async created(){      
        this.projectFiles = [];
        const homedir = require('os').homedir()
        const dirTree = await require("directory-tree");
        const tree = await dirTree(`${homedir}\\AnnotationProject`, { extensions: /\.json/ }, (item, PATH, stats)=>{
          let files = item.path
          this.projectFiles.push(files);
        });
        console.log(this.projectFiles)
      }
    
}
</script>

<style>

</style>