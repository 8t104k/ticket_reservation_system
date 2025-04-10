import { defineStore } from 'pinia'
import { ENDPOINTS } from '../../api/client';
import { apiService } from '../api';

export const useGroupStore = defineStore('group',{
  state: () => ({
    all: null,
    details: null,
    loading: false,
    error: false,
  }),
  actions: {
    async getAllGroups(){
      return apiService.call(ENDPOINTS.GROUP.BASE(), "get", null, this, "all")
    },
    async createGroups(groupParams){
      return apiService.call(ENDPOINTS.GROUP.BASE(), "post", groupParams, this, "details")
    },
    async getSettingGroup(groupToken){
      return apiService.call(ENDPOINTS.GROUP.DETAILS(groupToken), "get", null, this, "details")
    },
    async updateGroup(groupToken){
      return apiService.call(ENDPOINTS.GROUP.DETAILS(groupToken), "get", null, this, "details")
    },
    async uploadGroupImage(){
      
    }
  }
})