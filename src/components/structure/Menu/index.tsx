import React, { useState } from "react";
import { MenuContainer, MenuItem, MenuLink, MenuUl, SubMenu, SubMenuItem } from "./styles";

const Menu: React.FC = () => {
    const [isMedicamentosSubMenuVisible, setIsMedicamentosSubMenuVisible] = useState(false);
    const [isAdministracaoSubMenuVisible, setIsAdministracaoSubMenuVisible] = useState(false);

    const toggleMedicamentosSubMenu = () => setIsMedicamentosSubMenuVisible(!isMedicamentosSubMenuVisible);
    const toggleAdministracaoSubMenu = () => setIsAdministracaoSubMenuVisible(!isAdministracaoSubMenuVisible);

    return (
        <MenuContainer>
            <MenuUl>
                <MenuItem>
                    <MenuLink href="/">{"Home"}</MenuLink>
                </MenuItem>
                <MenuItem>
                    <MenuLink href="/estabelecimentos">{"Estabelecimentos"}</MenuLink>
                </MenuItem>
                <MenuItem>
                    <MenuLink href="/unidades-de-saude">{"Unidades de Saúde"}</MenuLink>
                </MenuItem>
                <MenuItem>
                    <MenuLink href="/inspecoes">{"Inspeções"}</MenuLink>
                </MenuItem>
                <MenuItem onClick={toggleMedicamentosSubMenu}>
                    <MenuLink>{"Medicamentos"}</MenuLink>
                </MenuItem>
                {isMedicamentosSubMenuVisible && (
                    <SubMenu>
                        <SubMenuItem>
                            <MenuLink href="/medicamentos">Listar</MenuLink>
                        </SubMenuItem>                  
                        <SubMenuItem>
                            <MenuLink href="/medicamentos/entradas">Entradas</MenuLink>
                        </SubMenuItem>
                        <SubMenuItem>
                            <MenuLink href="/medicamentos/saidas">Saídas</MenuLink>
                        </SubMenuItem>
                    </SubMenu>
                )}
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
                            <MenuLink href="/responsaveis">{"Responsáveis"}</MenuLink>
                        </SubMenuItem>
                        <SubMenuItem>
                            <MenuLink href="/cidadaos">{"Cidadãos"}</MenuLink>
                        </SubMenuItem>
                        <SubMenuItem>
                            <MenuLink href="/usuarios">{"Usuários"}</MenuLink>
                        </SubMenuItem>
                        <SubMenuItem>
                            <MenuLink href="/series">{"Séries"}</MenuLink>
                        </SubMenuItem>
                        <SubMenuItem>
                            <MenuLink href="/tipos-estabelecimentos">{"Tipos de Estabelecimentos"}</MenuLink>
                        </SubMenuItem>
                    </SubMenu>
                )}
                {/* Continuação de outros itens do menu */}
            </MenuUl>
        </MenuContainer>
    );
};

export default Menu;
