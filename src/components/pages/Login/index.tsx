import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Importando a função nomeada jwtDecode
import { Container } from '../../other/form/containerForm/styles';
import CampoTexto from '../../other/form/campoTexto';
import { ButtonLogin, ContainerLogin, FormLogin, PageLogin, TitleLogin } from './styles';
import BotaoSubmit from '../../other/form/botaoSubmit';
import Alert from '../../other/modal/alert';
import server from '../../../utils/data/server';
import { useAuth } from '../../../context/AuthContext';

const LoginPage: React.FC = () => {
    const navigate = useNavigate(); // Inicializar useNavigate para redirecionamento
    const { login } = useAuth(); // Obtenha a função de login do contexto de autenticação

    const [formData, setFormData] = useState({
        email: '',
        senha: '',
    });

    const [alert, setAlert] = useState({
        show: false,
        success: false,
        title: '',
        message: [''],
        onConfirm: () => { },
        onClose: () => { }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function validaCampos(value = '', nome_campo = '', obrigatorio = false, tamanho = null) {
        let erro = false;
        let mensagem_erro = '';

        if (obrigatorio && (value === '' || value === null || value === '0')) {
            erro = true;
            mensagem_erro = `Campo ${nome_campo} obrigatório`;
        }

        if (tamanho !== null && value !== null && value.length !== tamanho) {
            erro = true;
            mensagem_erro = `O campo deve ter ${tamanho} caracteres`;
        }

        return { erro, mensagem_erro };
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const mensagem_erro = [];
        const email = validaCampos(formData.email, 'Email', true);
        const senha = validaCampos(formData.senha, 'Senha', true);

        if (email.erro) {
            mensagem_erro.push(email.mensagem_erro);
        }

        if (senha.erro) {
            mensagem_erro.push(senha.mensagem_erro);
        }

        if (mensagem_erro.length > 0) {
            setAlert({
                show: true,
                success: false,
                title: 'Erro',
                message: mensagem_erro,
                onConfirm: () => setAlert({ ...alert, show: false }),
                onClose: () => setAlert({ ...alert, show: false })
            });
            return;
        }

        try {
            const response = await axios.post(`${server.url}${server.endpoints.login}`, {
                email: formData.email,
                senha: formData.senha
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            const { token } = response.data;
            if (typeof token !== 'string') {
                throw new Error('Token is not a string');
            }
            const decodedToken = jwtDecode(token); // Uso correto de jwtDecode se assim está importado
            console.log("Decoded Token:", decodedToken);

            login(token);

            navigate('/dashboard');

        } catch (error) {
            console.error("Error during login:", error);
            setAlert({
                show: true,
                success: false,
                title: 'Erro',
                message: ['Erro ao efetuar login. Por favor, tente novamente.' + error],
                onConfirm: () => setAlert({ ...alert, show: false }),
                onClose: () => setAlert({ ...alert, show: false })
            });
        }
    };

    return (
        <PageLogin>
            <ContainerLogin>
                <FormLogin onSubmit={handleSubmit}>
                    <TitleLogin>Login</TitleLogin>
                    <CampoTexto label="Email" name='email' tipo='text' onChange={handleChange} />
                    <CampoTexto label="Senha" name='senha' tipo='password' onChange={handleChange} />
                    <BotaoSubmit texto="Entrar" />
                </FormLogin>
            </ContainerLogin>

            <Alert
                title={alert.title}
                message={alert.message}
                success={alert.success}
                show={alert.show}
                onConfirm={alert.onConfirm}
                onClose={alert.onClose}
            />
        </PageLogin>
    );
};

export default LoginPage;
