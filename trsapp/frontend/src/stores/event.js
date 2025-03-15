import { defineStore } from 'pinia'
import router from '../router';
import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';
import { supabase } from '../lib/supabase';

export const useEventStore = defineStore('event',{
    state: () => ({
        details: null
    }),
    actions: {
        async getEventDetails(eventToken){
            try{
                //認証情報取得
                const {data} = await supabase.auth.getSession()
                const authToken = data.session.access_token
                //イベントデータを取得
                const response = await apiClient(authToken).get(ENDPOINTS.EVENTS.DETAIL(eventToken))
                //ストアに保存
                this.details = response.data
            } catch(err){
                console.log('getEventDetailsエラー')
                throw err
            };
        },
    }

})