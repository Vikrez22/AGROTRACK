import { auth } from '../config/firebase';

export class APIConfig {
    static baseURL = import.meta.env.VITE_BACKEND_API_URL;
    static maxRetries = 3;

    static async getAuthToken() {
        const user = auth.currentUser;
        if (user) {
            return await user.getIdToken();
        }
        return null;
    }

    static async fetchWithRetry(
        endpoint,
        options = {},
        retries = this.maxRetries
    ) {
        const url = `${this.baseURL}/api${endpoint}`;
        
        // Get fresh token from Firebase
        const token = await this.getAuthToken();
        
        if (token) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`
            };
        }
        
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
                }
                return response;
            } catch(err) {
                if (i === retries - 1) throw err;
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
            }
        }
        throw new Error('Max retries exceeded');
    }
}