import React, {useState, useEffect} from 'react';
import {ErrorMessage, Formik, Form, Field} from 'formik';
import * as yup from "yup";
import './cadastro.css';
import Sidebar from "../sideBar"
import axios from 'axios';
import { getToken } from '../security/auth';

const CadastroReserva = (props) => {

    const [salas, setSalas] = useState([]);

    useEffect(()=>{
        getSalas();
    },[])

    const getSalas = () => {
        const token = getToken()
        axios.get('http://localhost:8080/sigaoquarto/quartos')
        .then(response => setSalas(response.data))
        .catch(err => alert("Não foi possível encontrar salas..."))
    }

    const handleSubmit = (values) => {
        const token = getToken()
        axios.post(`http://localhost:8080/sigaoquarto/reserva/adicionar?usuarioId=1&quartoId=${values.sala}&dataReserva=${values.dataReserva}&dataCheckout=${values.dataCheckout}&statusId=1`
            , {headers:{token: token }}
         ).then(() =>{
             alert("Reserva realizada com sucesso")
             props.history.push("/")
            }).catch(err => alert("Não foi possível registrar a reserva..."))
    }

    const validations = yup.object().shape({
        sala:yup.string().required("Digite uma sala válida"),
        dataReserva:yup.string().min(10).required(),
        dataCheckout:yup.string().min(10).required(),
    })

    return(
        <Sidebar {...props}
        componente={
            <div className="container-cadastro">
                <div className="row">
                    <div className="form-fields col-12 align-self-center">
                        <div className="login-title">Solicitar Reserva</div>
                        <Formik
                            initialValues={{sala: "", dataReserva: "", dataCheckout: "", horario: ""}}
                            onSubmit={handleSubmit}
                            validationSchema={validations}
                        >

                            <Form className="app-form">
                                <div className="row justify-content-center">

                                    <div className="form-group text-left col-3">
                                    <label className="exemple-data">Data Reserva:</label>
                                        <Field name="dataReserva" className="form-control" type="date" placeholder="Data Reserva"/>
                                        <ErrorMessage className="form-error" name="dataReserva" component="span"/>
                                    </div>

                                    <div className="form-group text-left col-3">
                                    <label className="exemple-data">Data Checkout:</label>
                                        <Field name="dataCheckout" className="form-control" type="date" placeholder="Data Checkout"/>
                                        <ErrorMessage className="form-error" name="dataCheckout" component="span"/>
                                    </div>


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

export default CadastroReserva;

/*<DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      locale="pt-BR"
      showTimeSelect
      timeFormat="p"
      minTime={setHours(setMinutes(new Date(), 0), 7)}
      maxTime={setHours(setMinutes(new Date(), 0), 17)}
      timeIntervals={60}
      dateFormat="Pp"
    />*/
