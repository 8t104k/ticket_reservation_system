import { useValidationRules } from './useValidationRules';
import { useEventStore } from '../stores/event';
import { useDialogStore } from '../stores/uiSetting';
import router from '../router';

const {validateRules} = useValidationRules();
//const event = useEventStore();

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
        submit: async(formEvent) => {
            const event = useEventStore()
            const dialog = useDialogStore()
            try {
                //新規イベントをポスト
                //await event.createEvent(formEvent.eventName,formEvent.eventDate)
                //ダイアログを消す
                dialog.clearDialog();
                //新規イベント詳細に遷移
                router.replace({name: 'EventDetail', params: {token: event.details.token}})
            }catch(err){
                console.log("イベント作成エラー")
            }
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