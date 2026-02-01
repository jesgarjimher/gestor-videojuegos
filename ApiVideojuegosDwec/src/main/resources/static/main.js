const BASE_URL = "http://localhost:9000/api/videojuegos";
let listaJuegos = [];


async function getJuegos() {
    const response = await fetch(`${BASE_URL}`);

    listaJuegos = await response.json();
    pintarJuegos(listaJuegos);
}





    //cargar juegos para la página home
    async function pintarJuegos(juegos) {

    const tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";

                juegos.forEach(juego => {
                    tbody.innerHTML += `
                    <tr id=${juego.id} class='fila'>
                      <td class="td-id">${juego.id}</td>
                      <td>${juego.titulo}</td>
                      <td>${juego.plataforma}</td>
                      <td>${juego.compania}</td>
                      <td>${juego.genero}</td>
                      <td>${juego.anyo}</td>
                      <td>${juego.nota}</td>
                      <td class='left'>
                         <button>Ver</button>
                         <button onclick='irEditar(this)'><img src='./imgs/editar-icon.png' class='icon-editar' >Editar</button>
                         <button onclick='borrar(this)'><img src='./imgs/icono-borrar.png' class='icon' >Borrar</button>
                      </td>
                    </tr>
                    `
                });

        }

document.addEventListener('DOMContentLoaded', () => {

    let ascendente = true;

    function ordenar() {
        let listaDesordenada = [...listaJuegos];
        listaDesordenada.sort((a, b) => {
            if (ascendente) {
                return a.titulo.localeCompare(b.titulo);
            }else {
                return b.titulo.localeCompare(a.titulo);
            }
        });

        //cambio el sentido cada vez que se ejecuta la funcion
        ascendente = !ascendente;
        if(ascendente) {
            btnOrdenar.innerHTML = "Descendente";
        }else{
            btnOrdenar.innerHTML = "Ascendente";
        }


        pintarJuegos(listaDesordenada);
    }

    const btnOrdenar = document.querySelector("#btn-ordenar");


    btnOrdenar.addEventListener("click", ordenar);



    const selGenero = document.querySelector("#selGenero");
    const selPlataforma = document.querySelector("#selPlataforma");
    const buscar = document.querySelector("#buscar");



    function filtroBuscar() {
        const textoBusqueda = buscar.value.toLowerCase();
        const generoSel = selGenero.value;
        const plataformaSel = selPlataforma.value;

        const filtrados = listaJuegos.filter(juego => {
            const matchTexto = juego.titulo.toLowerCase().includes(textoBusqueda);

            const matchGenero = generoSel === "" || juego.genero === generoSel;

            const matchPlataforma = plataformaSel === "" || juego.plataforma === plataformaSel;

            return matchTexto && matchGenero && matchPlataforma;
        });

        pintarJuegos(filtrados);
    }

     buscar.addEventListener("input", filtroBuscar);
     selGenero.addEventListener("change", filtroBuscar);
     selPlataforma.addEventListener("change", filtroBuscar)

     function limpiarFiltros() {
        pintarJuegos(listaJuegos);
     }

     const btnLimpiar = document.querySelector("#limpiar");

     btnLimpiar.addEventListener("click", limpiarFiltros);


    async function getOpciones() {
        const opcionesResponse = await fetch(`${BASE_URL}/catalogos`);
        const opciones = await opcionesResponse.json();
        const generos = opciones.generos;
        const plataformas = opciones.plataformas;

        generos.forEach(genero => {
            selGenero.innerHTML += `<option value='${genero}'>${genero}</option>`;

        })

        plataformas.forEach(plataforma => {
            selPlataforma.innerHTML += `<option value=${plataforma}>${plataforma}</option>`;
        })
    }



        getOpciones();
        getJuegos();





});

        async function borrar(element) {
            let fila = element.closest("tr");
            let idBorrar = fila.querySelector(".td-id").innerText;
            //let row = document.querySelector(idBorrar);

            alert("borar " + idBorrar)
            let responseBorrar = await fetch(`${BASE_URL}/${idBorrar}`, {
                method: "DELETE",
            }

            ).then(response => console.log("response tras delete =>",response))
            .then(fila.remove());

        }

    async function irEditar(element) {
        let fila = element.closest("tr");
        let id = fila.querySelector(".td-id").innerText;
        window.location.href = `/formulario.html?id=${id}`;
    }


    async function irFormulario() {
            window.location.href = `/formulario.html`;

        }




//editar /////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
        getJuego()


        async function getJuego() {
            let params = new URLSearchParams(document.location.search);
            let paramsId = params.get("id");


            const opcionesResponse = await fetch(`${BASE_URL}/catalogos`);
            const opciones = await opcionesResponse.json();
            const generos = opciones.generos;
            console.log("opciones =>" + generos);
            const estados = opciones.estados;

        let datos = { id: "", titulo: "", plataforma: "", genero: "", anyo: "", nota: "", compania: "", precio: "",descripcion: "", estado: ""};


        if(paramsId) {
            const response = await fetch(`http://localhost:9000/api/videojuegos/${paramsId}`);
            datos = await response.json();
            console.log(datos);
            console.log(paramsId);
        }





        const main_editar = document.querySelector("#main-editar");

        main_editar.innerHTML += `
                <form class='container-form' id='formulario'>
                    <div class='title-container'>
                        <h1>Gestión de videojuegos</h1>
                        <button type='button' class='btn btn-success' onclick="window.location.href='index.html'">Volver</button>
                    </div>
                    <h2 class='title-form'>${paramsId ? 'Editar videojuego' : 'Nuevo videojuego'}</h2>
                    <div class='subcontainer-form'>
                        <div>

                            <input name='id' id='id' type='number' class='input-box' value='${datos.id}' ${paramsId ? 'readonly' : ''} hidden>
                        </div>
                        <div>
                            <label>Título*:</label>
                            <input name='titulo' type='text' id='titulo' class='input-box' value='${datos.titulo}' required>
                        </div>
                        <div>
                          <label>Companía*:</label>
                          <input name='compania' type='text' id='compania' class='input-box' value='${datos.compania}' required>
                      </div>
                        <div>
                            <label>Plataforma*:</label>
                            <select name='plataforma' class='input-box' id='plataforma'>
                                <option value='PC' ${datos.plataforma === 'PC' ? 'selected' : ''}>PC</option>
                                <option value='PLAYSTATION' ${datos.plataforma === 'PLAYSTATION' ? 'selected' : ''}>PLAYSTATION</option>
                                <option value='XBOX' ${datos.plataforma === 'XBOX' ? 'selected' : ''}>XBOX</option>
                                <option value='SWITCH' ${datos.plataforma === 'SWITCH' ? 'selected' : ''}>SWITCH</option>
                            </select>
                        </div>
                        <div>
                            <label>Género*:</label>
                            <select name='genero' class='input-box' id='genero'>
                            ${generos.map(genero =>`
                                <option value='${genero}' ${datos.genero === '${genero}' ? 'selected' : ''}>${genero}</option>
                                `
                            ).join("")}
//
                            </select>
                        </div>
                        <div>
                            <label>Año*:</label>
                            <input id='anyo' name='anyo' type='number' class='input-box' value='${datos.anyo}'>
                        </div>
                        <div>
                            <label>Nota</label>
                            <input id='nota' type='number' step='0.1' class='input-box' value='${datos.nota}'>
                        </div>
                        <div>
                            <label>Precio</label>
                            <input id='precio' type='number' step='0.01' class='input-box' value='${datos.precio}'>
                        </div>
                        <div>
                            <label>Descripción</label>
                            <textarea id='descripcion' class='input-box'>${datos.descripcion}</textarea>
                        </div>
                        <div>
                            <label>Estado</label>
                            <select id='estado' name='estado' class='input-box'>
                            ${estados.map(estado => `
//                                <option value='${estado}' ${datos.estado === '${estado}' ? 'selected' : ''}>${estado}</option>

                            `).join("")};
//
                            </select>
                        </div>
                        <div class="buttons-container">
                            <button type="submit" class="btn-save">Guardar</button>
                        </div>
                    </div>
                </form>
            `;


            document.querySelector('#formulario').addEventListener("submit", (event) => {
                event.preventDefault();
                let id = document.querySelector("#id").value;
                let titulo = document.querySelector("#titulo").value;
                let plataforma = document.querySelector("#plataforma").value;
                let genero = document.querySelector("#genero").value;
                let anyo = document.querySelector("#anyo").value;
                let compania = document.querySelector("#compania").value;
                let precio = document.querySelector("#precio").value;
                let descripcion = document.querySelector("#descripcion").value;
                let estado = document.querySelector("#estado").value;
                let nota = document.querySelector("#nota").value;

                const juegoEditado = {
                    "id": Number(id),
                    "titulo": titulo,
                    "plataforma": plataforma,
                    "genero": genero,
                    "anyo": parseInt(anyo),
                    "compania": compania,
                    "precio": parseFloat(precio),
                    "descripcion": descripcion,
                    "estado": estado,
                    "nota": parseFloat(nota)

                }; console.log("juego editado => ",juegoEditado)

                if(id.length > 0) {
                    const respuestaActualizar = fetch(`${BASE_URL}/${id}`,{
                        method: "PUT",
                        headers: {
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify(juegoEditado)
                    })

                }else {
                    const respuestaCrear = fetch(`${BASE_URL}`, {
                        method: "POST",
                        headers: {
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify(juegoEditado)
                    })
                    console.log("juego creado")
                }

            })

    }

});










