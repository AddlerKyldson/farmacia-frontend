import React, { useState } from 'react';
import { Container } from '../../other/form/containerForm/styles';
import CampoTexto from '../../other/form/campoTexto';
import { ButtonLogin, ContainerLogin, FormLogin, PageLogin, TitleLogin } from './styles';
import BotaoSubmit from '../../other/form/botaoSubmit';
import Alert from '../../other/modal/alert';

/* Utilizando typescript */

const LoginPage: React.FC = () => {

    const [formData, setFormData] = useState({
        email: '',
        senha: '',
    });

    //configura exibição do Alert
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

    function handleSubmit(e: any) {
        e.preventDefault();
        console.log(formData);

        var mensagem_erro = [];

        var email = validaCampos(formData.email, 'Email', true);
        var senha = validaCampos(formData.senha, 'Senha', true);

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
                onConfirm: () => {
                    setAlert({ ...alert, show: false });
                },
                onClose: () => {
                    setAlert({ ...alert, show: false });
                }
            });

            return;
        } else {
            //redireciona para a página de listagem
            window.location.href = '/';

        }
    }

    return (
        <PageLogin>
            <ContainerLogin>
                <FormLogin>
                    <TitleLogin>Login</TitleLogin>
                    <CampoTexto label="Email" name='email' tipo='text' onChange={handleChange} />
                    <CampoTexto label="Senha" name='senha' tipo='password' onChange={handleChange} />
                    <BotaoSubmit texto="Entrar" onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                    />
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
}

export default LoginPage;