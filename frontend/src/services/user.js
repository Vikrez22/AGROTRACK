import { APIConfig } from './config';

export class UserService {
  static endpoint = '/users';

  static async createProfile(userData) {
    try {
      const response = await APIConfig.fetchWithRetry(
        `${this.endpoint}/profile`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      );

      
      const data = await response.json();
      
      return data;
    } catch (err) {
      throw new Error(`Failed to create user profile: ${err.message}`);
    }
  }

 
  static async getProfile(uid) {
    try {
      const response = await APIConfig.fetchWithRetry(
        `${this.endpoint}/profile/${uid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      console.log('the data from user service', data)

      return data;
    } catch (err) {
      throw new Error(`Failed to fetch user profile: ${err.message}`);
    }
  }

  
  static async updateProfile(uid, updates) {
    try {
      const response = await APIConfig.fetchWithRetry(
        `${this.endpoint}/profile/${uid}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updates),
        }
      );

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(`Failed to update user profile: ${err.message}`);
    }
  }

  
  static async getAllUsers(role = null) {
    try {
      const queryParam = role ? `?role=${role}` : '';
      const response = await APIConfig.fetchWithRetry(
        `${this.endpoint}${queryParam}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(`Failed to fetch users: ${err.message}`);
    }
  }

  
  static async deleteProfile(uid) {
    try {
      const response = await APIConfig.fetchWithRetry(
        `${this.endpoint}/profile/${uid}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(`Failed to delete user profile: ${err.message}`);
    }
  }

  
  static setAuthToken(token) {
    APIConfig.authToken = token;
  }

  
  static clearAuthToken() {
    APIConfig.authToken = null;
  }
}