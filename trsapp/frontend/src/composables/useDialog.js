import { useValidationRules } from './useValidationRules';
import { useEventStore } from '../stores/event';
import { useDialogStore } from '../stores/uiSetting';
import router from '../router';

const {validateRules} = useValidationRules();
//const event = useEventStore();
const checkAllValidations = (validationResult) => {
    return Object.values(validationResult).every(validation => 
        validation.length === 0 || validation[validation.length - 1] === true
    )
}

export const dialogTypes = {
    newEvent: {
        title: "新規イベント作成",
        params: {
            eventName:{
                label:"イベント名",
                type: "text",
                validators:  [validateRules.required, validateRules.alphabetOnly]
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
            
            console.log("作成")
            //バリデーションチェック
            //バリデーション確認のオブジェクト
            const formValidates = {};
            // 初期値の設定
            for (const key in dialogTypes.newEvent.params) {
                formValidates[key] = dialogTypes.newEvent.params[key].validators.map(func => func(formEvent[key]))
            }
            //console.log(formValidates)
            //チェック
            if(!checkAllValidations(formValidates)) {
                console.log(formValidates)
                console.log("バリデーション失敗")

                return
            }
            try {
                //新規イベントをポスト
                await event.createEvent(formEvent.eventName,formEvent.eventDate)
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
        type: "editEvent",
        title: "イベント編集",
        params: {
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

            submit: async function(formEvent){
            const event = useEventStore()
            const dialog = useDialogStore()
            //バリデーション確認のオブジェクト
            const formValidates = {};
            // 初期値の設定
            for (const key in dialogTypes[this.type].params) {
                formValidates[key] = dialogTypes[this.type].params[key].validators.map(func => func(formEvent[key]))
            }
            //チェック
            if(!checkAllValidations(formValidates)) {
                console.log(formValidates)
                console.log("バリデーションエラー")
                return
            };
            try {
                //新規イベントをポスト
                console.log(event.details.token,formEvent)
                await event.updateEvent(event.details.token,formEvent)
                //ダイアログを消す
                dialog.clearDialog(this.type);
                //イベント詳細に遷移
                router.replace({name: 'EventDetail', params: {token: event.details.token}})
            }catch(err){
                console.log("イベント編集エラー")
            }
            }
        },
    }