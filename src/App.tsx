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

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/estabelecimentos" element={<Estabelecimentos />} />
                <Route path="/estabelecimentos/form" element={<FormularioEstabelecimentos />} />
                <Route path="/bairros" element={<Bairros />} />
                <Route path="/bairros/form" element={<FormBairros />} />
                <Route path="/bairros/form/:id" element={<FormBairros />} />
                <Route path="/cidades" element={<Cidades />} />
                <Route path="/cidades/form" element={<FormCidades />} />
                <Route path="/cidades/form/:id" element={<FormCidades />} />
                <Route path="/estados" element={<Estados />} />
                <Route path="/estados/form" element={<FormEstados />} />
                <Route path="/estados/form/:id" element={<FormEstados />} />
                <Route path="/cidadaos" element={<Cidadaos />} />
                <Route path="/cidadaos/form" element={<FormCidadaos />} />
                <Route path="/inspecoes" element={<Inspecoes />} />
                <Route path="/inspecoes/form" element={<FormInspecoes />} />
                <Route path="/regionais" element={<Regionais />} />
                <Route path="/regionais/form" element={<FormRegionais />} />
                <Route path="/regionais/form/:id" element={<FormRegionais />} />
                <Route path="/responsaveis" element={<Responsaveis />} />
                <Route path="/responsaveis/form" element={<FormResponsaveis />} />
                <Route path="/series" element={<Series />} />
                <Route path="/series/form" element={<FormSeries />} />
                <Route path="/tipos-estabelecimentos" element={<TipoEstabelecimento />} />
                <Route path="/tipos-estabelecimentos/form" element={<FormTipoEstabelecimento />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/usuarios/form" element={<FormUsuarios />} />
                <Route path="/usuarios/form/:id" element={<FormUsuarios />} />
                <Route path="/medicamentos" element={<Medicamentos />} />
                <Route path="/medicamentos/form" element={<FormMedicamentos />} />
                <Route path="/medicamentos/form/:id" element={<FormMedicamentos />} />
                <Route path="/medicamentos/entradas" element={<EntradasMedicamentos />} />
                <Route path="/medicamentos/entradas/form" element={<FormEntradasMedicamentos />} />
                <Route path="/medicamentos/entradas/form/:id" element={<FormEntradasMedicamentos />} />
                <Route path="/medicamentos/saidas" element={<SaidasMedicamentos />} />
                <Route path="/medicamentos/saidas/form" element={<FormSaidasMedicamentos />} />
                <Route path="/unidades-de-saude" element={<UnidadeSaude />} />
                <Route path="/unidades-de-saude/form" element={<FormUnidadeSaude />} />
                <Route path="/unidades-de-saude/form/:id" element={<FormUnidadeSaude />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
