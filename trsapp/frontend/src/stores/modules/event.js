import { defineStore } from 'pinia'
import { ENDPOINTS } from '../../api/client';
import { apiService } from '../api';

export const useEventStore = defineStore('event',{
    state: () => ({
        all: null,
        details: null,
        loading: false
    }),
    actions: {
        async getMyEvents() {
            return apiService.call(ENDPOINTS.PROFILE.BASE, "get", null, this, "all");
        },
        async getEventDetails(eventToken) {
            return apiService.call(ENDPOINTS.PROFILE.DETAIL(eventToken), "get", null, this, "details");
        },
        async createEvent(eventParams) {
            return apiService.call(ENDPOINTS.PROFILE.BASE, "post", eventParams, this, "details");
        },
        async updateEvent(eventToken, eventParams) {
            return apiService.call(ENDPOINTS.PROFILE.UPDATE(eventToken), "patch", eventParams, this, "details");
        }
    }

})