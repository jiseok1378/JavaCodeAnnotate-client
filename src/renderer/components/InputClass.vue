<template>
  <div class="form-group form-group-sm">
      <b-row>
          <b-col>
              <label>{{AnnotateTarget}}</label>
          </b-col>
          <b-col>
              <input type="text" 
                        class="form-control" 
                        v-model="Annotation" 
                        placeholder="주석을 입력해주세요." 
                        @change="InputData">
                        
          </b-col>
      </b-row>
  </div>

</template>

<script>
export default {
    name : "InputClass",
    props : {
        FilePath : String,
        AnnotateTarget : String,
        FileIndex : Number,
        Annotate : String,
        Index : Number,
        Type : String,
    },
    methods:{

    },
    data(){
        return {
            FileNameData : this.FileName,
            Annotation : this.Annotate
        }
    },
    methods:{
        InputData(){
            let STORE = this.$store.state.event
            STORE.fileCollection[this.FileIndex][`${this.Type}List`][this.Index][`${this.Type}Annotate`] = this.Annotation
            console.log(STORE.fileCollection[this.FileIndex][`${this.Type}List`][this.Index])
        }
    }
}
</script>

<style>

</style>