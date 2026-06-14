const productList = document.querySelector("ul");
const searchInput = document.querySelector("#search-input");



let products = [];


// This function handles the rendering of the cards
// we also have the loader and card html code
// we reuse this in the getData() function below 
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


// This is where we fetch the data and display it also handling exceptions
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


// This handles the search functionality 
// basically we take the input value and match it with any of the words included in product title or category 
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

// This is where we handle the redirection of view product 
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-prod-btn")) {
        const productId = e.target.dataset.id;

        window.location.href = `product.html?id=${productId}`;
    }
});


// handling contact form
function handleContactSubmit() {
    const name = document.querySelector("#contact-name").value;
    const email = document.querySelector("#contact-email").value;
    const phone = document.querySelector("#contact-phone").value;
    const message = document.querySelector("#contact-message").value;

    if (name.trim() === "") {
        alert("Name is required");
        return;
    }

    if (
        !email.includes("@") ||
        !email.includes(".") ||
        email.startsWith("@") ||
        email.endsWith("@") ||
        email.endsWith(".")
    ) {
        alert("Enter a valid email");
        return;
    }

    if (
        phone.trim() === "" ||
        phone.length !== 10 ||
        Number.isNaN(Number(phone))
    ) {
        alert("Phone number must be exactly 10 digits");
        return;
    }

    if (message.trim().length < 20) {
        alert("Message must contain at least 20 characters");
        return;
    }

    alert("Form submitted successfully!");

    name.reset();
    email.reset();
    phone.reset();
    message.reset();
}