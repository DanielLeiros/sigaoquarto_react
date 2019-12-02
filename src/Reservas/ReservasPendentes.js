import React from 'react';
import Sidebar from '../sideBar'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { getToken } from '../security/auth'

class ReservasPendentes extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			listaReservas: []
		}
	}

	componentDidMount() {
		this.getReservas();
	}

    getReservas = () => {
		const token = getToken()
    	axios.get("http://localhost:8080/sigaoquarto/reservas/status?statusId=1", {headers:{token:token}}).then(response =>{
			this.setState({listaReservas: response.data})
    	}).catch(saida => console.log(saida))
    }

    alterarStatusReserva = (id, sala, status) => {
		const token = getToken()
		const instance = {
            method: 'put',
            url: "http://localhost:8080/sigaoquarto/reserva/atualizar-status?id="+id+"&statusId=" + status + "&aavaliadorId=1",
            headers: {token: token}
		  };
    	axios(instance).then(response =>{
			this.getReservas(1)
			status === 3 ? alert("Reserva confirmada!") : alert("Reserva cancelada!")
    	}).catch(saida => {
			console.log(saida)
			alert("Não foi possível realizar a ação, tente novamente ou contate nosso suporte!")
		}
			)
    }

	render(){
		const {listaReservas} = this.state
	    return(
	        <Sidebar {...this.props} componente={
	            <div>
	            	<h2 className="text-left inline">Reservas pendentes</h2>
	            	<button className="btn btn-primary novo-cadastro"><Link to="/cadastro-reserva">+ Nova Reserva</Link></button>
					<table>
						<thead>
							<tr>
									<th>Quarto</th>
									<th>Data Reserva</th>
									<th>Checkout esperado</th>
									<th>Status</th>
									<th>Ações</th>
							</tr>
						</thead>
						<tbody>
						{listaReservas.map( (item, key) => {
								return (
									<tr key={key}>
										<td>{item.quarto}</td>
										<td>{item.dataReserva}</td>
										<td>{item.dataCheckout}</td>
										<td>{tiposReserva[item.status]}</td>
										<td>

										<i className="g-icon fas fa-check clicavel"
												onClick={() => this.alterarStatusReserva(item.id, item.idSala,  3)}>
											</i>
										<i className="r-icon fas fa-times clicavel"
												onClick={() => this.alterarStatusReserva(item.id, item.idSala, 2)}>
											</i>

										</td>
									</tr>
									)
							})}
						</tbody>
					</table>
	            </div>
	        } />
	    );
	}
}

export default ReservasPendentes;

const tiposReserva = {
	CONFIRMADA: 'Confirmada',
	CANCELADA: 'Cancelada',
	PENDENTE: 'Pendente'
}
