import { defineStore } from 'pinia'
import router from '../router';
import { apiClient, ENDPOINTS } from '../api/client';
import { supabase } from '../lib/supabase';

export const useEventStore = defineStore('event',{
    state: () => ({
        myEvents: null,
        details: null
    }),
    actions: {
        async getMyEvents(){
            try{
                //認証情報取得
                const {data} = await supabase.auth.getSession()
                const authToken = data.session.access_token
                //イベントデータを取得
                const response = await apiClient(authToken).get(ENDPOINTS.EVENTS.BASE)
                //ストアに保存
                this.myEvents = response.data
            } catch(err){
                console.log('参加イベント取得エラー')
                throw err
            };            
        },

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
        async createEvent(eventName,eventDate){
            try{
                //認証情報取得
                const {data} = await supabase.auth.getSession()
                const authToken = data.session.access_token
                const event_data = {
                    event_name: eventName,
                    event_date: eventDate
                }
                //イベントデータを作成
                const response = await apiClient(authToken).post(ENDPOINTS.EVENTS.BASE,event_data)
                //ストアに保存
                this.details = response.data
            } catch(err){
                console.log('getEventDetailsエラー')
                throw err
            };
        },
        async updateEvent(eventToken,eventParams){
            try{
                //認証情報取得
                const {data} = await supabase.auth.getSession()
                const authToken = data.session.access_token
                //イベントデータを作成
                const response = await apiClient(authToken).patch(ENDPOINTS.EVENTS.UPDATE(eventToken),eventParams)
                //ストアに保存
                this.details = response.data
            } catch(err){
                console.log('getEventDetailsエラー')
                throw err
            };
        }
    }

})