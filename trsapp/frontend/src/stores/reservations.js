import { defineStore } from 'pinia'
import router from '../router';
import { apiClient, ENDPOINTS } from '../api/client';
import { supabase } from '../lib/supabase';
import { apiService } from './api';

export const useReservationStore = defineStore('reservation',{
    state: () => ({
        all: null,
        details: null
    }),
    actions: {
        async getReservations(eventToken){
            return apiService.call(ENDPOINTS.RESERVATIONS.BASE(eventToken),"get",null,this,"all")
        },
        async createReservation(eventToken,formData){
            return apiService.call(ENDPOINTS.RESERVATIONS.BASE(eventToken),"post",formData,this,"details")
        },
        async updateReservation(eventToken,formData){
            return apiService.call(ENDPOINTS.RESERVATIONS.BASE(eventToken),"patch",formData,this,"details")
        }
    }

})