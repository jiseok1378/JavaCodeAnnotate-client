<template>
    
    <b-container class="bv-example-row" style = "margin-top : 30px;">
    <b-button  @click="startCollector">정보 모으기 시작</b-button>
     <b-form-checkbox-group
        v-model="selected"
        :options="options"
        name="buttons-1"
        buttons
      ></b-form-checkbox-group>
      
    <table class = "table" >
        <tr>
            <td>파일이름</td>
            <td v-if="selected.includes('class')">클래스 리스트</td>
            <td v-if="selected.includes('enum')">열거형리스트</td>
            <td v-if="selected.includes('function')">함수리스트</td>
            <td v-if="selected.includes('variable')">변수 리스트</td>
        </tr>
        <tr v-for="collection in this.collections" :key="collection">
            <td>{{collection.fileName}}</td>
            <td v-if="selected.includes('class')">
                <p v-for="_class in collection.classList" :key="_class">
                    {{_class.className}}
                </p>
            </td>
            <td v-if="selected.includes('enum')">
                <p v-for="_enum in collection.enumList" :key="_enum">
                    {{_enum.enumName}}
                </p>
            </td>
            <td v-if="selected.includes('function')">
                <p v-for="_function in collection.functionList" :key="_function">
                    {{_function.functionName}}
                </p>
            </td>
            <td v-if="selected.includes('variable')">
                <p v-for="variable in collection.variableList" :key="variable">
                    {{variable.variableName}}
                </p>
            </td>
        </tr>
    </table>
    </b-container>
</template>

<script>
import { response } from '../common/APIList';
export default {
    name : "MainView",
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
                this.collections = body.result
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