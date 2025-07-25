import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [lista, setLista] = useState(["Aprender React", "Repasar Clase", "Hacer Apuntes", "Agradecer a Cecilia por la asesoría"]);
	const [tarea, setTarea] = useState("")
	
	function eliminar(index) {
		// guarda todo lo que quiero conservar 
		let aux = []
		// filtro en la lista
		aux = lista.filter((item, id) => {
			if (index != id) {
				return item
			}
		})
		setLista(aux)
	}
	function agregarTarea(e){
		if (e.key == "Enter"){
		e.preventDefault()
		console.log(tarea)
		setLista([...lista,tarea])
		setTarea("")
		}
		
	}

	return (
		<div className="text-center container">
			<h1 className="mb-5">To Do List</h1>
			<div className="input-group flex-nowrap mb-5">
				<input
				type="text"
				className="form-control"
				placeholder="Agregar pendiente"
				aria-label="Username"
				aria-describedby="addon-wrapping"
				value = {tarea}
				onChange={(e) => setTarea(e.target.value)}
				onKeyDown={(e) => agregarTarea(e)}
				/>
			</div>
			<ul className="list-group">
				{/* cada parte del array ahora se llama tarea */}
				{lista.map((tarea, index) => (
					<li
						key={index}
						className="list-group-item"
					>
						{tarea}
						<button className="btn btn-danger float-end"
							onClick={() => eliminar(index)}
						>x</button>
					</li>
				))}
			</ul>

		</div>
	);
};

export default Home;