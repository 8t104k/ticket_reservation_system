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
        all: {
            newEvent: {show: false},
            editEvent: {show: false},
            newReserve: {show: false},
            editReserve: {show: false},
        }
    }),
    actions: {
        showDialog(key){
            console.log(key)
            this.all[key].show = true;
        },
        clearDialog(key){
            this.all[key].show = false;
        }
    }
}

)

