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
    async changeGroup(eventToken,group_token){
      const params = {collaborator: {group_token: group_token}}
      return apiService.call(ENDPOINTS.GROUP.CHANGE(eventToken), "patch", params, this, "details")
    },
    async uploadGroupImage(){
      
    }
  }
})