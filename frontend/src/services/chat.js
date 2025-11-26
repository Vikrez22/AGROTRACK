import { APIConfig } from "./config";

export class ChatServices {

    static endpoint = '/chats'

    static async sendMessage (message) {
        try {
            const response = await APIConfig.fetchWithRetry(
                `${this.endpoint}/send`, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(message)
            })

            const data = await response.json();

            return data

        } catch (error) {
            throw new Error(`Failed to send message: ${error.message}`);
        }
    }

    static async getUserUnreadCount (){
        try {
            const response = await APIConfig.fetchWithRetry(
                `${this.endpoint}/unread-count`,
                {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                }
            )
            const data = await response.json()

            return data

        } catch (error) { 
            throw new Error(`Failed to get unread messages: ${error.message}`)

        }
    }
}