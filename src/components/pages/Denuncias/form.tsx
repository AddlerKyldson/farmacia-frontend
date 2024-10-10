import React, { useEffect, useState } from "react";
import Layout from "../../structure/Layout";
import Breadcrumb from "../../other/breadCrumb";
import Titulo from "../../other/tituloPage";
import ContainerForm from "../../other/form/containerForm";
import CampoTexto from "../../other/form/campoTexto";
import CampoSelect from "../../other/form/campoSelect";
import BotaoSubmit from "../../other/form/botaoSubmit";
import Row from "../../other/grid/row";
import Alert from "../../other/modal/alert";
import axios from "axios";
import server from "../../../utils/data/server";
import BotaoExcluir from "../../other/form/botaoExcluir";
import CampoAreaTexto from "../../other/form/campoAreaTexto";
import { useAuth } from "../../../context/AuthContext";

const FormularioDenuncia: React.FC = () => {
    const [Id, setId] = useState(0);
    const [id_usuario, setId_Usuario] = useState(0);
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        descricao: '',
        data_Recebimento: '',
        id_Estado: '',
        id_Cidade: '',
        bairro: '',
        tipo_Denuncia: '0',
        origem_Denuncia: '0',
        forma_Recebimento: '0',
        id_usuario: '0',
        escolaridade: '0',
        atendida: '0',
        orgao_Atendimento: '0',
        data_Atendimento: null,
        motivo_Nao_Atendimento: '0',
        texto_Denuncia: '',
        status: 1, // default value
        slug: ''
    });

    const [Estados, setEstados] = useState<any[]>([]);
    const [Cidades, setCidades] = useState<any[]>([]);


    //Verifica ID
    const verificaId = () => {
        const url = window.location.pathname;
        const id = url.split('/').pop();

        if (id !== 'form') {

            setId(parseInt(id ? id : '0'));
            //buscar os dados do estado
            axios.get(`${server.url}${server.endpoints.denuncia}/${id}`).then(response => {

                loadCidades(response.data.id_Estado);

                const data = response.data;

                data.Id_Usuario_Alteracao = user ? user.id : '0';

                if(data.atendida === 1){
                    //Exibir div .se_atendeu
                    document.querySelector('.se_atendeu')?.classList.remove('d-none');
                    //Ocultar div .se_nao_atendeu
                    document.querySelector('.se_nao_atendeu')?.classList.add('d-none');
                } else {
                    //Ocultar div .se_atendeu
                    document.querySelector('.se_atendeu')?.classList.add('d-none');
                    //Exibir div .se_nao_atendeu
                    document.querySelector('.se_nao_atendeu')?.classList.remove('d-none');
                }

                try {
                    setFormData(data);
                    console.log("Dados:", response.data);

                } catch (error) {
                    console.error("Erro:", error);
                }

            }).catch(error => {
                console.error("Erro:", error);
            });
        } else {
            setCidades([{ value: 0, label: 'Selecione o estado' }]);

            //Ocultar divs .se_atendeu e .se_nao_atendeu
            document.querySelector('.se_atendeu')?.classList.add('d-none');
            document.querySelector('.se_nao_atendeu')?.classList.add('d-none');

        }
    };

    useEffect(() => {
        verificaId();
    }, []);

    useEffect(() => {
        //console.log("FORMDATA atualizado:", formData);
    }, [formData]);

    useEffect(() => {

        setId_Usuario(parseInt(user ? user.id : '0'));

        if (!Id) { // Só atualiza se for um novo registro
            setFormData((prevState) => ({
                ...prevState,
                Id_Usuario_Cadastro: user ? user.id : '0',
            }));
        }
    }, [user]); // Executa quando o `user` estiver disponível

    //Carrega Estados
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(
                    `${server.url}${server.endpoints.estado}`,
                    {
                        //parâmetros
                    }
                );

                //ajustar array para que o campo value seja o id do estado e o campo label seja o nome do estado, e adiciona uma opção padrão com value 0 e label "Selecione"
                response.data = response.data.$values.map((item: any) => {
                    return { value: item.id, label: item.nome };
                });

                response.data.unshift({ value: 0, label: 'Selecione' });

                setEstados(response.data);

            } catch (error) {
                console.error("Erro:", error);
            }
        };

        fetchData();
    }, []);

    const loadCidades = async (id: number) => {

        try {

            const response = await axios.get(
                `${server.url}${server.endpoints.cidade}/Estado/${id}`,
                {
                    //parâmetros
                }
            );

            if (response.data.length === 0) {
                setCidades([{ value: 0, label: 'Nenhuma cidade encontrada' }]);
                return;
            }

            //ajustar array para que o campo value seja o id do estado e o campo label seja o nome do estado, e adiciona uma opção padrão com value 0 e label "Selecione"
            response.data = response.data.$values.map((item: any) => {
                return { value: item.id, label: item.nome };
            });

            response.data.unshift({ value: 0, label: 'Selecione' });

            setCidades(response.data);

        } catch (error) {

            console.error("Erro:", error);
        }
    }

    //configura exibição do Alert
    const [alert, setAlert] = useState({
        show: false,
        success: false,
        title: '',
        message: [''],
        onConfirm: () => { },
        onClose: () => { }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'id_Estado') {
            loadCidades(parseInt(value));
        }

        if (name === 'atendida') {
            if (value === '1') {
                //Exibir div .se_atendeu
                document.querySelector('.se_atendeu')?.classList.remove('d-none');
                //Ocultar div .se_nao_atendeu
                document.querySelector('.se_nao_atendeu')?.classList.add('d-none');
            } else {
                //Ocultar div .se_atendeu
                document.querySelector('.se_atendeu')?.classList.add('d-none');
                //Exibir div .se_nao_atendeu
                document.querySelector('.se_nao_atendeu')?.classList.remove('d-none');
            }
        }

    };

    const tipo_denuncia = [
        { value: "0", label: "Selecione" },
        { value: "1", label: "VISA - ALIMENTOS" },
        { value: "2", label: "VISA - SERVIÇO DE SAÚDE" },
        { value: "3", label: "VISA - SERVIÇOS DE INTERESSE A SAÚDE" },
        { value: "4", label: "VISA - PRODUTOS, SANEANTES, COSMÉTICOS" },
        { value: "5", label: "VISA - MEDICAMENTOS" },
        { value: "6", label: "VIGILÂNCIA EM SAÚDE DO TRABALHADOR" },
        { value: "7", label: "VIGILÂNCIA AMBIENTAL - VIGIAGUA" },
        { value: "8", label: "VIGILÂNCIA AMBIENTAL - VIGISOLO, AR, VSPEQIM - Vigilância em Saúde de Populações Expostas a Produtos Químicos" },
        { value: "9", label: "ENDEMIAS (INFESTAÇÃO DE MOSQUITOS)" },
        { value: "10", label: "ZOONOSE (CACHORROS, GATOS, ANIMAIS PEÇONHENTOS)" },
        { value: "11", label: "MEIO AMBIENTE (LIXO, ESGOTO)" },
        { value: "12", label: "AGRICULTURA E PESCA (ANIMAIS - OVINOS, SUINOS, CAPRINOS)" },
        { value: "13", label: "SERVIÇO SOCIAL" },
        { value: "14", label: "OBRAS" },
    ];

    const origem_denuncia = [
        { value: "0", label: "Selecione" },
        { value: "1", label: "Ministério Público" },
        { value: "2", label: "Ministério Público do Trabalho" },
        { value: "3", label: "SUVISA" },
        { value: "4", label: "Ministério da Saúde" },
        { value: "5", label: "População" }
    ];

    const forma_recebimento_denuncia = [
        { value: "0", label: "Selecione" },
        { value: "1", label: "Presencial" },
        { value: "2", label: "E-mail" },
        { value: "3", label: "Whatsapp" },
        { value: "4", label: "Ligação - Celular" },
        { value: "5", label: "Ofício" }
    ];

    const escolaridade = [
        { value: "0", label: "Selecione" },
        { value: "1", label: "Analfabeto" },
        { value: "2", label: "Até 5ª Incompleto" },
        { value: "3", label: "5ª Completo" },
        { value: "4", label: "6ª a 9ª Incompleto" },
        { value: "5", label: "9ª Completo" },
        { value: "6", label: "Ensino Médio Incompleto" },
        { value: "7", label: "Ensino Médio Completo" },
        { value: "8", label: "Superior Incompleto" },
        { value: "9", label: "Superior Completo" },
    ];

    const setor_atendimento_denuncia = [
        { value: "0", label: "Selecione" },
        { value: "1", label: "Setor de Zoonose" },
        { value: "2", label: "Setor de Endemias" },
        { value: "3", label: "Secretaria Municipal de Meio Ambiente e Urbanismo" },
        { value: "4", label: "Secretaria Municipal de Obras e Serviços Urbanos" },
        { value: "5", label: "Secretaria Municipal de Desenvolvimento Rural e Pesca" },
        { value: "6", label: "SUVISA" },
        { value: "7", label: "Polícia" },
        { value: "8", label: "Ministério Público" },
        { value: "9", label: "Ministério Público do Trabalho" },
        { value: "10", label: "Vigilância Sanitária" },
    ];

    const motivo_nao_atendimento = [
        { value: "0", label: "Selecione" },
        { value: "1", label: "Insegurança" },
        { value: "2", label: "Não é sujeito a Vigilância Sanitária, Ambiental e Saúde do Trabalhador" },
        { value: "3", label: "Indisponibilidade de Transporte" },
        { value: "4", label: "Encaminhado para SUVISA" },
        { value: "5", label: "Outro" },
    ];

    const sim_nao = [
        { value: "0", label: "Selecione" },
        { value: "1", label: "Sim" },
        { value: "2", label: "Não" }
    ];

    function validaCampos(value = '', nome_campo = '', obrigatorio = false, tamanho = 0) {
        let erro = false;
        let mensagem_erro = '';

        if (obrigatorio && (value === '' || value === null || value === '0')) {
            erro = true;
            mensagem_erro = `Campo ${nome_campo} obrigatório`;
        }

        if (tamanho !== 0 && tamanho !== null && value !== null && value.length !== tamanho) {
            erro = true;
            mensagem_erro = `O campo ${nome_campo} deve ter ${tamanho} caracteres`;
        }

        return { erro, mensagem_erro };
    }

    function handleSubmit(e: any) {

        //Alerta de Carregando
        setAlert({
            show: true,
            success: true,
            title: 'Carregando',
            message: ['Carregando solicitação...'],
            onConfirm: () => {
                //recarregar a página
                //window.location.reload();
            },
            onClose: () => {
                //recarregar a página
                //window.location.reload();
            }
        });

        e.preventDefault();
        console.log(formData);

        var mensagem_erro: string[] = [];

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
            var slug = formData.descricao.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            formData.slug = slug;

            console.log('FORMDATA', formData);

            if (Id === 0) {
                axios.post(`${server.url}${server.endpoints.denuncia}`, formData).then(response => {

                    setAlert({
                        show: true,
                        success: true,
                        title: 'Sucesso',
                        message: ['Denúncia cadastrada com sucesso'],
                        onConfirm: () => {
                            //recarregar a página
                            window.location.reload();
                        },
                        onClose: () => {
                            //recarregar a página
                            window.location.reload();
                        }
                    });
                }).catch(error => {
                    console.error("Erro:", error);

                    setAlert({
                        show: true,
                        success: false,
                        title: 'Erro',
                        message: ['Erro ao cadastrar Denúncia'],
                        onConfirm: () => {
                            setAlert({ ...alert, show: false });
                        },
                        onClose: () => {
                            setAlert({ ...alert, show: false });
                        }
                    });

                });
            } else {
                axios.put(`${server.url}${server.endpoints.denuncia}/${Id}`, formData).then(response => {
                    console.log("Dados:", response.data);

                    setAlert({
                        show: true,
                        success: true,
                        title: 'Sucesso',
                        message: ['Denúncia atualizada com sucesso'],
                        onConfirm: () => {
                            //recarregar a página
                            window.location.reload();
                        },
                        onClose: () => {
                            //recarregar a página
                            window.location.reload();
                        }
                    });
                }).catch(error => {
                    console.error("Erro:", error);

                    setAlert({
                        show: true,
                        success: false,
                        title: 'Erro',
                        message: ['Erro ao atualizar Denúncia'],
                        onConfirm: () => {
                            setAlert({ ...alert, show: false });
                        },
                        onClose: () => {
                            setAlert({ ...alert, show: false });
                        }
                    });

                });
            }
        }
    }

    return (
        <Layout>

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Denúncias", href: "/denuncias/" }, { texto: "Formulário Denúncias", href: "#" }]} />

            <Titulo titulo="Formulário Denúncia" />

            <ContainerForm title="Informações Básicas">
                <Row>
                    <CampoTexto label="Descrição" value={formData.descricao} name="descricao" tipo="text" className="col-md-6" onChange={handleChange}>
                    </CampoTexto>
                    <CampoTexto label="Data de recebimento" value={formData.data_Recebimento ? new Date(formData.data_Recebimento).toISOString().split('T')[0] : ''} name="data_Recebimento" tipo="date" className="col-md-3" onChange={handleChange}>
                    </CampoTexto>
                </Row>
                <Row>
                    <CampoSelect label="Estado" name="id_Estado" value={formData.id_Estado} options={Estados} className="col-md-3" onChange={handleChange} />
                    <CampoSelect label="Cidade" name="id_Cidade" value={formData.id_Cidade} options={Cidades} className="col-md-3" onChange={handleChange} />
                    <CampoTexto label="Bairro" value={formData.bairro} name="bairro" tipo="text" className="col-md-3" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoSelect label="Tipo de Denúncia" name="tipo_Denuncia" value={formData.tipo_Denuncia} options={tipo_denuncia} className="col-md-3" onChange={handleChange} />
                    <CampoSelect label="Origem da Denúncia" name="origem_Denuncia" value={formData.origem_Denuncia} options={origem_denuncia} className="col-md-3" onChange={handleChange} />
                    <CampoSelect label="Forma de Recebimento" name="forma_Recebimento" value={formData.forma_Recebimento} options={forma_recebimento_denuncia} className="col-md-3" onChange={handleChange} />
                </Row>
                <Row>
                    <CampoAreaTexto label="Denúncia" value={formData.texto_Denuncia} name="texto_Denuncia" className="col-md-12" onChange={handleChange}>
                    </CampoAreaTexto>
                </Row>
            </ContainerForm>

            <ContainerForm title="Informações do denunciante">
                <CampoSelect label="Nível de ensino" name="escolaridade" value={formData.escolaridade} options={escolaridade} className="col-md-3" onChange={handleChange} />
            </ContainerForm>

            <ContainerForm title="Desfecho">
                <Row>
                    <CampoSelect label="A Denúncia foi atendida" name="atendida" value={formData.atendida} options={sim_nao} className="col-md-3" onChange={handleChange} />
                </Row>
                <Row className="se_atendeu">
                    <CampoSelect label="Setor que atendeu" name="orgao_Atendimento" value={formData.orgao_Atendimento} options={setor_atendimento_denuncia} className="col-md-6" onChange={handleChange} />
                    <CampoTexto label="Data do Atendimento" name="data_Atendimento" value={formData.data_Atendimento ? new Date(formData.data_Atendimento).toISOString().split('T')[0] : ''} tipo="date" className="col-md-3" onChange={handleChange} />
                </Row>
                <Row className="se_nao_atendeu">
                    <CampoSelect label="Motivo do não atendimento" name="motivo_Nao_Atendimento" value={formData.motivo_Nao_Atendimento} options={motivo_nao_atendimento} className="col-md-6" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm>
                <Row className="justify-content-end">
                    <BotaoSubmit texto="Salvar" onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                    />
                </Row>
            </ContainerForm>

            <Alert
                title={alert.title}
                message={alert.message}
                success={alert.success}
                show={alert.show}
                onConfirm={alert.onConfirm}
                onClose={alert.onClose}
            />

        </Layout>
    );
};

export default FormularioDenuncia;
