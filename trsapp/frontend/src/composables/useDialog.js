import { useEventStore } from '../stores/event';
import { useDialogStore } from '../stores/uiSetting';
import { eventParams } from './useParams.js';
import router from '../router';



const actions = {
    newEvent: async(formEvent) => {
        const event = useEventStore();
        return await event.createEvent(formEvent)
    },
    updateEvent: async(formEvent) => {
        const event = useEventStore();
        return await event.updateEvent(event.details.token,formEvent)
    },
}

export const dialogTypes = {
    newEvent: {
        type: "newEvent",
        title: "新規イベント作成",
        params: ["event_name","event_date"],
        submit:  async function(formEvent) {handleSubmit(this.type,formEvent)}
        },
    editEvent: {
        type: "editEvent",
        title: "イベント編集",
        params: ["event_name","event_date","event_open","location"],
        submit: async function(formEvent) {handleSubmit(this.type,formEvent)}
        },
    }


async function handleSubmit(type,formData){
    const dialog = useDialogStore()
    //バリデーション確認のオブジェクトと初期値の設定
    const formValidates = {};
    for (const key of dialogTypes[type].params) {
        formValidates[key] = eventParams[key].validators.map(func => func(formData[key]));
    }
    //バリデーションチェック
    if(!checkAllValidations(formValidates)) {return console.log("バリデーションエラー")};
    //実行
    try {
        const result = await actions[type](formData)
        dialog.clearDialog(type);
        router.replace({name: 'EventDetail', params: {token: result.token}})
    }catch(err){
        console.log(type,"エラー")
    }
}

//バリデーションチェック
const checkAllValidations = (validationResult) => {
    return Object.values(validationResult).every(validation => 
        validation.length === 0 || validation[validation.length - 1] === true
    )
}