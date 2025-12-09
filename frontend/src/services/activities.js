import { APIConfig } from "./config";

export class ActivityServices {
    static endpoint = '/activities'

    /**
     * Create a new activity for the authenticated user
     */
    static async createActivity(activityData) {
        try {
            const response = await APIConfig.fetchWithRetry(
                `${this.endpoint}/create`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(activityData)
                }
            );

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to create activity: ${error.message}`);
        }
    }

    /**
     * Create a new activity for a specific user (Admin only)
     */
    static async createActivityFromAdmin(activityData) {
        try {
            const response = await APIConfig.fetchWithRetry(
                `${this.endpoint}/admin/create`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(activityData)
                }
            );

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to create activity from admin: ${error.message}`);
        }
    }

    /**
     * Get all activities for the authenticated user
     * @param {Object} filters - Optional filters (referenceActivity, isOpen, limit, orderBy, order)
     */
    static async getActivities(filters = {}) {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const url = queryParams 
                ? `${this.endpoint}?${queryParams}` 
                : this.endpoint;

            const response = await APIConfig.fetchWithRetry(
                url,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to get activities: ${error.message}`);
        }
    }

    /**
     * Get a specific activity by ID
     */
    static async getActivityById(activityId) {
        try {
            const response = await APIConfig.fetchWithRetry(
                `${this.endpoint}/${activityId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to get activity: ${error.message}`);
        }
    }

    /**
     * Update activity status (mark as read/unread)
     */
    static async updateActivityStatus(activityId, isOpen) {
        try {
            const response = await APIConfig.fetchWithRetry(
                `${this.endpoint}/${activityId}/status`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ isOpen })
                }
            );

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to update activity status: ${error.message}`);
        }
    }

    /**
     * Mark all activities as read
     */
    static async markAllAsRead() {
        try {
            const response = await APIConfig.fetchWithRetry(
                `${this.endpoint}/mark-all-read`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to mark all activities as read: ${error.message}`);
        }
    }

    /**
     * Delete a specific activity
     */
    static async deleteActivity(activityId) {
        try {
            const response = await APIConfig.fetchWithRetry(
                `${this.endpoint}/${activityId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to delete activity: ${error.message}`);
        }
    }

    /**
     * Delete all activities for the authenticated user
     * @param {Object} filters - Optional filters (referenceActivity, isOpen)
     */
    static async deleteAllActivities(filters = {}) {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const url = queryParams 
                ? `${this.endpoint}?${queryParams}` 
                : this.endpoint;

            const response = await APIConfig.fetchWithRetry(
                url,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to delete all activities: ${error.message}`);
        }
    }

    /**
     * Helper method to get only unread activities
     */
    static async getUnreadActivities(filters = {}) {
        return this.getActivities({ ...filters, isOpen: true });
    }

    /**
     * Helper method to mark activity as read
     */
    static async markAsRead(activityId) {
        return this.updateActivityStatus(activityId, false);
    }

    /**
     * Helper method to mark activity as unread
     */
    static async markAsUnread(activityId) {
        return this.updateActivityStatus(activityId, true);
    }
}