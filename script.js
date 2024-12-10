const productList = document.getElementById("product-list");
const productCount = document.getElementById("product-count");
const searchInput = document.getElementById("search");
const sortOptions = document.getElementById("sortOptions");

async function loadProducts(order = "nome", filter = "") {
  try {
    let url = `http://localhost:8080/produto?order=${order}`;
    if (filter) {
      url += `&filter=${filter}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro ao acessar a API: " + response.status);
    }

    const products = await response.json();

    console.log(products);

let htmlContent = "";
products.forEach(product => {
  htmlContent += `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card">
        <img src="${product.imagemURL || 'https://th.bing.com/th/id/R.c175863cabf0953fefa06cc2263b0d63?rik=pRNIrbNsuosIYA&pid=ImgRaw&r=0'}" class="card-img-top" alt="${product.nome || 'Imagem do produto'}">

        <div class="card-body">
          <h5 class="card-title">${product.nome || 'Produto sem nome'}</h5>
          <p class="card-text">Preço: R$ ${product.preco || '0,00'}</p>
        </div>
      </div>
    </div>
  `;
});


productList.innerHTML = htmlContent;
productCount.textContent = `Total de produtos: ${products.length}`;


    productList.innerHTML = htmlContent;
    productCount.textContent = `Total de produtos: ${products.length}`;
  } catch (error) {
    console.error("Erro ao carregar os produtos:", error);
    productList.innerHTML = "<p class='text-danger'>Erro ao carregar produtos.</p>";
  }
}

window.onload = function() {
  loadProducts(); 
};

searchInput.addEventListener("input", function() {
  const filterValue = searchInput.value.trim();
  loadProducts("nome", filterValue);  
});

sortOptions.addEventListener("change", (event) => {
  const selectedOrder = event.target.value;
  loadProducts(selectedOrder); 
});