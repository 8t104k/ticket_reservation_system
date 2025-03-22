import { defineStore } from 'pinia'
import { ENDPOINTS } from '../api/client';
import { apiService } from './api';

export const useCollaboratorStore = defineStore('collaborator',{
    state: () => ({
        all: null,
        details: null,
        loading: false,
    }),
    actions: {
        async getCollaborators(eventToken){
            return apiService.call(ENDPOINTS.COLLABORATORS.BASE(eventToken), "get", null, this, "all")
        },
    }

})