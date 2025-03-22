import { defineStore } from 'pinia'
import { apiClient, ENDPOINTS } from '../api/client';
import { supabase } from '../lib/supabase';
import { useApi } from './api';

export const useCollaboratorStore = defineStore('collaborator',{
    state: () => ({
        all: null,
        details: null,
        loading: false,
    }),
    actions: {
        async getCollaborators(eventToken){
            const callApi = (authToken) => apiClient(authToken).get(ENDPOINTS.COLLABORATORS.BASE(eventToken))
            await useApi(callApi,{store: this, field: "all"})
        },
    }

})