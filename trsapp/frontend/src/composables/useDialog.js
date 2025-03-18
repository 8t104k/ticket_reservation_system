import { useValidationRules } from './useValidationRules';

const {validateRules} = useValidationRules();

export const dialogTypes = {
    newEvent: {
        title: "新規イベント作成",
        params: {
            eventName:{
                label:"イベント名",
                type: "text",
                validators:  [validateRules.required]
                },
            eventDate: {
                label:"開催日",
                type: "date",
                validators: [validateRules.required]
                }
            },
        submit: function(formEvent){
            console.log(formEvent.eventName,formEvent.eventDate)
            }
        },
    editEvent: {
        title: "イベント編集",
        params: {
            eventName:"イベント名",
            eventDate: "開催日"
            },
        submit: function(formEvent){
            console.log(formEvent.eventName,formEvent.eventDate)
            }
        },
    }