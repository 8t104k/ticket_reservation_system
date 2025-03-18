import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui',{
    state: () => ({
        snackbar:{
            show: false,
            text: "",
            color: 'success',
            timeout: 3000
        },
        transition: {
            name: 'list',
            isRightSlide: true
        }
    }),
    actions: {
        showMessage(message,color) {
            this.snackbar.message = message
            this.snackbar.color = color
            this.snackbar.timeout = 3000
            this.snackbar.show = true
        },
        clearMessage(){
            this.snackbar.show = false
        },
        setReverseTransition(){
            this.transition.name = this.isRightSlide == true ? 'slide' : 'r-slide'
        }
    }
}

)

export const useDialogStore = defineStore('dialog',{
    state: () => ({
        show: ref(false)
    }),
    actions: {
        showDialog(){
            this.show = true
        },
        clearDialog(){
            this.show = false
        }
    }
}

)

