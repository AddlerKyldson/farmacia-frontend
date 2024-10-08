const server = {
    /* url: 'http://localhost:5279/api', */
    url: 'https://www.gerenciadorsaude.com.br/api',
    endpoints: {
        usuario: '/Usuario',
        estado: '/Estado',
        regiao: '/Regional',
        cidade: '/Cidade',
        bairro: '/Bairro',
        unidade_saude: '/Unidade_Saude',
        estabelecimento: '/Estabelecimento',
        denuncia: '/Denuncia',
        tipo_estabelecimento: '/Tipo_Estabelecimento',
        medicamento: '/Medicamento',
        medicamento_movimentacao: '/Medicamento_Movimentacao',
        medicamento_movimentacao_item: '/Medicamento_Movimentacao_Item',
        login: '/auth/login',
        serie: '/Serie',
        inspecao: '/Inspecao',
    },
};

export default server;