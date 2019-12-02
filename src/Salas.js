import React from 'react';
import Sidebar from './sideBar'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { getToken } from './security/auth';

class ListagemSalas extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			listaSalas: []
		}
	}

	componentDidMount() {
		this.getSalas();
	}

    getSalas = () => {
		const token = getToken()
    	axios.get("http://localhost:8080/sigaoquarto/quartos", {headers:{token: token }}).then(response =>{
			this.setState({listaSalas: response.data})
			console.log(response.data)
    	}).catch(saida => console.log(saida))
    }

	deletarSalas = (id) => {
		const token = getToken()
		const instance = {
            method: 'delete',
            url: "http://localhost:8080/sigaoquarto/quarto/excluir?id="+id,
            headers: {token: token}
          };
    	axios(instance).then(response =>{
			this.getSalas()
			alert("Quarto deletado com sucesso!")
    	}).catch(saida => alert("Não foi possível remover o quarto, é possível que ele possua alguma reserva ou chamado cadastrado. Se persistir contate o suporte."))
    }

	render(){
		const {listaSalas} = this.state
	    return(
	        <Sidebar {...this.props} componente={
	            <div>
	            	<h2 className="text-left inline">Quartos</h2>
	            	<button className="btn btn-primary novo-cadastro"><Link to="/cadastro-salas">+ Novo Quarto</Link></button>
					<table>
						<thead>
							<tr>
								<th>Nome</th>
								<th>Camas de casal</th>
								<th>Camas de solteiro</th>
								<th>Descrição</th>
							</tr>
						</thead>
						<tbody>
						{listaSalas.map( (item, key) => {
								return (
									<tr key={key}>
										<td>{item.nome}</td>
										<td>{item.qtdCamaCasal}</td>
										<td>{item.qtdCamaSolteiro}</td>
										<td>{item.descricao}</td>
										<td>
											<i className="r-icon fas fa-trash-alt clicavel"
													onClick={() => this.deletarSalas(item.id)}>
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

export default ListagemSalas;
