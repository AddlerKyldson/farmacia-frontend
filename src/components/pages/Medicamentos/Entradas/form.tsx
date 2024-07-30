import React, { useEffect, useState } from "react";
import Layout from "../../../structure/Layout";
import Breadcrumb from "../../../other/breadCrumb";
import Titulo from "../../../other/tituloPage";
import ContainerForm from "../../../other/form/containerForm";
import CampoTexto from "../../../other/form/campoTexto";
import BotaoSubmit from "../../../other/form/botaoSubmit";
import Row from "../../../other/grid/row";
import Alert from "../../../other/modal/alert";
import BotaoExcluir from "../../../other/form/botaoExcluir";
import axios from "axios";
import server from "../../../../utils/data/server";

interface Medicamentos {
    codigo_barras: number;
    nome: string;
    quantidade: string;
    data_validade?: string;
    disabled?: boolean;
    showDropdown?: boolean;
}

const FormEntradasMedicamentos: React.FC = () => {
    const [Id, setId] = useState(0);
    const [medicamentos, setMedicamentos] = useState<Medicamentos[]>([]);
    const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([]);

    const [formData, setFormData] = useState({
        descricao: '',
        data: '',
        tipo: 1,
        id_usuario_cadastro: 0,
        medicamento_movimentacao_item: medicamentos
    });

    interface DropdownOption {
        id: number;
        nome: string;
        apelido: string;
        codigo_Barras: number;
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

    //Verifica ID
    const verificaId = () => {
        const url = window.location.pathname;
        const id = url.split('/').pop();


        if (id !== 'form') {

            setId(parseInt(id ? id : '0'));
            //buscar os dados do estado
            axios.get(`${server.url}${server.endpoints.medicamento_movimentacao}/${id}`).then(response => {

                setFormData(response.data);

                verificaMedicamentos(parseInt(id ? id : '0'));

            }).catch(error => {
                console.error("Erro:", error);
            });


        } else {
        }
    };

    useEffect(() => {
        verificaId();
    }, []);

    const fetchDropdownOptions = async (name: string, query: string, index: any) => {
        try {
            const response = await axios.get(`${server.url}${server.endpoints.medicamento}/Form/${name}/${query}`);
            console.log("Dropdown options:", response.data.$values);

            if (response.data.$values.length > 0) {
                //quero exibir apenas o dropdown que estiver dentro do campo que está sendo preenchido
                setDropdownOptions(response.data.$values);
                setMedicamentos(prevMedicamentos => prevMedicamentos.map((med, i) => {
                    if (i !== index) {
                        return med;
                    }
                    return {
                        ...med,
                        showDropdown: true
                    };
                }));
            }

        } catch (error) {
            console.error("Error fetching dropdown options", error);
        }
    };

    const handleOptionSelect = (option: DropdownOption, index: any) => {
        //preencher campo de código de barras
        setMedicamentos(prevMedicamentos => prevMedicamentos.map((med, i) => {
            if (i !== index) {
                return med;
            }
            return {
                ...med,
                codigo_barras: option.codigo_Barras,
                nome: option.nome,
                disabled: true
            };
        }));

        ocultarDropdown(index);

    };

    const verificaMedicamentos = async (id: number) => {
        try {
            const response = await axios.get(`${server.url}${server.endpoints.medicamento_movimentacao_item}/Movimentacao/${id}`);

            console.log("Medicamentos:", response.data.$values);

            const novosMedicamentos = response.data.$values.map((item: any) => ({
                codigo_barras: item.id_Medicamento,
                nome: item.medicamento.nome,
                quantidade: item.quantidade,
                disabled: true
            }));

            // Atualizando o estado de medicamentos
            setMedicamentos(novosMedicamentos);

            // Atualizando o estado de formData
            setFormData(prevState => ({
                ...prevState,
                medicamento_movimentacao_item: novosMedicamentos
            }));
        } catch (error) {
            console.error("Erro:", error);
        }
    };

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

    const handleAddMedicamento = () => {
        const novoMedicamento = {
            codigo_barras: 0,
            nome: '',
            quantidade: '',
            data_validade: ''
        };
        setMedicamentos([...medicamentos, novoMedicamento]);

        setFormData(prevState => ({
            ...prevState,
            medicamento_movimentacao_item: [...medicamentos, novoMedicamento]
        }));

    };

    const handleDeleteMedicamento = (index: any) => {
        const filteredMedicamentos = medicamentos.filter((_, i) => i !== index);
        setMedicamentos(filteredMedicamentos);
    };

    const handleChangeMedicamento = (e: any, index: any) => {
        const { name, value } = e.target;

        const newValue = name === 'quantidade' ? parseInt(value) : value;

        setMedicamentos(prevMedicamentos => prevMedicamentos.map((item, i) => {
            if (i !== index) {
                return item;
            }
            return {
                ...item,
                [name]: newValue
            };
        }));

        setFormData(prevState => ({
            ...prevState,
            medicamento_movimentacao_item: medicamentos
        }));

        if (name === 'codigo_barras' && value.length >= 3) {
            fetchDropdownOptions(name, value, index);
        } else {
            ocultarDropdown(index);
        }
    };

    const ocultarDropdown = (index: any) => {
        console.log("Ocultando dropdown...", index);
        setMedicamentos(prevMedicamentos => prevMedicamentos.map((med, i) => {
            if (i !== index) {
                return med;
            }
            return {
                ...med,
                showDropdown: false
            };
        }
        ));
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const updatedFormData = {
            ...formData,
            medicamento_movimentacao_item: medicamentos.map(med => ({
                ...med,
                quantidade: parseInt(med.quantidade as unknown as string)
            }))
        };

        setAlert({
            show: true,
            success: true,
            title: 'Carregando',
            message: ['Carregando solicitação...'],
            onConfirm: () => { },
            onClose: () => { }
        });

        const validateFields = () => {
            let errors: string[] = [];
            if (!formData.descricao) errors.push("Campo Descrição obrigatório");
            if (!formData.data) errors.push("Campo Data obrigatório");
            return errors;
        };

        const errors = validateFields();

        if (errors.length > 0) {
            setAlert({
                show: true,
                success: false,
                title: 'Erro',
                message: errors,
                onConfirm: () => setAlert({ ...alert, show: false }),
                onClose: () => setAlert({ ...alert, show: false })
            });
            return;
        }

        if (Id === 0) {
            axios.post(`${server.url}${server.endpoints.medicamento_movimentacao}`, updatedFormData)
                .then(response => {
                    setAlert({
                        show: true,
                        success: true,
                        title: 'Sucesso',
                        message: ['Entrada cadastrada com sucesso'],
                        onConfirm: () => window.location.reload(),
                        onClose: () => window.location.reload()
                    });
                })
                .catch(error => {
                    setAlert({
                        show: true,
                        success: false,
                        title: 'Erro',
                        message: ['Erro ao cadastrar entrada'],
                        onConfirm: () => setAlert({ ...alert, show: false }),
                        onClose: () => setAlert({ ...alert, show: false })
                    });
                });
        } else {
            axios.put(`${server.url}${server.endpoints.medicamento_movimentacao}/${Id}`, updatedFormData)
                .then(response => {
                    setAlert({
                        show: true,
                        success: true,
                        title: 'Sucesso',
                        message: ['Entrada atualizada com sucesso'],
                        onConfirm: () => window.location.reload(),
                        onClose: () => window.location.reload()
                    });
                })
                .catch(error => {
                    setAlert({
                        show: true,
                        success: false,
                        title: 'Erro',
                        message: ['Erro ao atualizar entrada'],
                        onConfirm: () => setAlert({ ...alert, show: false }),
                        onClose: () => setAlert({ ...alert, show: false })
                    });
                });
        }
    };

    const verificaCodigoBarras = (codigo_barras: number, index: number) => {
        axios.get(`${server.url}${server.endpoints.medicamento}/CodigoBarras/${codigo_barras}`)
            .then(response => {
                if (response.data) {
                    const novoMedicamento = { ...medicamentos[index], nome: response.data.nome, disabled: true };
                    const novosMedicamentos = [...medicamentos];
                    novosMedicamentos[index] = novoMedicamento;
                    setMedicamentos(novosMedicamentos);
                } else {
                    // Se não houver resposta, mantenha o nome vazio e o input habilitado
                    const novoMedicamento = { ...medicamentos[index], nome: '', disabled: false };
                    const novosMedicamentos = [...medicamentos];
                    novosMedicamentos[index] = novoMedicamento;
                    setMedicamentos(novosMedicamentos);
                }
            })
            .catch(error => {
                // Em caso de erro, trate-o e defina o nome do medicamento como vazio e o input habilitado
                console.error("Erro:", error);
                const novoMedicamento = { ...medicamentos[index], nome: '', disabled: false };
                const novosMedicamentos = [...medicamentos];
                novosMedicamentos[index] = novoMedicamento;
                setMedicamentos(novosMedicamentos);
            });
    };

    return (
        <Layout>

            <Breadcrumb paginas={[{ texto: "Home", href: '/' }, { texto: "Entrada Medicamentos", href: "/medicamentos/entradas" }, { texto: "Formulário Entrada Medicamentos", href: "#" }]} />

            <Titulo titulo="Formulário Entrada Medicamentos" />

            <ContainerForm title="Informações Básicas">
                <Row>
                    <CampoTexto label="Descrição" value={formData.descricao} name="descricao" tipo="text" className="col-md-8" onChange={handleChange} />
                    <CampoTexto label="Data" value={formData.data ? new Date(formData.data).toISOString().split('T')[0] : ''} name="data" tipo="date" className="col-md-4" onChange={handleChange} />
                </Row>
            </ContainerForm>

            <ContainerForm title="Medicamentos">
                {medicamentos.map((medicamento, index) => (
                    <Row key={index}>
                        <CampoTexto label="Código de Barras" value={medicamento.codigo_barras} name="codigo_barras" tipo="number" className="col-md-3" onChange={(e) => handleChangeMedicamento(e, index)} onBlur={(e) => verificaCodigoBarras(parseInt(e.target.value), index)} >
                            {medicamento.showDropdown && (
                                <div className="dropdown-menu dropdown-options-preview" style={{ display: 'block' }}>
                                    {dropdownOptions.map((option, idx) => (
                                        <a key={idx} className="dropdown-item" href="#" onClick={() => handleOptionSelect(option, index)}>
                                            {`${option.codigo_Barras} - ${option.apelido} (${option.nome})`}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </CampoTexto>
                        <CampoTexto label="Nome" name="nome" value={medicamento.nome} tipo="text" className="col-md-6" onChange={(e) => handleChangeMedicamento(e, index)} disabled={medicamento.disabled ? true : false} />
                        <CampoTexto label="Quantidade" value={medicamento.quantidade} name="quantidade" tipo="number" className="col-md-2" onChange={(e) => handleChangeMedicamento(e, index)} />
                        <BotaoExcluir texto="x" className="col-md-1" onClick={() => {
                            handleDeleteMedicamento(index);
                        }} />
                    </Row>
                ))}
                <Row className="justify-content-end">
                    <BotaoSubmit texto="Adicionar" onClick={(e) => {
                        e.preventDefault();
                        handleAddMedicamento();
                    }}
                    />
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

export default FormEntradasMedicamentos;
