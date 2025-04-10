import { defineStore } from 'pinia'
import { ENDPOINTS } from '../../api/client';
import { apiService } from '../api';

export const useReservationStore = defineStore('reservation',{
    state: () => ({
        all: null,
        details: null,
        loading: false,
        error: false,
    }),
    actions: {
        async getReservations(eventToken){
            return apiService.call(ENDPOINTS.RESERVATION.BASE(eventToken),"get",null,this,"all")
        },
        async createReservation(eventToken,formData){
            return apiService.call(ENDPOINTS.RESERVATION.BASE(eventToken),"post",formData,this,"details")
        },
        async updateReservation(eventToken,formData){
            return apiService.call(ENDPOINTS.RESERVATION.BASE(eventToken),"patch",formData,this,"details")
        }
    }

})