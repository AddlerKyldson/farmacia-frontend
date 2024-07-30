import React from "react";
import Layout from "../../structure/Layout";
import { useAuth } from "../../../context/AuthContext";

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    console.log(user);
    return (
        <Layout>
            <h1>{"Dashboard"}</h1>
            {user && <p>Bem-vindo, {user.unique_name}!</p>}
        </Layout>
    );
};

export default Dashboard;
