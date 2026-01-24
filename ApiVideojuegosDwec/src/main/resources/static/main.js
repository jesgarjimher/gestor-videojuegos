const BASE_URL = "http://localhost:9000/api/videojuegos";

document.addEventListener('DOMContentLoaded', getJuegos());

//cargar juegos para la página home
async function getJuegos() {

            const response = await fetch(`${BASE_URL}`);

            const datos = await response.json();
            const tbody = document.querySelector("#tbody");

            datos.forEach(juego => {
                tbody.innerHTML += `
                <tr>
                  <td class="td-id">${juego.id}</td>
                  <td>${juego.titulo}</td>
                  <td>${juego.plataforma}</td>
                  <td>${juego.genero}</td>
                  <td>${juego.anyo}</td>
                  <td>${juego.nota}</td>
                  <td class='left down'>
                     <button>Ver</button>
                     <button onclick='irEditar(this)'><img src='./imgs/editar-icon.png' class='icon-editar' >Editar</button>
                     <button><img src='./imgs/icono-borrar.png' class='icon'>Borrar</button>
                  </td>
                </tr>
                `
            });


    }

    async function irEditar(element) {
        let fila = element.closest("tr");
        let id = fila.querySelector(".td-id").innerText;
        window.location.href = `/formulario.html?id=${id}`;
    }





//editar /////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', getJuego());

    async function getJuego() {
        let params = new URLSearchParams(document.location.search);
        let paramsId = Number(params.get("id"));
        console.log(paramsId);
        const response = await fetch(`http://localhost:9000/api/videojuegos/${paramsId}`);

        const datos = await response.json();
        console.log(datos);



    const main_editar = document.querySelector("#main-editar");

    main_editar.innerHTML += `

    <form class='container-form' id='formulario'>
                <div class='title-container'>
                    <h1>Gestión de videjouegos</h1>
                    <button type='button' class='btn btn-success'>Volver</button>
                </div>
                <h2 class='title-form'>Editar videojuego</h2>
                <div class='subcontainer-form'>
                    <div>
                        <label>ID:</label>
                        <input name='id' id='id' type='number' class='input-box' value='${datos.id}'>
                    </div>
                    <div>
                        <label>Título*:</label>
                        <input name='titulo' type='text' id='titulo' class='input-box' value='${datos.titulo}'>
                    </div>
                    <div>
                        <label>Plataforma*:</label>
                        <select name='plataforma' type='text' class='input-box' id='plataforma'>
                             <option value='PC'>PC</option>
                                <option value='PC' ${datos.plataforma === 'PC' ? 'selected' : ''}>PC</option>
                                    <option value='PLAYSTATION' ${datos.plataforma === 'PLAYSTATION' ? 'selected' : ''}>PLAYSTATION</option>
                                    <option value='XBOX' ${datos.plataforma === 'XBOX' ? 'selected' : ''}>XBOX</option>
                                    <option value='SWITCH' ${datos.plataforma === 'SWITCH' ? 'selected' : ''}>SWITCH</option>
                                    <option value='MOVIL' ${datos.plataforma === 'MOVIL' ? 'selected' : ''}>MOVIL</option>
                                    <option value='OTRA' ${datos.plataforma === 'OTRA' ? 'selected' : ''}>OTRA</option>
                        </select>
                        <label>Género*:</label>
                        <select name='genero' class='input-box' id='genero'>
                            <option>AVENTURA</option>
                            <option>option 2</option>
                        </select>
                    </div>
                    <div>
                        <label>Año*:</label>
                        <input id='anyo' name='anyo' type='number' min='1950' max='2026' step='1' class='input-box' value='${datos.anyo}'>
                        <label>Nota (1-10)</label>
                        <input type='number' min='1' max='10' step='0.01' class='input-box' value='${datos.nota}' id='nota'>
                    </div>
                    <div>
                        <label>Compañía</label>
                        <input id='compania' type='text' name='compania' class='input-box' value='${datos.compania}'>
                    </div>
                    <div>
                        <label>Precio (€)</label>
                        <input id='precio' type='number' name='precio' min='1' max='500' step='0.01' class='input-box' value='${datos.precio}'>
                    </div>
                    <div>
                        <label>Portada (URL)</label>
                        <input id='file' type='file' name='portada' class='input-box' value='${datos.portada}'>
                        <button>Previsualizar</button>
                    </div>
                    <div>
                        <label>Descripción</label>
                        <textarea id='descripcion' class='input-box' >${datos.descripcion}</textarea>
                    </div>
                    <div>
                        <label>Estado</label>
                        <select id='estado' name='estado' class='input-box'>
                            <option value='DISPONIBLE' ${datos.estado === 'DISPONIBLE' ? 'selected' : ''}>Disponible</option>
                            <option value='AGOTADO' ${datos.estado === 'AGOTADO' ? 'selected' : ''}>Agotado</option>
                            <option value='RESERVADO' ${datos.estado === 'RESERVADO' ? 'selected' : ''}>Reservado</option>
                            <option value='DESCATALOGADO' ${datos.estado === 'DESCATALOGADO' ? 'selected' : ''}>Descatalogado</option>
                        </select>
                    </div>
                    <div>
                        <div>
                            <button>Guardar</button>
                            <button>Guardar y nuevo</button>
                            <button>Cancelar</button>
                        </div>
                        <div>
                            <button>Editar</button>
                            <button>Borrar</button>
                        </div>
                    </div>
                    <div>
                        <span id='notification-span'></span>
                    </div>

                </div>

            </form>
    `



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

            }
        })

}












