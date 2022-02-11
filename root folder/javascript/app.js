let page = document.querySelector('.page')
let container = document.querySelector('.contenedor')
let submit = document.querySelector('#submit')

const get_data = async function(){

        let response = await fetch ("https://apipetshop.herokuapp.com/api/articulos")
        let data = await response.json()

	let objects = data.response

	return objects

}

const objects = await get_data()



const show_warning_form = function(){
	let forms = document.getElementsByClassName('check-len')
	console.log(forms)
}


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
						    <button>Agregar al carrito</button>
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
					    <button>Agregar al carrito</button>
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
						    <button>Agregar al carrito</button>
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
					    <button>Agregar al carrito</button>
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





