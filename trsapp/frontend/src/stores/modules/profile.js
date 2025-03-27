import { defineStore } from 'pinia'
import { ENDPOINTS } from '../../api/client';
import { apiService } from '../api';

export const useProfileStore = defineStore('profile',{
  state: () => ({
      details: null,
      loading: false,
      error: false
  }),
  actions: {
      async getProfile(username) {
          return apiService.call(ENDPOINTS.PROFILE.DETAIL(username), "get", null, this, "details");
      },
      async updateProfile(username, forms) {
          return apiService.call(ENDPOINTS.PROFILE.UPDATE(username), "patch", forms, this, "details");
      }
  }

})