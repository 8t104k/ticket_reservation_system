import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('snackbar',{
    state: () => ({
        show: false,
        text: "",
        color: 'success',
        timeout: 3000
    }),
    actions: {
        showMessage(message,color) {
            this.message = message
            this.color = color
            this.timeout = 3000
            this.show = true
        },
        clearMessage(){
            this.show = false
        }
    }
}

)