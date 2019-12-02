import React from 'react';
import Sidebar from './sideBar'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { getToken } from './security/auth';

const tiposChamado = {
	EM_EXECUCAO: "Em execução",
	CONFIRMADA: "Confirmado",
	FINALIZADO: "Finalizado",
	CANCELADO: "Cancelado",
	PENDENTE: "Pendente"
}

class ListagemChamados extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			listaChamados: []
		}
	}

	componentDidMount() {
		this.getChamados();
	}

    getChamados = () => {
		const token = getToken()
    	axios.get("http://localhost:8080/sigaoquarto/chamados", {headers:{token: token }}).then(response =>{
			this.setState({listaChamados: response.data})
    	}).catch(saida => console.log(saida))
    }

	deletarChamado = (id) => {
		const token = getToken()
		const instance = {
            method: 'delete',
            url: "http://localhost:8080/sigaoquarto/chamado/excluir?id="+id,
            headers: {token: token}
          };
    	axios(instance).then(response =>{
			this.getChamados()
			alert("Chamado cancelado!")
    	}).catch(saida => console.log(saida))
    }

    aceitarChamado = (id, sala) => {
		const token = getToken()
		const instance = {
            method: 'put',
            url: `http://localhost:8080/sigaoquarto/chamado/atualizar-status?id=${id}&statusId=3&avaliadorId=1`,
            headers: {token: token}
          };
    	axios(instance).then(response =>{
			this.getChamados()
			alert("Chamado confirmado!")
    	}).catch(saida => console.log(saida))
	}

	executarChamado = (id, sala) => {
		const token = getToken()
		const instance = {
            method: 'put',
            url: `http://localhost:8080/sigaoquarto/chamado/atualizar-status?id=${id}&statusId=1&avaliadorId=1`,
            headers: {token: token}
          };
    	axios(instance).then(response =>{
			this.getChamados()
			alert("Chamado em andamento!")
    	}).catch(saida => console.log(saida))
    }

	render(){
		const {listaChamados} = this.state
	    return(
	        <Sidebar {...this.props} componente={
	            <div>
	            	<h2 className="text-left inline">Chamados</h2>
	            	<button className="btn btn-primary novo-cadastro"><Link to="/cadastro-chamado">+ Novo Chamado</Link></button>
					<table>
						<thead>
							<tr>
								<th>Quarto</th>
								<th>Descrição</th>
								<th>Status</th>
								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
						{listaChamados.map( (item, key) => {
							console.log(item)
								return (
									<tr key={key}>
										<td>{item.quarto}</td>
										<td>{item.descricao}</td>
										<td>{tiposChamado[item.status]}</td>
										<td>
											<i className="g-icon fas fa-check clicavel"
													onClick={() => this.aceitarChamado(item.id)}>
											</i>
											<i className="y-icon fas fa-clock clicavel"
													onClick={() => this.executarChamado(item.id)}>
											</i>
											<i className="r-icon fas fa-trash-alt clicavel"
													onClick={() => this.deletarChamado(item.id)}>
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

export default ListagemChamados;
