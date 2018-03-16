import { prefix } from './_prefix'

export const RESET = prefix + 'RESET'

/**
 * Очистить данные форм создания ПФП
 */
export const reset = () => ({ type: RESET })
