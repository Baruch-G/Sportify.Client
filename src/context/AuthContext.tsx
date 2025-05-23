import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    roles: string[];
}

interface AuthResponse {
    message: string;
    accessToken: string;
    refreshToken: string;
    user: User;
}

interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    login: (data: AuthResponse) => void;
    logout: () => void;
    setImage: (image: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Load auth data from localStorage on initial render
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (storedUser && storedAccessToken && storedRefreshToken) {
            setUser(JSON.parse(storedUser));
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (data: AuthResponse) => {
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        // Update state
        setUser(data.user);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        // Clear localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Clear state
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        setIsAuthenticated(false);
    };

    const setImage = (image: string) => {
        if (user) {
            const updatedUser = { ...user, image };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, refreshToken, isAuthenticated, login, logout, setImage }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 