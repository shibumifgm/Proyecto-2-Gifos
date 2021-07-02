// API KEY:
apiKey = "9q0Co8y92A1puokhTuMaeKeO3Y5bsveq";

let sliderTrendingGifos = document.getElementById("trending-slider");

trendingGifos();

function trendingGifos() {
  let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=8`;

  fetch(url)
    .then((resp) => resp.json()) //me trae el json con los 4 trending gifos
    .then((content) => {
      //object with data, pagination, meta
      let trendingGifArray = content.data;

      let trendingGIFOhtml = "";

      for (let i = 0; i < trendingGifArray.length; i++) {
        let trendingGif = trendingGifArray[i];
        trendingGIFOhtml += `
            <div class="gif-contenedor" >
                    <div class="gif-acciones">
                        <div class="iconos-acciones-gif">
                            <button class="iconos-acciones-box favorito" >
                                <img src="assets/icon-fav-hover.svg" alt="icon-favorito" >
                            </button>
                            <button class="iconos-acciones-box download" id="download" onclick="download(  '${trendingGif.images.downsized.url}')">
                                <img src= "assets/icon-download.svg" alt="icon-download">
                            </button>
                            <button class="iconos-acciones-box max" >
                                <img src="assets/icon-max-normal.svg" alt="icon-max">
                            </button>
                        </div>
                        <div class="textos-descripcion-gif">
                            <p id="user-gif">${trendingGif.username}</p>
                            <p id="titulo-gif">${trendingGif.title}</p>
                        </div>
                    </div>
                    <img src="${trendingGif.images.downsized.url}" alt="${trendingGif.title}" class="trending-gif">
                </div>
            `;
      }

      sliderTrendingGifos.innerHTML = trendingGIFOhtml;
    })
    .catch((err) => {
      console.log(err);
    });
}

let hovers = document.getElementsByClassName("gif-acciones");
console.log(hovers);
let urlfavoritatrending= []
let sacarurl = setTimeout(() => {
  let gifcontenedor = document.getElementsByClassName("favorito");
  console.log(gifcontenedor)
  let gifcontenedor2 = Array.from(gifcontenedor);
  console.log(gifcontenedor2);
  for (let i = 0; i < gifcontenedor2.length; i++) {
    const gif = gifcontenedor2[i];

    gif.onclick = () => {
      gifurl = gif.parentNode.parentNode.parentNode.lastElementChild
      gifurl2 = gifurl.currentSrc
      console.log(gifurl2)
      
      let favoritosls = localStorage.getItem("favoritosls");
      if (favoritosls !== null) {
        
      
        urlfavoritatrending = JSON.parse(favoritosls);
      }
      urlfavoritatrending.push(gifurl2)
      favoritosls = JSON.stringify(urlfavoritatrending);
      localStorage.setItem("favoritosls", favoritosls)
   
      let titletrending = gif.parentElement.parentElement.lastElementChild.lastElementChild.innerText 
      console.log(titletrending)
 
       localStorage.setItem("titlemax", titletrending);

      if (window.matchMedia("(max-width: 800px)").matches) {
        
        document.location.href = "gifmax.html";
        window.location.href = "gifmax.html";
        hovers[i].setAttribute.display = "none";
      }
        location.reload()
    };
  }
}, 1000);

//gifcontenedor[0].lastElementChild.currentSrc
//funciones para slide desktop

let imageIndex = 1;
let translateX = 0;

let trendingBtnPrev = document.getElementById("trending-btn-previous");
let trendingBtnNext = document.getElementById("trending-btn-next");

trendingBtnNext.addEventListener("click", sliderNext);
function sliderNext() {
  if (window.matchMedia("(min-width: 1440px)").matches) {
    if (imageIndex <= 5) {
      imageIndex++;
      translateX -= 387;
      sliderTrendingGifos.style.transform = `translateX(${translateX}px)`;
    }
  } else if (window.matchMedia("(min-width: 1024px)").matches) {
    if (imageIndex <= 5) {
      imageIndex++;
      translateX -= 273;
      sliderTrendingGifos.style.transform = `translateX(${translateX}px)`;
    }
  } else if (window.matchMedia("(min-width: 700px)").matches) {
    if (imageIndex <= 6) {
      imageIndex++;
      translateX -= 270;
      sliderTrendingGifos.style.transform = `translateX(${translateX}px)`;
    }
  } else if (window.matchMedia("(min-width: 400px)").matches) {
    if (imageIndex <= 7) {
      imageIndex++;
      translateX -= 270;
      sliderTrendingGifos.style.transform = `translateX(${translateX}px)`;
    }
  } else if (window.matchMedia("(max-width: 400px)").matches) {
    if (imageIndex <= 10) {
      imageIndex++;
      translateX -= 200;
      sliderTrendingGifos.style.transform = `translateX(${translateX}px)`;
    }
  }
}

trendingBtnPrev.addEventListener("click", sliderPrev);
function sliderPrev() {
  if (window.matchMedia("(min-width: 1440px)").matches) {
    if (imageIndex !== 1) {
      imageIndex--;
      translateX += 387;
      sliderTrendingGifos.style.transform = `translateX(${translateX}px)`;
    }
  } else if (window.matchMedia("(min-width: 1024px)").matches) {
    if (imageIndex !== 1) {
      imageIndex--;
      translateX += 273;
      sliderTrendingGifos.style.transform = `translateX(${translateX}px)`;
    }
  } else if (window.matchMedia("(min-width: 400px)").matches) {
    if (imageIndex !== 1) {
      imageIndex--;
      translateX += 270;
      sliderTrendingGifos.style.transform = `translateX(${translateX}px)`;
    }
  }
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

