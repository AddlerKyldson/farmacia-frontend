import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Definimos a interface do contexto
interface MenuContextData {
    isMenuVisible: boolean;
    toggleMenu: () => void;
}

// Criamos o contexto
const MenuContext = createContext<MenuContextData | undefined>(undefined);

// Provedor de contexto
export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    // Função para alternar o estado de visibilidade do menu
    const toggleMenu = () => setIsMenuVisible(prev => !prev);

    useEffect(() => {
        // Define a visibilidade inicial com base no tamanho da janela
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuVisible(true); // Exibir o menu por padrão no desktop (largura >= 768px)
            } else {
                setIsMenuVisible(false); // Esconder o menu por padrão no mobile
            }
        };

        // Chama a função de ajuste ao montar o componente
        handleResize();

        // Adiciona um listener para mudanças no tamanho da janela
        window.addEventListener('resize', handleResize);

        // Remove o listener quando o componente for desmontado
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <MenuContext.Provider value={{ isMenuVisible, toggleMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

// Hook para consumir o contexto
export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenu deve ser usado dentro de um MenuProvider");
    }
    return context;
};
