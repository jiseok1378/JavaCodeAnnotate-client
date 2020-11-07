<template>
    <b-container class="bv-example-row" style = "margin-top : 30px;">
        <b-row>
            <b-cols>
                <b-input v-model="projectPath"/>
                {{projectPath}}
            </b-cols>
            <b-cols>
                <b-button @click="saveProject">프로젝트 저장</b-button>
            </b-cols>
            <b-cols>
                <b-button @click="loadProject">프로젝트 불러오기</b-button>
            </b-cols>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name : 'ProjectManagement',
    data(){
        return{
            projectName : '',
            projectPath : '',
            savePath : '',
        }
    },
    methods:{
        async saveProject(){
            if(this.projectPath == ''){
                alert('프로젝트 이름을 입력해 주세요');
                return
            }

            const mkdirp = require('mkdirp')
            const homeDir = require('os').homedir()
            const fs = require('fs')
            await mkdirp(`${homeDir}\\AnnotationProject`, (err)=>{
                if(err)
                    console.log('Already Exist')
            })
            if(this.projectPath == this.savePath){
                try {
                    fs.statSync(this.projectPath);
                    console.log('file or directory exists');
                    alert("동일한 이름의 프로젝트가 이미 있습니다!")
                    return
                }
                catch (err) {
                    if (err.code === 'ENOENT') {
                        console.log('file or directory does not exist');
                    }
                }
            }

            let stringAnnotateData = JSON.stringify({"result" : this.$store.state.event.fileCollection}, null, 2)
            fs.writeFileSync(this.projectPath, stringAnnotateData);
            alert('프로젝트 저장 완료!')
        },
        async loadProject(){
            const fs = require('fs')
            const remote = require('electron').remote
            await remote.dialog
            .showOpenDialog({ properties: ["openFile"], filters : [{name: 'Json', extensions: ['json']}]})
            .then((directoryPath) => {
                    this.projectPath = directoryPath.filePaths[0]
            });
            console.log(this.projectPath)
            this.$store.state.event.fileCollection = JSON.parse(fs.readFileSync(this.projectPath)).result
        }
    }
}
</script>

<style>

</style>