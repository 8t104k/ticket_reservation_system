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
    async getEventGroup(eventToken){
      return apiService.call(ENDPOINTS.GROUP.EVENT_GROUP(eventToken), "get", null, this, "details")
    },
    async updateGroup(groupToken,groupParams){
      return apiService.call(ENDPOINTS.GROUP.DETAILS(groupToken), "patch", groupParams, this, "details",false)
    },
    async uploadGroupImage(){
      
    }
  }
})