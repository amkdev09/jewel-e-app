/**
 * API client (fetch-based, same interface as axios for compatibility).
 * Uses native fetch to avoid Metro resolution issues with axios.
 */
export { apiClient as axiosClient } from './apiClient';
export { default } from './apiClient';
