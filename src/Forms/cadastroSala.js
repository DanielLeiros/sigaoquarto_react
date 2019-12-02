import React from 'react';
import {ErrorMessage, Formik, Form, Field} from 'formik';
import * as yup from "yup";
import './cadastro.css';
import Sidebar from "../sideBar"
import axios from 'axios';
import { getToken } from '../security/auth';

const CadastroSalas = (props) => {

    const handleSubmit = (values) => {
        const token = getToken()
        axios.post(`http://localhost:8080/sigaoquarto/quarto/adicionar?nome=${values.nome}&descricao=${values.descricao}&qtdCamaCasal=${values.qtdCamaCasal}&qtdCamaSolteiro=${values.qtdCamaSolteiro}`,
           {headers: {token:token}}
         ).then(() =>{
            alert("Quarto cadastrado com sucesso");
            props.history.push("/listagem-salas")
         }).catch(err => alert("Não foi possível cadastrar o quarto..."))
    }
    const validations = yup.object().shape({
        nome:yup.string().required("Digite um nome válido"),
        qtdCamaCasal: yup.string().min(0).required("Digite um nome válido"),
        qtdCamaSolteiro: yup.string().min(0).required("Digite um nome válido"),
        descricao:yup.string(),
    })

    return(
        <Sidebar {...props}
        componente={
            <div className="container-cadastro">
                <div className="row">
                    <div className="form-fields col-12 align-self-center">
                        <div className="login-title">Cadastrar Sala</div>
                        <Formik
                            initialValues={{nome: "", localizacao: "", descricao: "", permiteFixo: "false", qtdCamaCasal:"", qtdCamaSolteiro:""}}
                            onSubmit={handleSubmit}
                            validationSchema={validations}
                        >

                            <Form className="app-form">
                                <div className="row justify-content-center">

                                    <div className="form-group text-left col-6">
                                        <label className="exemple-nome">Nome:</label>
                                        <Field name="nome" className="form-control" placeholder="Nome" maxLength={25}/>
                                        <ErrorMessage className="form-error" name="nome" component="span"/>
                                    </div>

                                    <div className="form-group text-left col-6">
                                        <label className="exemple-descricao">Descrição:</label>
                                        <Field name="descricao" component="textarea" className="form-control" placeholder="Descrição" maxLength={150}/>
                                        <ErrorMessage className="form-error" name="descricao" component="span"/>
                                    </div>

                                    <div className="form-group text-left col-6">
                                        <label className="exemple-localizacao">Camas de Casal:</label>
                                        <Field name="qtdCamaCasal" className="form-control" placeholder="Camas de Casal" type="number" min="0"/>
                                        <ErrorMessage className="form-error" name="qtdCamaCasal" component="span"/>
                                    </div>

                                    <div className="form-group text-left col-6">
                                        <label className="exemple-localizacao">Camas de Solteiro:</label>
                                        <Field name="qtdCamaSolteiro" className="form-control" placeholder="Camas de solteiro" type="number" min="0"/>
                                        <ErrorMessage className="form-error" name="qtdCamaSolteiro" component="span"/>
                                    </div>

                                    <div className="form-group text-left col-6">

                                    </div>
                                </div>
                                <button className="btn btn-primary btn-md">Cadastrar</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        } />
    );
}

export default CadastroSalas;
