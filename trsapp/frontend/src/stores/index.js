import { useAuthStore } from "./modules/auth"
import { useEventStore } from './modules/event'
import { useReservationStore } from './modules/reservations'
import { useUiStore,useDialogStore } from './modules/uiSetting'
import { useCollaboratorStore } from "./modules/collaborator"
import { useReservationShareStore } from "./modules/reservationShares"

export {
  useAuthStore,
  useEventStore,
  useReservationStore,
  useUiStore,
  useDialogStore,
  useCollaboratorStore,
  useReservationShareStore,
}

export const stores = {
  auth: useAuthStore,
  event: useEventStore,
  reservation: useReservationStore,
  ui: useUiStore,
  dialog: useDialogStore,
  collaborator: useCollaboratorStore,
  reservationShare: useReservationShareStore
}

export function useStores() {
  // 各ストアのインスタンスを作成して返す
  return Object.entries(stores).reduce((acc, [key, storeFn]) => {
    acc[key] = storeFn()
    return acc
  }, {})
}