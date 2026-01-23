import { api } from '../api/port';
import { useAuth } from '../context/AuthContext';

const useRefreshToken = () => {
    const { setAccessToken, setUser } = useAuth(); // Only need setter

    const refresh = async () => {
        try {
            const response = await api.post(
                "/auth/refresh",
                {},
                { 
                    withCredentials: true,
                }
            );
            
            const newAccessToken = response?.data?.accessToken;
            
            if (!newAccessToken) {
                throw new Error('No access token in response');
            }
            
            setAccessToken(newAccessToken);
            return newAccessToken;
            
        } catch (error) {
            console.error('Refresh token failed:', error);
            
            // Optional: Clear auth state on failure
            // setAccessToken(null);
            // setUser(null);
            
            throw error; // Re-throw so caller knows it failed
        }
    };
    
    return refresh;
};

export default useRefreshToken;