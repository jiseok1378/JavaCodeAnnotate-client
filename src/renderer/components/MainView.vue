<template>
    
    <b-container class="bv-example-row" style = "margin-top : 30px;">
    <b-button  @click="startCollector">정보 모으기 시작</b-button>
      <b-form-radio-group
        id="btn-radios-2"
        v-model="selected"
        :options="options"
        buttons
        name="radio-btn-outline"
      ></b-form-radio-group>
      
    <table class = "table" >
        <tr>
            <td>파일이름</td>
            <td v-if="selected.includes('class')">클래스 리스트</td>
            <td v-if="selected.includes('enum')">열거형리스트</td>
            <td v-if="selected.includes('function')">함수리스트</td>
            <td v-if="selected.includes('variable')">변수 리스트</td>
        </tr>
        <tr v-for="(collection, FileIndex) in this.$store.state.event.fileCollection" :key="collection">
            <td>{{collection.filePath.split("\\")[collection.filePath.split("\\").length - 1]}}</td>
            <td v-if="selected.includes('class')">
                <div v-for="(_class,index) in collection.classList" :key="_class">
                    <InputClass :FilePath="collection.filePath"
                                :AnnotateTarget="_class.className"
                                :FileIndex="FileIndex"
                                :Index="index"
                                :Annotate="_class.classAnnotate"
                                :Type="'class'"/>
                </div>
            </td>
            <td v-if="selected.includes('enum')">
                <div v-for="(_enum, index) in collection.enumList" :key="_enum">
                    <InputClass :FilePath="collection.filePath"
                                :AnnotateTarget="_enum.enumName"
                                :FileIndex="FileIndex"
                                :Index="index"
                                :Annotate="_enum.enumAnnotate"
                                :Type="'enum'"/>
                </div>
            </td>
            <td v-if="selected.includes('function')">
                <div v-for="(_function, index) in collection.functionList" :key="_function">
                    <InputClass :FilePath="collection.filePath"
                                :AnnotateTarget="_function.functionName"
                                :FileIndex="FileIndex"
                                :Index="index"
                                :Annotate="_function.functionAnnotate"
                                :Type="'function'"/>
                </div>
            </td>
            <td v-if="selected.includes('variable')">
                <div v-for="(variable, index) in collection.variableList" :key="variable">
                    <InputClass :FilePath="collection.filePath"
                                :AnnotateTarget="variable.variableName"
                                :FileIndex="FileIndex"
                                :Index="index"
                                :Annotate="variable.variableAnnotate"
                                :Type="'variable'"/>
                </div>
            </td>
        </tr>
    </table>
    </b-container>
</template>

<script>
import { response } from '../common/APIList';
import InputClass from './InputClass.vue'
export default {
    name : "MainView",
    components : {
        InputClass
    },
    data(){
        return{
            collections : Object,
            g : '',
            selected: [], // Must be an array reference!
            options: [
                { text: '클래스', value: 'class' },
                { text: '열거형', value: 'enum' },
                { text: '함수', value: 'function' },
                { text: '변수', value : 'variable'}
            ]
        }
    },
    methods:{
        startCollector(){
            console.log("aaa")
            let request = require("request");
            let fileList = {"fileList" : this.$store.state.event.javaFiles}
            request.post({
                headers : {'content-type' : 'application/json'},
                url : 'http://localhost:8080/collect',
                body : fileList,
                json : true
            }, (error, response, body) =>{
                console.log(body)
                this.$store.state.event.fileCollection = body.result
            });
        },
        async translate(word){
            return new Promise(resolve=>{
                let request = require("request");
                let data = ""
                request.post({
                    headers : {"Authorization" : "KakaoAK fdaacdf4ba05662ba81a7ecacd43cc86",
                                "Content-Type" : "application/x-www-form-urlencoded"},
                    url : 'https://dapi.kakao.com/v2/translation/translate',
                    form : {"src_lang" : "en", "target_lang" : "kr", "query" : word},
                    json : true
                }, (error, response, body) =>{
                    if(response && response.statusCode == 200){
                        resolve(body)
                    } 
                });
            });
        },
        async catchWord(word){
            let data = await this.translate(word.split(" ")[1]);
            console.log(data)
            data = data.translated_text[0][0];
            console.log(data)
            g = data
        }
        
    }
}
</script>

<style>

</style>