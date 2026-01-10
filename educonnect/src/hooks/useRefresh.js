import { api } from '../api/port';
import { useAuth } from '../context/AuthContext';

const useRefreshToken = () => {
    const { accessToken, setAccessToken, setUser } = useAuth();

    const refresh = async () => {
        // console.log(accessToken)
        const response = await api.post("/auth/refresh" ,{},
        { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        setAccessToken(response.data.accessToken);
        setUser(prev => prev);

        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;