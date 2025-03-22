import { defineStore } from 'pinia'
import router from '../router';
import { apiClient, ENDPOINTS } from '../api/client';
import { useApi } from './api';
import { supabase } from '../lib/supabase';

export const useEventStore = defineStore('event',{
    state: () => ({
        all: null,
        details: null
    }),
    actions: {
        async getMyEvents(){
            const callApi = (authToken) => apiClient(authToken).get(ENDPOINTS.EVENTS.BASE)
            try{
                return await useApi(callApi,{store: this, field: "all"})
            }catch(err){ throw err }
        },
        async getEventDetails(eventToken){
            const callApi = (authToken) => apiClient(authToken).get(ENDPOINTS.EVENTS.DETAIL(eventToken))
            try{
                return await useApi(callApi,{store: this, field: "details"})
            }catch(err){ throw err }
        },
        async createEvent(eventParams){
            const callApi = (authToken) => apiClient(authToken).post(ENDPOINTS.EVENTS.BASE,eventParams)
            try{
                return await useApi(callApi,{store: this, field: "details"})
            }catch(err){ throw err }
        },
        async updateEvent(eventToken,eventParams){
            const callApi = (authToken) => apiClient(authToken).patch(ENDPOINTS.EVENTS.UPDATE(eventToken),eventParams)
            try{
                return await useApi(callApi,{store: this, field: "details"})
            }catch(err){ throw err }
        }
    }

})