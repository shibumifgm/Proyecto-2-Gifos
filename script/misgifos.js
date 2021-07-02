apiKey = "QEiNwRIV3GcWQ83yvX6IVcIAST0hxr1n";

misGifosArray = [];
misGifosString = localStorage.getItem("misGifos");

let pantallaMisGifos = document.getElementById("resultados-misgifos");

let modalMobileMG = document.createElement("div");
let modalDesktopMG = document.createElement("div");

buscarMisGifos();

//funciones para mostrar mis gifos en la pagina
function buscarMisGifos() {
  let pantallaMisGifosVacio = document.getElementById("misgifos-vacio");

  if (misGifosString == null || misGifosString == "[]") {
    pantallaMisGifosVacio.style.display = "block";
    pantallaMisGifos.style.display = "none";
  } else {
    pantallaMisGifosVacio.style.display = "none";
    misGifosArray = JSON.parse(misGifosString);
    let urlMisGifos = `https://api.giphy.com/v1/gifs?ids=${misGifosArray.toString()}&api_key=${apiKey}`;

    fetch(urlMisGifos)
      .then((response) => response.json())

      .then((content) => {
        console.log(content);
        mostrarMisGifos(content);
      })
      .catch((err) => {
        console.error("fetch mis gifos fallo", err);
      });
  }
}

function mostrarMisGifos(content) {
  let gifosMisGifosArray = content.data;

  for (let i = 0; i < gifosMisGifosArray.length; i++) {
    pantallaMisGifos.innerHTML += `
        <div class="resultados-gif-box-misgifos" onclick="maxGifMobileMG('${content.data[i].images.downsized.url}', '${content.data[i].id}', '${content.data[i].slug}', '${content.data[i].username}', '${content.data[i].title}')">
                    <div class="gif-acciones-resultados-misgifos">
                        <div class="iconos-acciones-gif">
                            <button class="iconos-acciones-box borrar" onclick="borrarGifo('${content.data[i].id}')">
                                <img src="./assets/icon-trash-normal.svg" alt="icon-borrar">
                            </button>
                            <button class="iconos-acciones-box download" onclick="descargarGif('${content.data[i].images.downsized.url}', '${content.data[i].slug}')">
                                <img src="./assets/icon-download.svg" alt="icon-download" >
                            </button>
                        
                        </div>
                        <div class="textos-descripcion-gif-misgifos">
                            <p class="user-gif-misgifos">${content.data[i].username}</p>
                            <p class="titulo-gif-misgifos">${content.data[i].title}</p>
                        </div>
                    </div>
                    <img src="${content.data[i].images.downsized.url}" alt="${content.data[i].title}" class="resultados-gif">
                </div>
        `;
  }
}

//FUNCION BORRAR GIF
function borrarGifo(gif) {
  let arrayAuxGifos = [];
  arrayAuxGifos = JSON.parse(misGifosString);
  let indiceGif = arrayAuxGifos.indexOf(gif);

  console.log(arrayAuxGifos);
  console.log(indiceGif);

  arrayAuxGifos.splice(indiceGif, 1);

  let nuevoMisGifosString = JSON.stringify(arrayAuxGifos);
  localStorage.setItem("misGifos", nuevoMisGifosString);

  location.reload();
}

