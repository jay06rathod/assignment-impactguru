const productList = document.querySelector("ul");
const searchInput = document.querySelector("#search-input");



let products = [];

function renderProducts(productArray) {

    if (productArray.length === 0) {
        productList.innerHTML = `
            <h2 class="loader">No products found</h2>
        `;
        return;
    }

    let cards = "";

    productArray.forEach(prod => {
        cards += `
        <div class="outer-handler">
            <div class="cards">
                <img class="prod-img" src="${prod.image}" alt="${prod.title}">

                <h2>${prod.title}</h2>

                <span>Category: ${prod.category}</span><br>

                <span>Price: $${prod.price}</span><br>

                <button
                    class="view-prod-btn"
                    data-id="${prod.id}">
                    View Product
                </button>

                <button
                    class="add-prod-btn"
                    data-id="${prod.id}">
                    <i class="fa-solid fa-cart-shopping"></i>
                    Add to Cart
                </button>
            </div>
        </div>
        `;
    });

    productList.innerHTML = cards;
}

async function getData(){
    const url = 'https://fakestoreapi.com/products';
    
    try{
    productList.innerHTML = `<h2 class="loader">Loading Products...</h2>`;
    const response = await fetch(url);
    if(!response.ok){
        throw new Error("Failed to fetch products.");
    }
        products = await response.json();

        renderProducts(products);
    }
    catch(e){
        console.error(e)
        productList.innerHTML = `<h2>Failed to load products</h2>`
    }
}
getData();


searchInput.addEventListener("input", () => {
    console.log(searchInput.value);

    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    console.log(filteredProducts);

    renderProducts(filteredProducts);
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-prod-btn")) {
        const productId = e.target.dataset.id;

        window.location.href = `product.html?id=${productId}`;
    }
});