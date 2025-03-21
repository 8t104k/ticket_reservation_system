import { defineStore } from 'pinia'
import { apiClient, ENDPOINTS } from '../api/client';
import { supabase } from '../lib/supabase';

export const useCollaboratorStore = defineStore('collaborator',{
    state: () => ({
        all: null,
        details: null
    }),
    actions: {
        async getCollaborators(eventToken){
            try{
                //認証情報取得
                const {data} = await supabase.auth.getSession()
                const authToken = data.session.access_token
                //イベントデータを取得
                const response = await apiClient(authToken).get(ENDPOINTS.COLLABORATORS.BASE(eventToken))
                //ストアに保存
                this.all = response.data
                return response.data
            } catch(err){
                console.log('予約取得エラー')
                throw err
            };            
        },
    }

})