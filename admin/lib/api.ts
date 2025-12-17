import { useAuth } from '@/stores/useAuth';

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

export async function fetchWithAuth(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { requiresAuth = true, ...fetchOptions } = options;
  const { token, setToken, logout } = useAuth.getState();

  // Add authorization header if token exists and auth is required
  if (requiresAuth && token) {
    fetchOptions.headers = {
      ...fetchOptions.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // Always include credentials for cookies
  fetchOptions.credentials = 'include';

  let response = await fetch(url, fetchOptions);

  // If unauthorized and we have auth enabled, try to refresh token
  if (response.status === 401 && requiresAuth && token) {
    try {
      // Try to refresh the access token
      const refreshResponse = await fetch(
        'http://localhost:5000/api/v1/auth/refresh',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        const newAccessToken = data.accessToken;

        // Update token in store
        setToken(newAccessToken);

        // Retry original request with new token
        fetchOptions.headers = {
          ...fetchOptions.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        response = await fetch(url, fetchOptions);
      } else {
        // Refresh failed, logout user
        logout();
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      window.location.href = '/';
    }
  }

  return response;
}