import { defineStore } from 'pinia'
import { ENDPOINTS } from '../../api/client';
import { apiService } from '../api';

export const useProfileStore = defineStore('profile',{
  state: () => ({
      details: null,
      loading: true,
      error: false
  }),
  actions: {
    async getProfile(username) {
      console.log("getProfile")
      return apiService.call(ENDPOINTS.PROFILE.BASE(username), "get", null, this, "details");
    },
    async updateProfile(username, forms) {
      return apiService.call(ENDPOINTS.PROFILE.UPDATE(username), "patch", forms, this, "details");
    },
    async passwordReset(username, forms) {
      //return apiService.call(ENDPOINTS.PROFILE.UPDATE(username), "patch", forms, this, "details");
    },
    async changeEmail(username, forms) {
      //return apiService.call(ENDPOINTS.PROFILE.UPDATE(username), "patch", forms, this, "details");
    },
  }
})