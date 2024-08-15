import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import Estabelecimentos from "./components/pages/Estabelecimentos";
import FormularioEstabelecimentos from "./components/pages/Estabelecimentos/form";
import Bairros from "./components/pages/Bairros";
import FormBairros from "./components/pages/Bairros/form";
import Cidades from "./components/pages/Cidades";
import FormCidadaos from "./components/pages/Cidadaos/form";
import FormCidades from "./components/pages/Cidades/form";
import Estados from "./components/pages/Estados";
import FormEstados from "./components/pages/Estados/form";
import Cidadaos from "./components/pages/Cidadaos";
import Inspecoes from "./components/pages/Inspecoes";
import FormInspecoes from "./components/pages/Inspecoes/form";
import Regionais from "./components/pages/Regionais";
import FormRegionais from "./components/pages/Regionais/form";
import Responsaveis from "./components/pages/Responsaveis";
import FormResponsaveis from "./components/pages/Responsaveis/form";
import Series from "./components/pages/Series";
import FormSeries from "./components/pages/Series/form";
import Usuarios from "./components/pages/Usuarios";
import FormUsuarios from "./components/pages/Usuarios/form";
import Medicamentos from "./components/pages/Medicamentos";
import FormMedicamentos from "./components/pages/Medicamentos/form";
import EntradasMedicamentos from "./components/pages/Medicamentos/Entradas";
import FormEntradasMedicamentos from "./components/pages/Medicamentos/Entradas/form";
import SaidasMedicamentos from "./components/pages/Medicamentos/Saidas";
import FormSaidasMedicamentos from "./components/pages/Medicamentos/Saidas/form";
import UnidadeSaude from "./components/pages/UnidadeSaude";
import FormUnidadeSaude from "./components/pages/UnidadeSaude/form";

//importar assets/styles.css
import "./assets/styles.css";
import TipoEstabelecimento from "./components/pages/TipoEstabelecimento";
import FormTipoEstabelecimento from "./components/pages/TipoEstabelecimento/form";
import LoginPage from "./components/pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from './context/AuthContext';
import Dashboard from "./components/pages/Dashboard";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/estabelecimentos" element={<PrivateRoute><Estabelecimentos /></PrivateRoute>} />
                    <Route path="/estabelecimentos/form" element={<PrivateRoute><FormularioEstabelecimentos /></PrivateRoute>} />
                    <Route path="/estabelecimentos/form/:id" element={<PrivateRoute><FormularioEstabelecimentos /></PrivateRoute>} />
                    <Route path="/bairros" element={<PrivateRoute><Bairros /></PrivateRoute>} />
                    <Route path="/bairros/form" element={<PrivateRoute><FormBairros /></PrivateRoute>} />
                    <Route path="/bairros/form/:id" element={<PrivateRoute><FormBairros /></PrivateRoute>} />
                    <Route path="/cidades" element={<PrivateRoute><Cidades /></PrivateRoute>} />
                    <Route path="/cidades/form" element={<PrivateRoute><FormCidades /></PrivateRoute>} />
                    <Route path="/cidades/form/:id" element={<PrivateRoute><FormCidades /></PrivateRoute>} />
                    <Route path="/estados" element={<PrivateRoute><Estados /></PrivateRoute>} />
                    <Route path="/estados/form" element={<PrivateRoute><FormEstados /></PrivateRoute>} />
                    <Route path="/estados/form/:id" element={<PrivateRoute><FormEstados /></PrivateRoute>} />
                    <Route path="/cidadaos" element={<PrivateRoute><Cidadaos /></PrivateRoute>} />
                    <Route path="/cidadaos/form" element={<PrivateRoute><FormCidadaos /></PrivateRoute>} />
                    <Route path="/inspecoes" element={<PrivateRoute><Inspecoes /></PrivateRoute>} />
                    <Route path="/inspecoes/form" element={<PrivateRoute><FormInspecoes /></PrivateRoute>} />
                    <Route path="/regionais" element={<PrivateRoute><Regionais /></PrivateRoute>} />
                    <Route path="/regionais/form" element={<PrivateRoute><FormRegionais /></PrivateRoute>} />
                    <Route path="/regionais/form/:id" element={<PrivateRoute><FormRegionais /></PrivateRoute>} />
                    <Route path="/responsaveis" element={<PrivateRoute><Responsaveis /></PrivateRoute>} />
                    <Route path="/responsaveis/form" element={<PrivateRoute><FormResponsaveis /></PrivateRoute>} />
                    <Route path="/series" element={<PrivateRoute><Series /></PrivateRoute>} />
                    <Route path="/series/form" element={<PrivateRoute><FormSeries /></PrivateRoute>} />
                    <Route path="/tipos-estabelecimentos" element={<PrivateRoute><TipoEstabelecimento /></PrivateRoute>} />
                    <Route path="/tipos-estabelecimentos/form" element={<PrivateRoute><FormTipoEstabelecimento /></PrivateRoute>} />
                    <Route path="/usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>} />
                    <Route path="/usuarios/form" element={<PrivateRoute><FormUsuarios /></PrivateRoute>} />
                    <Route path="/usuarios/form/:id" element={<PrivateRoute><FormUsuarios /></PrivateRoute>} />
                    <Route path="/medicamentos" element={<PrivateRoute><Medicamentos /></PrivateRoute>} />
                    <Route path="/medicamentos/form" element={<PrivateRoute><FormMedicamentos /></PrivateRoute>} />
                    <Route path="/medicamentos/form/:id" element={<PrivateRoute><FormMedicamentos /></PrivateRoute>} />
                    <Route path="/medicamentos/entradas" element={<PrivateRoute><EntradasMedicamentos /></PrivateRoute>} />
                    <Route path="/medicamentos/entradas/form" element={<PrivateRoute><FormEntradasMedicamentos /></PrivateRoute>} />
                    <Route path="/medicamentos/entradas/form/:id" element={<PrivateRoute><FormEntradasMedicamentos /></PrivateRoute>} />
                    <Route path="/medicamentos/saidas" element={<PrivateRoute><SaidasMedicamentos /></PrivateRoute>} />
                    <Route path="/medicamentos/saidas/form" element={<PrivateRoute><FormSaidasMedicamentos /></PrivateRoute>} />
                    <Route path="/unidades-de-saude" element={<PrivateRoute><UnidadeSaude /></PrivateRoute>} />
                    <Route path="/unidades-de-saude/form" element={<PrivateRoute><FormUnidadeSaude /></PrivateRoute>} />
                    <Route path="/unidades-de-saude/form/:id" element={<PrivateRoute><FormUnidadeSaude /></PrivateRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
