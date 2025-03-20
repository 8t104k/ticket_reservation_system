import { useEventStore } from '../stores/event';
import { useReservationStore } from '../stores/reservations.js';
import { useDialogStore } from '../stores/uiSetting';
import { params } from './useParams.js';
import router from '../router';
import { useRoute } from 'vue-router'

const route = useRoute();

export const useDialogActions = () => {
    const eventStore = useEventStore();
    const reservationStore = useReservationStore();
  
    // ストアのアクション
    const storeActions = {
        newEvent: {
            execute: formData => eventStore.createEvent(formData),
            onSuccess: () => router.replace({ name: 'EventDetail', params: { token: eventStore.details.token }})
        },
        editEvent: {
            execute: formData => eventStore.updateEvent(eventStore.details.token, formData),
            onSuccess: () => eventStore.getEventDetails(eventStore.details.token)
        },
        newReserve: {
            execute: formData => reservationStore.createReservation(eventStore.details.token, formData),
            onSuccess: () => reservationStore.getReservations(eventStore.details.token)
        }
    };
  
    // ダイアログ設定
    const dialogConfig = {
      newEvent: {
        title: "新規イベント作成",
        paramsKey: "eventParams",
        fields: ["event_name", "event_date"]
      },
      
      editEvent: {
        title: "イベント編集",
        paramsKey: "eventParams",
        fields: ["event_name", "event_date", "event_open", "location"]
      },
      
      newReserve: {
        title: "新規予約",
        paramsKey: "reservationParams",
        fields: ["reservation_name", "price", "status"]
      }
    };
  
    // フォームハンドラ
    const handleSubmit = async (type, formData) => {
      const dialog = useDialogStore();
      const event = useEventStore();
      const config = dialogConfig[type];
      
      // バリデーション
      const isValid = config.fields.every(field => {
        const validators = params[config.paramsKey][field].validators;
        const results = validators.map(v => v(formData[field]));
        return results.length === 0 || results[results.length - 1] === true;
      });
      
      if (!isValid) {
        console.log("バリデーションエラー");
        return false;
      }
      
      // アクション実行
      try {
        await storeActions[type].execute(formData);
        dialog.clearDialog(type);
        storeActions[type].onSuccess()
        return true;
      } catch (err) {
        console.error(`${type}処理中にエラー:`, err);
        return false;
      }
    };
  
    return {
      dialogConfig,
      handleSubmit
    };
  };