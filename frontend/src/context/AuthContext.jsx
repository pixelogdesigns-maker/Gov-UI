
import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Default to Admin User immediately
    const [user, setUser] = useState({
        name: 'System Admin',
        email: 'admin@gov.in',
        role: 'Admin',
        token: 'dummy_token'
    });
    const [loading, setLoading] = useState(false);

    // No need to check localStorage anymore

    const login = async (email, password) => {
        // Mock login if ever called
        return user;
    };

    const logout = () => {
        // Do nothing or maybe show a message
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
