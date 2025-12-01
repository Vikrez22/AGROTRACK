import { APIConfig } from "./config";

export class AnonymousServices {
    static endpoint = '/anonymous'

    static async createReport(reportData, files = []) {
        try {
            const formData = new FormData();
            
            formData.append('type', reportData.type);
            formData.append('location', reportData.location);
            formData.append('description', reportData.description);
            
            formData.append('displayName', reportData.displayName);
            formData.append('LGA', reportData.LGA);
            formData.append('phoneNumber', reportData.phoneNumber);
            
            if (files && files.length > 0) {
                Array.from(files).forEach(file => {
                    formData.append('evidence', file);
                });
            }

            const response = await APIConfig.fetchWithRetry(
                `${this.endpoint}/create-report`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to create anonymous report: ${error.message}`);
        }
    }
}