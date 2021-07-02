divfavsincontenido = document.getElementById("divfavsincontenido");

let ps = document.getElementsByClassName("ps");

let favoritos = document.getElementsByClassName("res");

let enlaces = localStorage.getItem("favoritosls");
let jsenlaces = JSON.parse(enlaces);

for (let i = 0; i < favoritos.length; i++) {
  const fav = favoritos[i];
  fav.setAttribute("src", jsenlaces[i]);
  template = `<div class="gif-contenedor">
    <div class="gif-acciones">
        <div class="iconos-acciones-gif">
            <button class="iconos-acciones-box favorito delete" >
                <img class="iconhover fav" src="assets/icon-fav-hover.svg" alt="icon-favorito" >
            </button>
            <button class="iconos-acciones-box download"  onclick="download('${jsenlaces[i]}')">
                <img class="iconhover down" src= "assets/icon-download.svg" alt="icon-download">
            </button>
            <button class="iconos-acciones-box max" >
                <img class="iconhover max"  src="assets/icon-max-normal.svg" alt="icon-max">
            </button>
        </div>
        <div class="textos-descripcion-gif">
        
        </div>
    `;

  if (fav.currentSrc == "") {
    fav.style.display = "none";
  } else {
    ps[i].innerHTML += template;
  }
  if (jsenlaces.length == 0) {
    divfavsincontenido.style.display = "block";
  } else {
    divfavsincontenido.style.display = "none";
  }
}

//gif max

let gifmax = document.getElementsByClassName("iconos-acciones-box max");
console.log(gifmax);
let urlmax = "";
let maximizar = () => {
  localStorage.setItem("urlmax", urlmax);
  document.location.href = "gifmax.html";
  window.location.href = "gifmax.html";
};

for (let i = 0; i < gifmax.length; i++) {
  const element = gifmax[i];

  element.onclick = () => {
    padreiconosaccionesgif = element.parentNode;

    padreiconosacciones = padreiconosaccionesgif.parentNode;

    padregifcontenedor = padreiconosacciones.parentNode;

    padrecontenedorrespuesta = padregifcontenedor.parentNode;
    imagenalfin = padrecontenedorrespuesta.firstChild;
    urlalfin = imagenalfin.currentSrc;
    urlmax = urlalfin;
    console.log(urlmax);
  };

  element.addEventListener("click", maximizar);
}

//FUNCION BORRAR GIF
let botondel = document.getElementsByClassName("delete");
let botondel2 = Array.from(botondel);
console.log(botondel2);
for (let i = 0; i < botondel2.length; i++) {
  const boton = botondel2[i];

  boton.addEventListener("click", () => {
    favoritos[i].setAttribute("src", "");
    console.log(favoritos);
  });
}

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

function download(data, strFileName, strMimeType) {
  var self = window, 
      defaultMime = "application/octet-stream", 
      mimeType = strMimeType || defaultMime,
      payload = data,
      url = !strFileName && !strMimeType && payload,
      anchor = document.createElement("a"),
      toString = function(a){return String(a);},
      myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
      fileName = strFileName || "download",
      blob,
      reader;
      myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
  if(String(this)==="true"){ 
      payload=[payload, mimeType];
      mimeType=payload[0];
      payload=payload[1];
  }
  if(url && url.length< 2048){ 
      fileName = url.split("/").pop().split("?")[0];
      anchor.href = url; 
        if(anchor.href.indexOf(url) !== -1){ 
          var ajax=new XMLHttpRequest();
          ajax.open( "GET", url, true);
          ajax.responseType = 'blob';
          ajax.onload= function(e){ 
            download(e.target.response, fileName, defaultMime);
          };
          setTimeout(function(){ ajax.send();}, 0); 
          return ajax;
      } 
  } 
  if(/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)){
      if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
          payload=dataUrlToBlob(payload);
          mimeType=payload.type || defaultMime;
      }else{          
          return navigator.msSaveBlob ? 
              navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
              saver(payload) ; 
      }
  }
  blob = payload instanceof myBlob ?
      payload :
      new myBlob([payload], {type: mimeType}) ;
  function dataUrlToBlob(strUrl) {
      var parts= strUrl.split(/[:;,]/),
      type= parts[1],
      decoder= parts[2] == "base64" ? atob : decodeURIComponent,
      binData= decoder( parts.pop() ),
      mx= binData.length,
      i= 0,
      uiArr= new Uint8Array(mx);
      for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);
      return new myBlob([uiArr], {type: type});
   }
  function saver(url, winMode){
      if ('download' in anchor) { 
          anchor.href = url;
          anchor.setAttribute("download", fileName);
          anchor.className = "download-js-link";
          anchor.innerHTML = "downloading...";
          anchor.style.display = "none";
          document.body.appendChild(anchor);
          setTimeout(function() {
              anchor.click();
              document.body.removeChild(anchor);
              if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
          }, 66);
          return true;
      }
      
      if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
          url=url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
          if(!window.open(url)){ 
              if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
          }
          return true;
      }
      
      var f = document.createElement("iframe");
      document.body.appendChild(f);
      if(!winMode){ 
          url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
      }
      f.src=url;
      setTimeout(function(){ document.body.removeChild(f); }, 333);
  }
  if (navigator.msSaveBlob) { 
      return navigator.msSaveBlob(blob, fileName);
  }
  if(self.URL){ 
      saver(self.URL.createObjectURL(blob), true);
  }else{
      
      if(typeof blob === "string" || blob.constructor===toString ){
          try{
              return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
          }catch(y){
              return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
          }
      }
      
      reader=new FileReader();
      reader.onload=function(e){
          saver(this.result);
      };
      reader.readAsDataURL(blob);
  }
  return true;
}; 

