import React, { useEffect, useState } from "react";
import { HeaderContainer, LinkOption, LiOption, UlOptions } from "./styles";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu'; // Ícone de informação
import { useAuth } from "../../../context/AuthContext";
import Menu from "../Menu";
import { useMenu } from "../Menu/MenuContext";


const Header: React.FC = () => {
    const { user } = useAuth();
    const [currentTime, setCurrentTime] = useState<string>("");
    const { toggleMenu } = useMenu(); // Usa o hook para alternar a visibilidade do menu

    useEffect(() => {
        // Função para obter a data e hora atuais no fuso horário de Brasília
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "America/Sao_Paulo",
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: 'long', // Para exibir o nome completo do mês
                year: 'numeric'
            };
            const formattedDate = now.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
            const formattedTime = now.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'America/Sao_Paulo'
            });

            setCurrentTime(`${formattedDate} - ${formattedTime}`);
        };

        // Atualiza o tempo imediatamente ao carregar o componente
        updateTime();

        // Atualiza o tempo a cada minuto (60.000 ms)
        const intervalId = setInterval(updateTime, 60000);

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(intervalId);
    }, []);

    return (
        <HeaderContainer>
            {/* Conteúdo do cabeçalho */}

            <UlOptions >
                <LiOption className="d-none d-md-flex">
                    <LinkOption href="#" >
                        {/* Data e Hora de Brasília */}
                        {currentTime}
                    </LinkOption>
                </LiOption>
            </UlOptions>
            <UlOptions>
                <LiOption>
                    <LinkOption href="#">
                        <AccountCircleIcon style={{ marginRight: '8px' }} />
                        {user ? user.unique_name.split(' ')[0] : 'Usuário Inválido'}
                    </LinkOption>
                </LiOption>
                <LiOption className="d-md-none">
                    <LinkOption href="#" onClick={toggleMenu}>
                        <MenuIcon style={{ marginRight: '8px' }} />
                    </LinkOption>
                </LiOption>
            </UlOptions>

        </HeaderContainer>
    )
};

export default Header;
