import React, { useState } from "react";
import { MenuContainer, MenuItem, MenuLink, MenuUl, MobileMenuButton, Overlay, SubMenu, SubMenuItem } from "./styles";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowBack, ArrowForward, ArrowLeft, ArrowRight, Build, BusinessCenter, Category, Checklist, ContentPasteSearch, Coronavirus, FindInPage, Handshake, HealthAndSafety, Home, HomeMini, ManageAccounts, Medication, MonitorWeight, PrecisionManufacturing, RemoveCircle, Storefront, Troubleshoot, } from '@mui/icons-material';
import { useMenu } from "./MenuContext";

const Menu: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { user } = useAuth();
    const { isMenuVisible } = useMenu(); // Usa o hook para obter o estado de visibilidade
    const { toggleMenu } = useMenu(); // Usa o hook para alternar a visibilidade do menu

    const permissoes = user?.permissoes;
    const user_type = user?.role ? user?.role : '0';
    const user_id = user?.id;
    //converter permissoes para json
    const permissoesJson = JSON.parse(permissoes || '{}');

    //console.log(user_type);
    //console.log(user_id);

    const [isMedicamentosSubMenuVisible, setIsMedicamentosSubMenuVisible] = useState(false);
    const [isAdministracaoSubMenuVisible, setIsAdministracaoSubMenuVisible] = useState(false);
    const [isVigilanciaSubMenuVisible, setIsVigilanciaSubMenuVisible] = useState(false);
    const [isSimsinascSubMenuVisible, setIsSimsinascSubMenuVisible] = useState(false);
    const [isSinanSubMenuVisible, setIsSinanSubMenuVisible] = useState(false);
    const [isBolsaFamiliaSubMenuVisible, setIsBolsaFamiliaSubMenuVisible] = useState(false);

    const toggleMedicamentosSubMenu = () => setIsMedicamentosSubMenuVisible(!isMedicamentosSubMenuVisible);
    const toggleAdministracaoSubMenu = () => setIsAdministracaoSubMenuVisible(!isAdministracaoSubMenuVisible);
    const toggleVigilanciaSubMenu = () => setIsVigilanciaSubMenuVisible(!isVigilanciaSubMenuVisible);
    const toggleSimsinascSubMenu = () => setIsSimsinascSubMenuVisible(!isSimsinascSubMenuVisible);
    const toggleSinanSubMenu = () => setIsSinanSubMenuVisible(!isSinanSubMenuVisible);
    const toggleBolsaFamiliaSubMenu = () => setIsBolsaFamiliaSubMenuVisible(!isBolsaFamiliaSubMenuVisible);

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirecionar para a página de login após logout
    };

    return (
        <>
            {isMenuVisible && <Overlay onClick={toggleMenu} />} {/* Para clicar fora e fechar o menu */}
            <MenuContainer isVisible={isMenuVisible}>
                <MenuUl>
                    <MenuItem>
                        <MenuLink href="/dashboard">
                            <Home className="me-1" />
                            {"Home"}
                        </MenuLink>
                    </MenuItem>
                    {permissoesJson.permissao_vigilancia_sanitaria && (
                        <>
                            <MenuItem onClick={toggleVigilanciaSubMenu}>
                                <MenuLink>
                                    <ContentPasteSearch className="me-1" />
                                    {"Vigilância Sanitária"}</MenuLink>
                            </MenuItem>
                            {isVigilanciaSubMenuVisible && (
                                <SubMenu>
                                    <SubMenuItem>
                                        <MenuLink href="/estabelecimentos">
                                            <Storefront className="me-1" />
                                            {"Estabelecimentos"}
                                        </MenuLink>
                                    </SubMenuItem>
                                    <SubMenuItem>
                                        <MenuLink href="/tipos-estabelecimentos">
                                            <Checklist className="me-1" />
                                            {"Tipos de Estabelecimentos"}
                                        </MenuLink>
                                    </SubMenuItem>
                                    <SubMenuItem>
                                        <MenuLink href="/series">
                                            <Category className="me-1" />
                                            {"Séries"}
                                        </MenuLink>
                                    </SubMenuItem>
                                    {/* <SubMenuItem>
                                    <MenuLink href="/responsaveis">{"Responsáveis"}</MenuLink>
                                </SubMenuItem> */}
                                    <SubMenuItem>
                                        <MenuLink href="/inspecoes">
                                            <Troubleshoot className="me-1" />
                                            {"Inspeções"}
                                        </MenuLink>
                                    </SubMenuItem>
                                </SubMenu>
                            )}
                        </>
                    )}
                    {permissoesJson.permissao_farmacia && (
                        <>
                            <MenuItem onClick={toggleMedicamentosSubMenu}>
                                <MenuLink>
                                    <HealthAndSafety className="me-1" />
                                    {"Farmácia"}
                                </MenuLink>
                            </MenuItem>
                            {isMedicamentosSubMenuVisible && (
                                <SubMenu>
                                    <SubMenuItem>
                                        <MenuLink href="/medicamentos">
                                            <Medication className="me-1" />
                                            Itens
                                        </MenuLink>
                                    </SubMenuItem>
                                    {['1', '2', '8'].includes(user_type) && (
                                        <>
                                            <SubMenuItem>
                                                <MenuLink href="/medicamentos/entradas">
                                                    <ArrowBack className="me-1" />
                                                    Entradas
                                                </MenuLink>
                                            </SubMenuItem>
                                            <SubMenuItem>
                                                <MenuLink href="/medicamentos/saidas">
                                                    <ArrowForward className="me-1" />
                                                    Saídas
                                                </MenuLink>
                                            </SubMenuItem>
                                        </>
                                    )}
                                </SubMenu>
                            )}
                        </>
                    )}
                    {permissoesJson.permissao_sim_sinasc && (
                        <>
                            <MenuItem onClick={toggleSimsinascSubMenu}>
                                <MenuLink>
                                    <MonitorWeight className="me-1" />
                                    {"SIM/SINASC"}
                                </MenuLink>
                            </MenuItem>
                            {isSimsinascSubMenuVisible && (
                                <SubMenu>
                                    <SubMenuItem>
                                        <MenuLink href="/investigacoes-obito">
                                            <FindInPage className="me-1" />
                                            {"Investigações de Óbito"}
                                        </MenuLink>
                                    </SubMenuItem>
                                </SubMenu>
                            )}
                        </>
                    )}
                    {permissoesJson.permissao_sinan && (
                        <>
                            <MenuItem onClick={toggleSinanSubMenu}>
                                <MenuLink>
                                    <Coronavirus className="me-1" />
                                    {"SINAN"}
                                </MenuLink>
                            </MenuItem>
                            {isSinanSubMenuVisible && (
                                <SubMenu>
                                    <SubMenuItem>
                                        <MenuLink href="/notificacoes-negativas">
                                            <RemoveCircle className="me-1" />
                                            {"Notificações Negativas"}
                                        </MenuLink>
                                    </SubMenuItem>
                                </SubMenu>
                            )}
                        </>
                    )}
                    {permissoesJson.permissao_bolsa_familia && (
                        <>
                            <MenuItem onClick={toggleBolsaFamiliaSubMenu}>
                                <MenuLink>
                                    <Handshake className="me-1" />
                                    {"Bolsa Família"}
                                </MenuLink>
                            </MenuItem>
                            {isBolsaFamiliaSubMenuVisible && (
                                <SubMenu>
                                    <SubMenuItem>
                                        <MenuLink href="/bolsa-familia">
                                            <Handshake className="me-1" />
                                            {"Bolsa Família"}
                                        </MenuLink>
                                    </SubMenuItem>
                                </SubMenu>
                            )}
                        </>
                    )}
                    {['1'].includes(user_type) && (
                        <>
                            <MenuItem onClick={toggleAdministracaoSubMenu}>
                                <MenuLink>
                                    <ManageAccounts className="me-1" />
                                    {"Administração"}
                                </MenuLink>
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
                                    <MenuItem>
                                        <MenuLink href="/unidades-de-saude">{"Unidades de Saúde"}</MenuLink>
                                    </MenuItem>
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
        </>
    );
};

export default Menu;
