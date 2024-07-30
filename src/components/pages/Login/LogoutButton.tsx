import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext'; 

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirecionar para a página de login após logout
    };

    return (
        <a onClick={handleLogout}>
            Logout
        </a>
    );
};

export default LogoutButton;