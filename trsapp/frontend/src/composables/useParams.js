import { useValidationRules } from './useValidationRules';

const {validateRules} = useValidationRules();

export const params = {
    eventParams: {
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
    },
    reservationParams: {
        reservation_name:{
            label:"予約名",
            type: "text",
            validators:  [validateRules.required]
            },
        price: {
            label:"価格",
            type: "number",
            validators: [validateRules.numberOnly]
            },
        status: {
            label:"ステータス",
            type: "text",
            validators: []
            },
        reserved_at: {
            label:"予約日時",
            type: "datetime",
            validators: []
            },
    },
    groupParams: {
      group_name:{
          label:"グループ名(バンド名)",
          type: "text",
          validators:  [validateRules.required]
          },
      description: {
          label:"紹介文",
          type: "text",
          validators: []
          },
  },
}

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
    reservation_name:{
        label:"予約名",
        type: "text",
        validators:  []
        },
    price: {
        label:"価格",
        type: "number",
        validators: []
        },
    status: {
        label:"ステータス",
        type: "text",
        validators: []
        },
    reserved_at: {
        label:"予約日時",
        type: "datetime",
        validators: []
        },
}