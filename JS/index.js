const content = document.querySelector('.content');
const btnNew = document.querySelector('.add-note-content');

let itens_db = localStorage.getItem('itens_db')
  ? JSON.parse(localStorage.getItem('itens_db'))
  : [];

const colors = [
  "#845EC2",
  "#008F7A",
  "#008E9B",
  "#FFC75F",
  "#FF8066",
  "#BA3CAF",
];

const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

function load_itens() {
  content.innerHTML = "";
  verify_nulls();

  itens_db.forEach((item, i) => {
    addHTML(item, i);
  });

  addEvents();

  btnNew.onclick = () => {
    addHTML();
    addEvents();
  };
}

function addHTML(item) {
  const div = document.createElement("div");
  div.innerHTML = `<div class="item" style="background-color: ${
    item?.color || randomColor()
  }">
    <span class="remove">X</span>
    <textarea>${item?.text || ""}</textarea>
  </div>`;

  content.appendChild(div);
}

function addEvents() {
  const notes = document.querySelectorAll(".item textarea");
  const remove = document.querySelectorAll(".item .remove");

  notes.forEach((item, i) => {
    item.oninput = () => {
      itens_db[i] = {
        text: item.value,
        color: itens_db[i]?.color || item.parentElement.style.backgroundColor,
      };

      localStorage.setItem("itens_db", JSON.stringify(itens_db));
    };
  });

  remove.forEach((item, i) => {
    item.onclick = () => {
      content.children[i].remove();
      if (itens_db[i]) {
        itens_db.splice(i, 1);
        localStorage.setItem("itens_db", JSON.stringify(itens_db));
      }
      addEvents();
    };
  });
}

function verify_nulls() {
  itens_db = itens_db.filter((item) => item);
  localStorage.setItem("itens_db", JSON.stringify(itens_db));
}

document.addEventListener("DOMContentLoaded", load_itens);
