import { params } from './useParams.js';
import router from '../router';
import { useRoute } from 'vue-router'
import { useStores } from '../stores/index.js';

export const useDialogActions = () => {
  const { event, reservation } = useStores();
  
  // ストアのアクション
  const storeActions = {
      newEvent: {
          execute: formData => event.createEvent(formData),
          onSuccess: () => router.replace({ name: 'EventDetail', params: { token: event.details.token }})
      },
      editEvent: {
          execute: formData => event.updateEvent(event.details.token, formData),
          onSuccess: () => event.getEventDetails(event.details.token)
      },
      newReserve: {
          execute: formData => reservation.createReservation(event.details.token, formData),
          onSuccess: () => reservation.getReservations(event.details.token)
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
    const { dialog } = useStores();
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
      console.log(formData)
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