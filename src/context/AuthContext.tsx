import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Importando a função nomeada jwtDecode

interface AuthContextProps {
    isAuthenticated: boolean;
    user: { email: string, unique_name: string, permissoes: string, role: string, id: string } | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface DecodedToken {
    email: string;
    unique_name: string;
    exp: number; // Adicione este campo para verificar a data de expiração
    Permissoes: string;
    role: string;
    Id: string;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('jwtToken'));
    const [user, setUser] = useState<{ email: string, unique_name: string, role: string, permissoes: string, id: string } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            try {
                const decodedToken: DecodedToken = jwtDecode(token);

                // Verifique se o token está expirado
                if (decodedToken.exp * 1000 < Date.now()) {
                    console.error('Token expirado');
                    localStorage.removeItem('jwtToken');
                    setIsAuthenticated(false);
                    return;
                }

                setUser({ email: decodedToken.email, unique_name: decodedToken.unique_name, permissoes: decodedToken.Permissoes, role: decodedToken.role, id: decodedToken.Id });
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('jwtToken', token);
        try {
            const decodedToken: DecodedToken = jwtDecode(token);

            // Verifique se o token está expirado
            if (decodedToken.exp * 1000 < Date.now()) {
                console.error('Token expirado');
                localStorage.removeItem('jwtToken');
                setIsAuthenticated(false);
                return;
            }

            setUser({ email: decodedToken.email, unique_name: decodedToken.unique_name, permissoes: decodedToken.Permissoes, role: decodedToken.role, id: decodedToken.Id });
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
