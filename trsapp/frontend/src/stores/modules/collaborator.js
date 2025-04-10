import { defineStore } from 'pinia'
import { ENDPOINTS } from '../../api/client';
import { apiService } from '../api';

export const useCollaboratorStore = defineStore('collaborator',{
  state: () => ({
    all: null,
    current: null,
    details: null,
    loading: false,
    error: false,
  }),
  actions: {
    async getCollaborators(eventToken){
      return apiService.call(ENDPOINTS.COLLABORATOR.BASE(eventToken), "get", null, this, "all")
    },
    async getCurrentClbr(eventToken){
      return apiService.call(ENDPOINTS.COLLABORATOR.CURRENCLBR(eventToken), "get", null, this, "current")
    }
  }
})