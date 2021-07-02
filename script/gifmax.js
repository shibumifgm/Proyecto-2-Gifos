let urlmax = "";

let maxear = setTimeout(() => {
  let max = document.getElementsByClassName("iconos-acciones-box max");
  for (let i = 0; i < max.length; i++) {
    const element = max[i];

    element.onclick = () => {
      padreiconosaccionesgif = element.parentNode;
      padreiconosacciones = padreiconosaccionesgif.parentNode;
      padregifcontenedor = padreiconosacciones.parentNode;
      imagenalfin = padregifcontenedor.lastElementChild;
      urlalfin = imagenalfin.currentSrc;

      urlmax = urlalfin;
      localStorage.setItem("urlmax", urlmax);
      document.location.href = "gifmax.html";
      window.location.href = "gifmax.html";
    };

  }
}, 2000);

// ampliar imagen

let imagenmax = document.getElementById("imgmax");

let urlmax2 = localStorage.getItem("urlmax");

imagenmax.setAttribute("src", urlmax2);
let titulo = localStorage.getItem("titlemax");
titlemax = document.getElementById("titlemax");
titlemax.innerText = titulo;
