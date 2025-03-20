import { useValidationRules } from './useValidationRules';

const {validateRules} = useValidationRules();

export const eventParams = {
    event_name:{
        label:"イベント名",
        type: "text",
        validators:  [validateRules.required]
        },
    event_date: {
        label:"開催日",
        type: "date",
        validators: [validateRules.required]
        },
    event_open: {
        label:"オープン",
        type: "time",
        validators: []
        },
    location: {
        label:"場所",
        type: "text",
        validators: []
        },
}

export const reservationParams = {

}