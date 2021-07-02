// hover de la imagen crea tu gifo por cambio de imagen

let creatugifo = document.getElementById("creatugifo");
let imagenHover = new Image();
imagenHover.src = "assets/CTA-crear-gifo-hover.svg";
let imagenNormal = creatugifo.firstElementChild;


let cambio = () => creatugifo.replaceChild(imagenHover, imagenNormal);
let cambio2 = () => creatugifo.replaceChild(imagenNormal, imagenHover);



creatugifo.addEventListener("mouseenter", cambio);
creatugifo.addEventListener("mouseleave", cambio2);

// modo nocturno

let modonocturno = () => {
  body = document.getElementById("body");
  body.style.background = "#222326";

  footer = document.getElementById("footer");
  footer.style.background = "#222326";
  header = document.getElementById("header");
  header.style.background = "#37383C";
                                                            // cambia colores en el dom
  if (window.matchMedia("(max-width: 800px)").matches) {
    ul.style.background = "black";
  } else {
    ul.style.background = "transparent";
  }

  diurno.innerText = "MODO DIURNO ";  // cambia nombre del link
  lis = document.getElementsByClassName("linavbar");
  for (let i = 0; i < lis.length; i++) {
    const li = lis[i];
    li.style.color = "white";
  }
  let final = document.getElementById("final");
  if (final !== null) {
    final.style.background = "#222326";
  }

  contenedorsugerencias = document.getElementById("contenedorsugerencias");
  if ((contenedorsugerencias !== null, input !== null)) {
    contenedorsugerencias.style.background = "#37383C";
    input.style.background = "#37383C";
    input.style.color = "#9CAFC3";
  }
  ps = document.getElementsByTagName("p");
  for (let i = 0; i < ps.length; i++) {
    const p = ps[i];
    p.style.color = "white";
  }
  titulos = document.getElementsByClassName("titulo");
  for (let i = 0; i < titulos.length; i++) {
    const titulo = titulos[i];
    titulo.style.color = "white";
  }
  let espaciosugerencias =
    document.getElementsByClassName("espaciosugerencias");

  for (let i = 0; i < espaciosugerencias.length; i++) {
    const element = espaciosugerencias[i];
    element.style.color = "#9CAFC3";
    element.style.background = "#37383C";
  }

  nocturno.removeEventListener("click", modonocturno);
  nocturno.addEventListener("click", mododiurno);
};

let mododiurno = () => {
  nocturno.addEventListener("click", mododiurno);
  body = document.getElementById("body");
  body.style.background = "white";

  if (window.matchMedia("(max-width: 800px)").matches) {
    ul.style.background = "#572EE5";
  } else {
    ul.style.background = "transparent";
  }

  footer = document.getElementById("footer");
  footer.style.background = "white";
  header = document.getElementById("header");
  header.style.background = "white";
  diurno.innerHTML = "MODO NOCTURNO ";
  lis = document.getElementsByClassName("linavbar");
  for (let i = 0; i < lis.length; i++) {
    const li = lis[i];
    if (window.matchMedia("(max-width: 800px)").matches) {
      li.style.color = "white";
    } else {
      li.style.color = "#572EE5";
    }
  }
  let final = document.getElementById("final");
  if (final !== null) {
    final.style.background = "white";
  }
  let espaciosugerencias =
    document.getElementsByClassName("espaciosugerencias");

  for (let i = 0; i < espaciosugerencias.length; i++) {
    const element = espaciosugerencias[i];

    element.style.background = "white";
  }
  let ontenedorsugerencias = document.getElementById("contenedorsugerencias");
  if (contenedorsugerencias !== null && input !== null) {
    contenedorsugerencias.style.background = "white";
    input.style.background = "white";
    input.style.color = "black";
  }
  ps = document.getElementsByTagName("p");
  for (let i = 0; i < ps.length; i++) {
    const p = ps[i];
    p.style.color = "black";
  }
  titulos = document.getElementsByClassName("titulo");
  for (let i = 0; i < titulos.length; i++) {
    const titulo = titulos[i];
    titulo.style.color = "#572EE5";
  }
  nocturno.removeEventListener("click", mododiurno);
  nocturno.addEventListener("click", modonocturno);
};

let nocturno = document.getElementById("modo_nocturno");
let diurno = document.getElementById("modo_diurno");

nocturno.addEventListener("click", modonocturno);

 // menu hamborguesaaaaaaa

let abrir = document.getElementById("open");
let cerrar = new Image();
cerrar.src = "../miguel/assets/close.svg";
cerrar.setAttribute("id", "close");
let header = document.getElementById("header");

let openmenu = () => {
  if ((window.matchMedia("(max-width: 600px)").matches = true)) {
    ul = document.getElementById("ul");
    ul.style.display = "inline-block";

    header.replaceChild(cerrar, abrir);
    abrir.removeEventListener("click", openmenu);
    cerrar.addEventListener("click", closemenu);
  } else {
    console.log(ul);
  }
};

let closemenu = () => {
  ul = document.getElementById("ul");
  ul.style.display = "none";
  header.replaceChild(abrir, cerrar);
  cerrar.removeEventListener("click", closemenu);
  abrir.addEventListener("click", openmenu);
};

abrir.addEventListener("click", openmenu);
cerrar.addEventListener("click", closemenu);

// conectarse a la  API


let ids = [];
let links = [];
let titles = [];
let buscar = async (buscador) => {
  contenedor = document.getElementById("div2");
  contenedor.style.display = "block";
  buscador = input.value; // lo que busca el usuario
  resultados.innerText = buscador;
  contenedorres = document.getElementsByClassName("contenedorres");
  template = "";

  try {
    const res = await fetch(
      `${giphysearchurl}${api_key}&lang=es&offset=1&rating=pg-13,r&limit=12&q=${buscador}`
    )
      .then((res) => res.json())
      .then((responses) => {
        responses.data.forEach(function (item) {
          if (links.indexOf(item.images.downsized_medium.url) == -1) {
            links.push(item.images.downsized_medium.url);

            if (titles.indexOf(item.title) == -1) {
              titles.push(item.title);
            }
            if (ids.indexOf(item.id) == -1) {
              ids.push(item.id);
            }
          }
        });
        if (responses.data.length == 0) {              // si no encuentra nada
          let imagensinresultados = `<h2>${buscador} </h2><img id = "busquedafallida" src="assets/icon-busqueda-sin-resultado.svg"><p id="pbusquedafallida" >Intenta con otra búsqueda.</p>`;

          contenedor.innerHTML = imagensinresultados;
        } else {
          for (let i = 0; i < espacios.length; i++) {
            const espacio = espacios[i];
            espacio.setAttribute("src", links[i]);
          }
        }
        setTimeout(() => {
          links = [];
          titles = [];
        }, 300);   
        for (let i = 0; i < contenedorres.length; i++) { // contenedores de respuesta con hovers y botones
          const contenedor = contenedorres[i];

          template = `<div class="gif-contenedor">
               <div class="gif-acciones">
                   <div class="iconos-acciones-gif">
                       <button class="iconos-acciones-box favorito" id ="${ids[i]}">
                           <img src="assets/icon-fav-hover.svg" alt="icon-favorito" >
                       </button>
                       <button class="iconos-acciones-box download"  onclick="download('${links[i]}')">
                           <img src= "assets/icon-download.svg" alt="icon-download">
                       </button>
                       <button class="iconos-acciones-box max busq" >
                           <img src="assets/icon-max-normal.svg" alt="icon-max">
                       </button>
                   </div>
                   <div class="textos-descripcion-gif">
                   <h4>${titles[i]}</h4>
                   </div>
               `;
          contenedor.innerHTML += template;
        }
          // de aqui en adelante se settean las funciones de los botones de los gif que aparecen despues de realizar la busqueda

        for (let i = 0; i < iconofavorito.length; i++) {
          const icono = iconofavorito[i];
          icono.onclick = function () {
            urlfav = icono.parentElement.parentElement.parentElement.parentElement.firstElementChild.src
            console.log(urlfav)

            if (favoritosls == null) {
              urls = [];
            } else {
              urls = JSON.parse(favoritosls);
            }
          
            urls.push(urlfav);
          
            favoritosls = JSON.stringify(urls);
            localStorage.setItem("favoritosls", favoritosls);
           
           
        
          };
          //icono.addEventListener("click", favoritear); 
        }

        let gifmaxbusq = setTimeout(() => {
          let maxq = document.getElementsByClassName("busq");
          let gifcontenedor = document.getElementsByClassName("gif-contenedor");
          let hovers = document.getElementsByClassName("gif-acciones");
          let gifcontenedor2 = Array.from(gifcontenedor);
          

          for (let i = 0; i < gifcontenedor2.length; i++) {
            const gif = gifcontenedor2[i];

            if (window.matchMedia("(max-width: 800px)").matches) {            // funcion de buscar en mobile para evitar el hover 
              hovers[i].setAttribute.display = "none";
              gif.onclick = () => {
                let urlfavq2 = gif.parentElement.firstElementChild.src;
                console.log(urlfavq2);
                localStorage.removeItem("urlmax");
                localStorage.setItem("urlmax", urlfavq2);
                document.location.href = "gifmax.html";
                window.location.href = "gifmax.html";
                titulo8 = gif.firstElementChild.lastElementChild.innerText
                //console.log(titulo8)
                titlemax = titulo8;
                localStorage.setItem("titlemax", titlemax);
              };
            }
          }

          for (let i = 0; i < maxq.length; i++) {  // fx maxear
            const q = maxq[i];

            q.onclick = () => {
              padre1 = q.parentElement.parentElement.parentElement.parentElement
              padre2 = padre1.firstElementChild.src
              //console.log(padre2)
              let urlfavq = padre2;
              console.log(urlfavq);
              localStorage.removeItem("urlmax");
              localStorage.setItem("urlmax", urlfavq);
              document.location.href = "gifmax.html";
              window.location.href = "gifmax.html";
              titulo9 = q.parentElement.parentElement.lastElementChild.firstElementChild.innerText
              //console.log(titulo9)
              titlemax = titulo9;
              console.log(titlemax);

              localStorage.setItem("titlemax", titlemax);
            };
          }
        }, 1000);
      });
  } catch (error) {
    console.error(error);
  }
};

let espacios = document.getElementsByClassName("res");

let espacios2 = Array.from(espacios);

let index = 0;

let resultados = document.getElementById("resultados");
const api_key = "9q0Co8y92A1puokhTuMaeKeO3Y5bsveq";
const giphysearchurl = "http://api.giphy.com/v1/gifs/search?api_key=";
let input = document.getElementById("buscar");
let imagenbuscar = document.getElementById("imagen_buscar");

input.addEventListener("keyup", function (e) {  // buscar en tecla enter
  var keycode = e.keyCode || e.which;
  if (keycode == 13) {
    buscar();
  }
});

imagenbuscar.addEventListener("click", buscar);
let iconofavorito = document.getElementsByClassName("favorito");

// autocompletar

const giphyautocompleteurl = "http://api.giphy.com/v1/gifs/search/tags?api_key=";
let divbuscador = document.getElementById("buscador");
let espaciosugerencias = document.getElementsByClassName("espaciosugerencias");
let espaciosugerencias2 = Array.from(espaciosugerencias);

let autocompletar = async () => {
  buscador = input.value; // lo que busca el usuario
  
  ul = document.getElementById("contenedorsugerencias");
  ul.style.display = "block";

  imagenbuscar.setAttribute("src", 'assets/close.svg')
  imagenbuscar.setAttribute("id", 'close')
  closesearch = document.getElementById('close')

  closesearch.onclick = ()=>{
    ul.style.display = "none"
    input.value = ""
  imagenbuscar.setAttribute("src", 'assets/icon-search.svg')
  imagenbuscar.setAttribute("id", 'imagen_buscar')
  sugerencia= []
    
  }
  

  try {
    const res = await fetch(
      `${giphyautocompleteurl}${api_key}&limit=4&q=${buscador}`
    )
      .then((res) => res.json())
      .then((response) => {
        response.data.forEach(function (item) {
          if (sugerencia.indexOf(item.name) == -1) {
            sugerencia.push(item.name); // sugerencias en un array x4
          }
          if (sugerencia.indexOf(buscador) == -1) {
            for (let i = 0; i < sugerencia.length; i++) {
              espaciosugerencias2[i].innerText = sugerencia[i];
            }
          }
        });
        
      });
      setTimeout(() => {
        sugerencia =[]
      }, 30);
    } catch (error) {
    console.error(error);
  }
};

input.onkeyup = function () {
   autocompletar();
};

let sugerencia = [];
let llenar = () => {
  for (let i = 0; i < espaciosugerencias2.length; i++) {
    const espaciosugerencia = espaciosugerencias2[i];
    espaciosugerencia.onclick = function () {

      

      input.value = espaciosugerencia.innerText
      buscar((buscador = espaciosugerencia.innerText)); // busqueda desde sugerencia 
    };
  }
};
for (let i = 0; i < espaciosugerencias2.length; i++) {
  const sugest = espaciosugerencias2[i];

  sugest.addEventListener("click", llenar);
}



// ver mas

let counter = 0;
let iterador = 12;
let iterar = () => {
  counter += iterador;
};

const ver_mas = async () => {
  links2 = [];

  buscador = input.value; // lo que busca el usuario



  offset = `&offset=${12 + counter}`;

  try {
    const res = await fetch(
      `${giphysearchurl}${api_key}${offset}&lang=es&rating=pg-13,r&limit=12&q=${buscador}`
    )
      .then((res) => res.json())
      .then((responses) => {
        responses.data.forEach(function (item) {
          if (links2.indexOf(item.images.downsized_medium.url) == -1) {
            links2.push(item.images.downsized_medium.url);
          }
        });
      });
  } catch (error) {
    console.error(error);
  }

  for (let i = 0; i < espacios.length; i++) {
    espacios[i].setAttribute("src", links2[i]);
  }
};

let vermas = document.getElementById("vermas");

vermas.addEventListener("click", ver_mas);
vermas.addEventListener("click", iterar);

// fx favoritear

let urls = [];
let favoritosls = localStorage.getItem("favoritosls");

let favoritear = () => {

  urlfav = links[index];

  if (favoritosls == null) {
    urls = [];
  } else {
    urls = JSON.parse(favoritosls);
  }

  urls.push(urlfav);

  favoritosls = JSON.stringify(urls);
  localStorage.setItem("favoritosls", favoritosls);
};
