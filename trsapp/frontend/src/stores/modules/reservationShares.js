import { defineStore } from 'pinia'
import { ENDPOINTS } from '../../api/client';
import { apiService } from '../api';

export const useReservationShareStore = defineStore('reservationShare',{
    state: () => ({
        details: null,
        loading: false,
        error: false,
    }),
    actions: {
        async getReservationShare(eventToken){
            return apiService.call(ENDPOINTS.RESERVATIONSHARE.BASE(eventToken),"get",null,this,"details")
        },
        async createReservationShare(eventToken){
            return apiService.call(ENDPOINTS.RESERVATIONSHARE.BASE(eventToken),"post",null,this,"details")
        },
    }

})