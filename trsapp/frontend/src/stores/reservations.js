import { defineStore } from 'pinia'
import router from '../router';
import { apiClient, ENDPOINTS } from '../api/client';
import { supabase } from '../lib/supabase';

export const useReservationStore = defineStore('reservation',{
    state: () => ({
        all: null,
        details: null
    }),
    actions: {
        async getReservations(eventToken){
            try{
                //認証情報取得
                const {data} = await supabase.auth.getSession()
                const authToken = data.session.access_token
                //イベントデータを取得
                const response = await apiClient(authToken).get(ENDPOINTS.RESERVATIONS.BASE(eventToken))
                //ストアに保存
                this.all = response.data
                return response.data
            } catch(err){
                console.log('予約取得エラー')
                throw err
            };            
        },
        async createReservation(eventToken,formData){
            try{
                console.log("create start")
                //認証情報取得
                const {data} = await supabase.auth.getSession()
                const authToken = data.session.access_token
                //イベントデータを作成
                const response = await apiClient(authToken).post(ENDPOINTS.RESERVATIONS.BASE(eventToken),formData)
                //ストアに保存
                this.details = response.data
                return this.details
            } catch(err){
                console.log('createEventエラー')
                throw err
            };
        },
        async updateEvent(eventToken,eventParams){
            try{
                console.log("update start")
                //認証情報取得
                const {data} = await supabase.auth.getSession()
                const authToken = data.session.access_token
                //イベントデータを作成
                const response = await apiClient(authToken).patch(ENDPOINTS.RESERVATIONS.UPDATE(eventToken),eventParams)
                //ストアに保存
                this.details = response.data
                return this.details
            } catch(err){
                console.log('getEventDetailsエラー')
                throw err
            };
        }
    }

})