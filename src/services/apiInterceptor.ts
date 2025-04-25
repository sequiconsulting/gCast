import { useAuth } from '../contexts/AuthContext';

class ApiInterceptor {
  private static instance: ApiInterceptor;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  private constructor() {}

  static getInstance(): ApiInterceptor {
    if (!ApiInterceptor.instance) {
      ApiInterceptor.instance = new ApiInterceptor();
    }
    return ApiInterceptor.instance;
  }

  private async refreshToken(): Promise<string> {
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
          refresh_token: localStorage.getItem('refresh_token') || '',
          grant_type: 'refresh_token'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      return data.access_token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }

  private onRefreshed(token: string) {
    this.refreshSubscribers.forEach(callback => callback(token));
    this.refreshSubscribers = [];
  }

  private addSubscriber(callback: (token: string) => void) {
    this.refreshSubscribers.push(callback);
  }

  async fetch(url: string, options: RequestInit = {}): Promise<Response> {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      throw new Error('No access token available');
    }

    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`
    };

    try {
      const response = await fetch(url, { ...options, headers });

      if (response.status === 401) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;

          try {
            const newToken = await this.refreshToken();
            this.onRefreshed(newToken);
            this.isRefreshing = false;

            // Retry the original request with the new token
            return this.fetch(url, options);
          } catch (error) {
            this.isRefreshing = false;
            throw error;
          }
        } else {
          // Wait for the token refresh to complete
          return new Promise((resolve) => {
            this.addSubscriber((token: string) => {
              const newHeaders = {
                ...options.headers,
                'Authorization': `Bearer ${token}`
              };
              resolve(fetch(url, { ...options, headers: newHeaders }));
            });
          });
        }
      }

      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}

export const apiInterceptor = ApiInterceptor.getInstance(); 