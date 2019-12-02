import React, {useState, useEffect} from 'react';
import {ErrorMessage, Formik, Form, Field} from 'formik';
import * as yup from "yup";
import './cadastro.css';
import Sidebar from "../sideBar"
import axios from 'axios';
import { getToken } from '../security/auth';

const CadastroChamado = (props) => {

    const [salas, setSalas] = useState([]);

    useEffect(()=>{
        getSalas();
    },[])

    const getSalas = () => {
        const token = getToken()
        axios.get('http://localhost:8080/sigaoquarto/quartos')
        .then(response => setSalas(response.data))
        .catch(err => alert("Não foi possível encontrar o quarto..."))
    }

    const handleSubmit = (values) => {
        const token = getToken()
        console.log(values.sala)
        axios({method:'post', url:`http://localhost:8080/sigaoquarto/chamado/adicionar?usuarioId=1&quartoId=${values.sala}&descricao=${values.descricao}&statusId=1`, headers:{token: token }}
         ).then(() =>{
             alert("Chamado registrado com sucesso!")
             props.history.push("/listagem-chamados")
            }).catch(err => alert("Não foi possível registrar o chamado..."))
    }

    const validations = yup.object().shape({
        sala:yup.string().required("Insira uma sala válida"),
        descricao:yup.string().min(10, "Tamanho mínimo de 10 caracteres").required(),
    })

    return(
        <Sidebar {...props}
        componente={
            <div className="container-cadastro">
                <div className="row">
                    <div className="form-fields col-12 align-self-center">
                        <div className="login-title">Abrir Chamado</div>
                        <Formik
                            initialValues={{sala: "", descricao: ""}}
                            onSubmit={handleSubmit}
                            validationSchema={validations}
                        >

                            <Form className="app-form">
                                <div className="row justify-content-center">
                                    <div className="form-group text-left col-6">
                                        <label className="exemple-sala">Quarto:</label>
                                        <Field name="sala" className="form-control" component="select">
                                            <option value={null}>Selecione um quarto</option>
                                            {salas.map((element, index) => {
                                                return <option key={index} value={element.id}>{element.nome}</option>
                                            })}
                                        </Field>
                                        <ErrorMessage className="form-error" name="sala" component="span"/>
                                    </div>
                                   <div className="form-group text-left col-6">
                                        <label className="exemple-descricao">Descrição:</label>
                                        <Field name="descricao" className="form-control" type="text-area" placeholder="Descrição" maxLength={150}/>
                                        <ErrorMessage className="form-error" name="descricao" component="span"/>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-md" type="submit">Cadastrar</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        } />
    );
}

export default CadastroChamado;
