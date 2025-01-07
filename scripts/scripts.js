document.getElementById("current-year").textContent = new Date().getFullYear();

let products = [];

const form = document.querySelector(".forms-area");
const nameInput = form.querySelector("input[placeholder='nome...']");
const valueInput = form.querySelector("input[placeholder='valor...']");
const imageInput = form.querySelector("input[placeholder='imagem...']");
const cardContainer = document.querySelector(".card-container");

valueInput.addEventListener("input", () => {
    let value = valueInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    value = (parseInt(value, 10) / 100).toFixed(2); // Converte para número e formata com duas casas decimais
    valueInput.value = value.replace(".", ","); // Substitui ponto por vírgula
});

function renderProducts() {
    cardContainer.innerHTML = "";
    if (products.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Nenhum produto cadastrado.";
        message.classList.add("empty-message");
        cardContainer.appendChild(message);
        return;
    }
    products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="card-img" />
      <div class="card-title">${product.name}</div>
      <div class="card-bottom">
        <span class="card-price">R$ ${product.value}</span>
        <button class="btn-erase" onclick="removeProduct(${product.id})">
          <img src="./assets/svg/trash.svg" alt="Excluir" />
        </button>
      </div>
    `;
        cardContainer.appendChild(card);
    });
}

function addProduct(event) {
    event.preventDefault();
    const name = nameInput.value;
    const value = valueInput.value.replace(".", ","); // Substitui ponto por vírgula
    const image = imageInput.files[0]
        ? URL.createObjectURL(imageInput.files[0])
        : "https://placehold.co/200x200";
    const newProduct = { id: Date.now(), name, value, image };
    products.push(newProduct);
    renderProducts();
    form.reset();
}

function removeProduct(id) {
    products = products.filter((product) => product.id !== id);
    renderProducts();
}

form.addEventListener("submit", addProduct);

renderProducts();
