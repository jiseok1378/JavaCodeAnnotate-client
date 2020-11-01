<template>
  <div>
  <b-button v-b-modal.modal-1>파일 선택</b-button>
  <b-modal id="modal-1" scrollable title="JAVA File List">
    <FileSelect :files="this.$store.state.event.javaFiles"/>
  </b-modal>
</div>
</template>

<script>
  import FileSelect from './FileSelect.vue'
export default {
    name : "FileSelectModal",
    components : {
        FileSelect
    },
    data(){
        return{
            isAll : false
        }
    },
    method:{
    }
}
</script>

<style>

</style>