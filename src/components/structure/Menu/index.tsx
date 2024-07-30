import React, { useState } from "react";
import { MenuContainer, MenuItem, MenuLink, MenuUl, SubMenu, SubMenuItem } from "./styles";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Menu: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { user } = useAuth();

    const permissoes = user?.permissoes;
    const user_type = user?.role;
    const user_id = user?.id;
    //converter permissoes para json
    const permissoesJson = JSON.parse(permissoes || '{}');

    console.log(user_type);
    console.log(user_id);

    const [isMedicamentosSubMenuVisible, setIsMedicamentosSubMenuVisible] = useState(false);
    const [isAdministracaoSubMenuVisible, setIsAdministracaoSubMenuVisible] = useState(false);
    const [isVigilanciaSubMenuVisible, setIsVigilanciaSubMenuVisible] = useState(false);

    const toggleMedicamentosSubMenu = () => setIsMedicamentosSubMenuVisible(!isMedicamentosSubMenuVisible);
    const toggleAdministracaoSubMenu = () => setIsAdministracaoSubMenuVisible(!isAdministracaoSubMenuVisible);
    const toggleVigilanciaSubMenu = () => setIsVigilanciaSubMenuVisible(!isVigilanciaSubMenuVisible);



    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirecionar para a página de login após logout
    };

    return (
        <MenuContainer>
            <MenuUl>
                <MenuItem>
                    <MenuLink href="/dashboard">{"Home"}</MenuLink>
                </MenuItem>
                {permissoesJson.permissao_vigilancia_sanitaria && (
                    <>
                        <MenuItem onClick={toggleVigilanciaSubMenu}>
                            <MenuLink>{"Vigilância Sanitária"}</MenuLink>
                        </MenuItem>
                        {isVigilanciaSubMenuVisible && (
                            <SubMenu>
                                <SubMenuItem>
                                    <MenuLink href="/estabelecimentos">{"Estabelecimentos"}</MenuLink>
                                </SubMenuItem>
                                <SubMenuItem>
                                    <MenuLink href="/tipos-estabelecimentos">{"Tipos de Estabelecimentos"}</MenuLink>
                                </SubMenuItem>
                                <SubMenuItem>
                                    <MenuLink href="/series">{"Séries"}</MenuLink>
                                </SubMenuItem>
                                <SubMenuItem>
                                    <MenuLink href="/responsaveis">{"Responsáveis"}</MenuLink>
                                </SubMenuItem>
                                <SubMenuItem>
                                    <MenuLink href="/inspecoes">{"Inspeções"}</MenuLink>
                                </SubMenuItem>
                            </SubMenu>
                        )}
                    </>
                )}

                <MenuItem>
                    <MenuLink href="/unidades-de-saude">{"Unidades de Saúde"}</MenuLink>
                </MenuItem>
                <MenuItem onClick={toggleMedicamentosSubMenu}>
                    <MenuLink>{"Farmácia"}</MenuLink>
                </MenuItem>
                {isMedicamentosSubMenuVisible && (
                    <SubMenu>
                        <SubMenuItem>
                            <MenuLink href="/medicamentos">Itens</MenuLink>
                        </SubMenuItem>
                        <SubMenuItem>
                            <MenuLink href="/medicamentos/entradas">Entradas</MenuLink>
                        </SubMenuItem>
                        <SubMenuItem>
                            <MenuLink href="/medicamentos/saidas">Saídas</MenuLink>
                        </SubMenuItem>
                    </SubMenu>
                )}
                {permissoesJson.permissao_vigilancia_sanitaria && (
                    <>
                        <MenuItem onClick={toggleAdministracaoSubMenu}>
                            <MenuLink>{"Administração"}</MenuLink>
                        </MenuItem>
                        {isAdministracaoSubMenuVisible && (
                            <SubMenu>
                                <SubMenuItem>
                                    <MenuLink href="/cidades">Cidades</MenuLink>
                                </SubMenuItem>
                                <SubMenuItem>
                                    <MenuLink href="/estados">Estados</MenuLink>
                                </SubMenuItem>
                                <SubMenuItem>
                                    <MenuLink href="/regionais">Regionais</MenuLink>
                                </SubMenuItem>
                                <SubMenuItem>
                                    <MenuLink href="/bairros">Bairros</MenuLink>
                                </SubMenuItem>
                                <SubMenuItem>
                                    <MenuLink href="/cidadaos">{"Cidadãos"}</MenuLink>
                                </SubMenuItem>
                                <SubMenuItem>
                                    <MenuLink href="/usuarios">{"Usuários"}</MenuLink>
                                </SubMenuItem>
                            </SubMenu>
                        )}
                    </>
                )}
                {/* Continuação de outros itens do menu */}
                <MenuItem>
                    <MenuLink href="#" onClick={handleLogout} >{"Logout"}</MenuLink>
                </MenuItem>
            </MenuUl>
        </MenuContainer>
    );
};

export default Menu;
