import React, { useEffect, useState } from "react";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [lista, setLista] = useState([]);
	const [tarea, setTarea] = useState("")

	const crearUser = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/dey", {
				method: "POST",
				headers: { "Content-Type": "application/json" }
			})
			console.log(response)
		} catch (error) {
			console.log(error)

		}
	}

	const obtenerTares = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/dey")
			console.log(response)
			if (response.status == 404) {
				crearUser()
				return
			}
			const data = await response.json()
			console.log(data.todos)
			setLista(data.todos)
		} catch (error) {
			console.log(error)
		}
	}
	async function eliminar(index) {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${index}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			})
			console.log(response)
			if(response.status == 204){
				obtenerTares()
			}
		} catch (error) {
			console.log(error)
		}
		// // guarda todo lo que quiero conservar 
		// let aux = []
		// // filtro en la lista
		// aux = lista.filter((item, id) => {
		// 	if (index != id) {
		// 		return item
		// 	}
		// })
		// setLista(aux)
	}
	async function agregarTarea(e) {
		if (e.key == "Enter") {
			e.preventDefault()
			try {
				const response = await fetch("https://playground.4geeks.com/todo/todos/dey", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"label": tarea,
						"is_done": false
					})
				})
				console.log(response)
				if (response.status == 201){
					obtenerTares()
					setTarea("")
				}
			} catch (error) {
				console.log(error)
			}
			// console.log(tarea)
			// setLista([...lista,tarea])
			// setTarea("")
		}

	}

	useEffect(() => {
		obtenerTares()
	}, [])

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
					value={tarea}
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
						{tarea.label}
						<button className="btn btn-danger float-end"
							onClick={() => eliminar(tarea.id)}
						>x</button>
					</li>
				))}
			</ul>

		</div>
	);
};

export default Home;