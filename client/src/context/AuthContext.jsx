import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload, isAuthenticated: true };
        case 'LOGOUT':
            return { ...state, user: null, isAuthenticated: false };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null, isAuthenticated: false });

    const login = async (email, password) => {
        const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        dispatch({ type: 'LOGIN', payload: response.data.user });
        localStorage.setItem('token', response.data.token);
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
