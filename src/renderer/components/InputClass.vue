<template>
  <div class="form-group form-group-sm">
      <b-row>
          <b-col>
              <label v-if="deleted"><del>{{AnnotateTarget}}</del></label>
              <label v-else>{{AnnotateTarget}}</label>
          </b-col>
          <b-col>
              <input type="text" 
                        class="form-control" 
                        v-model="Annotation" 
                        placeholder="설명을 입력해주세요" 
                        @change="InputData"
                        :disabled="deleted">
                        
          </b-col>
          <div @click="deleteData">🗑</div><!--<b-form-checkbox @change="deleteData"
                            v-model="deleted" 
                            name="check-button"
                            switch 
                            >
            </b-form-checkbox>-->
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
        delete : Boolean
    },
    methods:{

    },
    data(){
        return {
            FileNameData : this.FileName,
            Annotation : this.Annotate,
            deleted : this.delete
        }
    },
    methods:{
        InputData(){
            let STORE = this.$store.state.event
            STORE.fileCollection[this.FileIndex][`${this.Type}List`][this.Index][`${this.Type}Annotate`] = this.Annotation
            
            console.log("!!!!!!!!!!!!!!!!!!",STORE.fileCollection[this.FileIndex][`${this.Type}List`][this.Index])
        },
        deleteData(){
            if(this.deleted){
                this.deleted = false
            }
            else{
                this.deleted = true
            }
            let STORE = this.$store.state.event
            STORE.fileCollection[this.FileIndex][`${this.Type}List`][this.Index]['delete'] = this.deleted
        }
    }
}
</script>

<style>

</style>