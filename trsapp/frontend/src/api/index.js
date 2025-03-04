// api/index.js - メインエクスポート
import apiClient from './client'
import { eventService } from './services/eventService'
import { reservationService } from './services/reservationService'

export {
  apiClient,
  eventService,
  reservationService
}