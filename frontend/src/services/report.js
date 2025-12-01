import { APIConfig } from "./config";

export class ReportServices {
    static endpoint = '/reports'

    static async createReport(reportData, files = []) {
        try {
            const formData = new FormData();
            
            formData.append('type', reportData.type);
            formData.append('description', reportData.description);
            formData.append('location', reportData.location);
            
            if (files && files.length > 0) {
                Array.from(files).forEach(file => {
                    formData.append('evidence', file);
                });
            }

            const response = await APIConfig.fetchWithRetry(
                `${this.endpoint}/create`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to create report: ${error.message}`);
        }
    }

    static async getUnresolvedCount(LGA = null) {
        try {
            const response = await APIConfig.fetchWithRetry(
                `${this.endpoint}/unresolved-count`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: LGA ? JSON.stringify({ LGA }) : JSON.stringify({})
                }
            );

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to get unresolved count: ${error.message}`);
        }
    }

    static async getReports(filters = {}) {
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
            throw new Error(`Failed to get reports: ${error.message}`);
        }
    }

    static async getReportById(reportId) {
        try {
            const response = await APIConfig.fetchWithRetry(
                `${this.endpoint}/${reportId}`,
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
            throw new Error(`Failed to get report: ${error.message}`);
        }
    }

    static async updateReportStatus(reportId, status) {
        try {
            const response = await APIConfig.fetchWithRetry(
                `${this.endpoint}/${reportId}/status`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status })
                }
            );

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to update report status: ${error.message}`);
        }
    }

    static async updateReportPriority(reportId, priority) {
        try {
            const response = await APIConfig.fetchWithRetry(
                `${this.endpoint}/${reportId}/priority`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ priority })
                }
            );

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to update report priority: ${error.message}`);
        }
    }

    /**
     * NEW: Escalate report (sets status to 'Escalated' and priority to 'High')
     */
    static async escalateReport(reportId) {
        try {
            const response = await APIConfig.fetchWithRetry(
                `${this.endpoint}/${reportId}/escalate`,
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
            throw new Error(`Failed to escalate report: ${error.message}`);
        }
    }

    static async deleteReport(reportId, userId = null) {
        try {
            const response = await APIConfig.fetchWithRetry(
                `${this.endpoint}/${reportId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: userId ? JSON.stringify({ userId }) : undefined
                }
            );

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to delete report: ${error.message}`);
        }
    }

    static async getReportStatistics(LGA = null) {
        try {
            const queryParams = LGA ? `?LGA=${encodeURIComponent(LGA)}` : '';
            const response = await APIConfig.fetchWithRetry(
                `${this.endpoint}/statistics${queryParams}`,
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
            throw new Error(`Failed to get report statistics: ${error.message}`);
        }
    }
}