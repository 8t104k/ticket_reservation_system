import { defineStore } from 'pinia'
import router from '../router';
import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';
import { supabase } from '../lib/supabase';

export const useEventStore = defineStore('event',{
    state: () => ({
        event_details: null
    }),
    actions: {
        async getEventDetails(eventToken){
            try{
                //認証情報取得
                const {data} = await supabase.auth.getSession()
                const authToken = data.session.access_token
                //イベントデータを取得
                const details = await apiClient(authToken).get(ENDPOINTS.EVENTS.DETAIL(eventToken))
                //ストアに保存
                this.event_details = details.data
            } catch(err){
                throw err
            };
        },
    }

})