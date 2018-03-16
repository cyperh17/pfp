import OfferService from './OfferService'

const {
  REACT_APP_PFP_CLIENT,
  REACT_APP_PFP_FAMILY,
  REACT_APP_PFP_INFO,
  REACT_APP_PFP_TARGET,
  REACT_APP_PFP_PROFILE
} = process.env

const createOfferService = url => class extends OfferService {
  constructor (offerId) { super(offerId, url) }
}

/**
 * Сервисы для работы с дочерними сущностями ПФП
 */
export const ClientService = createOfferService(REACT_APP_PFP_CLIENT)
export const FamilyService = createOfferService(REACT_APP_PFP_FAMILY)
export const InfoService = createOfferService(REACT_APP_PFP_INFO)
export const TargetService = createOfferService(REACT_APP_PFP_TARGET)
export const ProfileService = createOfferService(REACT_APP_PFP_PROFILE)
