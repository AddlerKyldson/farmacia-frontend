const server = {
    url: 'http://localhost:5279/api',
    endpoints: {
        usuario: '/Usuario',
        estado: '/Estado',
        regiao: '/Regional',
        cidade: '/Cidade',
        bairro: '/Bairro',
        unidade_saude: '/Unidade_Saude',
        medicamento: '/Medicamento',
        medicamento_movimentacao: '/Medicamento_Movimentacao',
        medicamento_movimentacao_item: '/Medicamento_Movimentacao_Item',
        login: '/auth/login',
    },
};

export default server;