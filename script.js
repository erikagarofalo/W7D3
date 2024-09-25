// Devi realizzare una pagina per una “libreria” contenenente libri derivanti da una chiamata HTTP di tipo GET.
// Endpoint: https://striveschool-api.herokuapp.com/books
// Requisiti della pagina:
// ● Utilizza Bootstrap 5 per creare una pagina responsive con una sezione centrale a 3 o 4 colonne per riga
// ● Ogni colonna avrà al suo interno un elemento Card di Bootstrap, creata a partire da un singolo libro: nella “card image” inserisci la copertina del libro, nel “card body” il suo titolo e il suo prezzo.
// ● Sempre nel “card body” inserisci un pulsante “Scarta”. Se premuto, dovrà far scomparire la card dalla pagina.

// ● : crea una lista che rappresenti il carrello del negozio e inseriscila dove vuoi nella pagina. Aggiungi un altro pulsante “Compra ora” vicino a “Scarta” nelle card per aggiungere il libro al carrello. Il carrello dovrà persistere nello storage del browser.
// ● : aggiungi vicino ad ogni libro del carrello un pulsante per rimuoverlo dal carrello.

const ENDPOINT = "https://striveschool-api.herokuapp.com/books";
let carrello = JSON.parse(localStorage.getItem("list")) || [];

window.onload = function () {
  getBooks();
};

const getBooks = () => {
  fetch(ENDPOINT)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore di chiamata!");
      }
    })
    .then((dates) => {
      colBuilder(dates);
      buttonRemove();
    })
    .catch((err) => {
      throw new Error(err);
    });
};

function colBuilder(books) {
  const riga = document.getElementById("griglia");
  books.forEach((b) => {
    riga.innerHTML += `
        <div class="col mb-3">
            <div class="card w-100" style="width: 18rem;">
                <img src="${b.img}" class="card-img-top w-100" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${b.title}</h5>
                    <p class="card-price">${b.price}€</p>
                    <button class="btn btn-success buy">Compra ora</button>
                    <button class="btn btn-danger remove">Scarta</button>
                </div>
            </div>
        </div>
        `;
  });
  buyNow(books);
}

function buttonRemove() {
  const bottoni = Array.from(document.getElementsByClassName("remove"));
  bottoni.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.target.closest(".col").style.opacity = 0.3;
    });
  });
}

function buyNow(b) {
  const bottoni = Array.from(document.getElementsByClassName("buy"));
  bottoni.forEach((btn, i) => {
    btn.addEventListener("click", function () {
      carrello.push(b[i]);
      localStorage.setItem("list", JSON.stringify(carrello));
      buildList();
    });
  });
}

function buildList() {
  const bL = document.getElementById("blackList");
  bL.innerHTML = "";
  carrello.forEach((item, i) => {
    const lit = document.createElement("li");
    const del = document.createElement("button");
    del.classList.add("text-danger", "ms-5");
    del.innerHTML = "delete";
    lit.classList.add("fs4", "mb-1");
    lit.innerText = item.title + " " + item.price + "€";
    bL.appendChild(lit);
    lit.appendChild(del);
    del.addEventListener("click", function (e) {
      e.target.closest("li").remove();
      carrello.splice(i, 1);
      localStorage.setItem("list", JSON.stringify(carrello));
      buildList();
    });
  });
}
buildList();

// function removeListItem(item) {
//     const libri = JSON.parse(localStorage.getItem("list")) || 0;

//     libri.forEach(it => {
//         if (item == it.title) {
//             libri.splice(indexof(it), 1);
//         }
//     })
//     localStorage.setItem("list", JSON.stringify(libri));
// }
