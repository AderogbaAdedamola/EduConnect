import { axiosTest } from '../api/port';
import { useAuth } from '../context/AuthContext';
import { useState, useCallback } from 'react';

const useRefreshToken = () => {
    const { setAccessToken, setUser } = useAuth();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refresh = useCallback(async () => {
        // Prevent multiple simultaneous refresh calls
        if (isRefreshing) {
            console.log('Refresh already in progress, waiting...');
            // Wait for existing refresh to complete
            await new Promise(resolve => setTimeout(resolve, 100));
            return refresh();
        }
        
        setIsRefreshing(true);
        
        try {
            const response = await axiosTest.post(
                "/auth/refresh",
                {},
                { 
                    withCredentials: true,
                    headers: {
                        // Don't include expired access token
                    }
                }
            );
            
            const newAccessToken = response?.data?.accessToken;
            const newUser = response?.data?.user; // If backend returns user
            
            if (!newAccessToken) {
                throw new Error('Refresh token failed: No access token received');
            }
            
            setAccessToken(newAccessToken);
            
            // Update user if provided
            if (newUser) {
                setUser(newUser);
            }
            
            return {
                accessToken: newAccessToken,
                user: newUser
            };
            
        } catch (error) {
            console.error('Refresh token error:', error);
            
            // Handle specific error cases
            if (error.response?.status === 401) {
                // Refresh token itself is invalid/expired
                setAccessToken(null);
                setUser(null);
                // Optional: Redirect to login
                window.location.href = '/login';
            }
            
            throw error;
            
        } finally {
            setIsRefreshing(false);
        }
    }, [isRefreshing, setAccessToken, setUser]);
    
    return {
        refresh,
        isRefreshing
    };
};

export default useRefreshToken;