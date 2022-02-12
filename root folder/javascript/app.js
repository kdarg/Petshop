let page = document.querySelector('.page')
let container = document.querySelector('.contenedor')
let submit = document.querySelector('#submit')
let shop_counter = document.querySelector('#shop-counter')

const get_data = async function(){

        let response = await fetch ("https://apipetshop.herokuapp.com/api/articulos")
        let data = await response.json()

	let objects = data.response

	return objects

}

const objects = await get_data()

const show_warning_form = function(){
	let forms = document.getElementsByClassName('check-len')
}

let local_length = []

const show_local_storage = function(){

	let favorites = JSON.parse(localStorage.getItem('favoritos')) || []

	if (favorites.length != 0){
		local_length = favorites
	} else{
		local_length = []
	}

	shop_counter.innerHTML = local_length.length 
}

show_local_storage()

const add = function(event){
	let favorites = JSON.parse(localStorage.getItem('favoritos')) || []

	favorites.push(event)

	let favorites_set = new Set(favorites)

	let favorites_array = [...favorites_set]

	localStorage.setItem('favoritos', JSON.stringify(favorites_array))

	show_local_storage()
}

const remove = function(event){

	let favorites = JSON.parse(localStorage.getItem('favoritos')) || []

	let favorites_set = new Set(favorites)

	let favorites_array = [...favorites_set]

	let favorites_decrease = favorites_array.filter(product_id => product_id != event)

	localStorage.setItem('favoritos', JSON.stringify(favorites_decrease))

	show_local_storage()

}

window.add = add
window.remove = remove

const display_data = function(){
	let inner_html = String()

	for (let i=0; i<objects.length; i++){
		if(page.id == 'farmacia'){
			if(objects[i].tipo == 'Medicamento'){
				if(objects[i].stock < 5){
					inner_html += `
					<div class="cartas">
					<img src="${objects[i].imagen}">
						<div class="info">
						    <h3 class='fs-5'>${objects[i].nombre}</h3>
						    <p class='fw-bold text-info fs-4'>${objects[i].precio}$</p>
						    <p>Cantidad: <input type="number"></p>
						    <p>Ultimas unidades</p>
						    <button onClick="add('${objects[i]._id}')">Agregar al carrito</button>

						    <button class='bg-danger' onClick="remove('${objects[i]._id}')">Eliminar</button>
						</div>
					</div>
					`

					continue
				}
				inner_html += `
				<div class="cartas">
				<img src="${objects[i].imagen}">
					<div class="info">
					    <h3 class='fs-5'>${objects[i].nombre}</h3>
					    <p class='fw-bold text-info fs-4'>${objects[i].precio}$</p>
					    <p>Cantidad: <input type="number"></p>
					    <button onClick="add('${objects[i]._id}')">Agregar al carrito</button>

					    <button class='bg-danger' onClick="remove('${objects[i]._id}')">Eliminar</button>
					</div>
				</div>
				`

			}
		}
		if(page.id == 'juguetes'){
			if(objects[i].tipo == 'Juguete'){
				if(objects[i].stock < 5){
					inner_html += `
					<div class="cartas">
					<img src="${objects[i].imagen}">
						<div class="info">
						    <h3 class='fs-5'>${objects[i].nombre}</h3>
						    <p class='fw-bold text-info fs-4'>${objects[i].precio}$</p>
						    <p>Cantidad: <input type="number"></p>
						    <p>Ultimas unidades</p>
						    <button onclick="add('${objects[i]._id}')">Agregar al carrito</button>

						    <button class='bg-danger' onClick="remove('${objects[i]._id}')">Eliminar</button>
						</div>
					</div>
					`

					continue
				}

				inner_html += `
				<div class="cartas">
				<img src="${objects[i].imagen}">
					<div class="info">
					    <h3 class='fs-5'>${objects[i].nombre}</h3>
					    <p class='fw-bold text-info fs-4'>${objects[i].precio} $</p>
					    <p>Cantidad: <input type="number"></p>
					    <button onclick="add('${objects[i]._id}')">Agregar al carrito</button>

					    <button class='bg-danger' onClick="remove('${objects[i]._id}')">Eliminar</button>
					</div>
				</div>

				`

			}
		}
	}

	container.innerHTML = inner_html


}

if (page.id != 'contacto' && page.id != 'home'){
	display_data()
}

if (page.id == 'contacto'){
	submit.addEventListener('click', show_warning_form)
}





