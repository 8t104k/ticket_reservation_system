import { defineStore } from 'pinia'
import { ENDPOINTS } from '../../api/client';
import { apiService } from '../api';

export const useReservationStore = defineStore('reservation',{
    state: () => ({
        all: null,
        details: null,
        loading: false
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