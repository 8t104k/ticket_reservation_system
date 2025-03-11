// api/endpoints.js - エンドポイント定義
export const ENDPOINTS = {
    EVENTS: {
      BASE: '/events',
      DETAIL: (token) => `/events/${token}`,
      RESERVATIONS: (token) => `/events/${token}/reservations`,
      COLLABORATORS: (token) => `/events/${token}/collaborators`,
      EXPORT: (token, format) => `/events/${token}/export?format=${format}`
    },
    RESERVATIONS: {
      DETAIL: (id) => `/reservations/${id}`
    },
    USERS: {
      DETAIL: (token) => `/users/${username}`
    },
  }