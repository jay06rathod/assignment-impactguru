const product = document.querySelector("main");

let products = [];

// This is where we render the product by id
function renderProducts(prodID){

    const singleProduct = products.find(item => item.id === prodID);    // We find the prodid that matches the item id

    if(!singleProduct){
        product.innerHTML = `<h2>Product details unable to load.</h2>`
        // console.log(prodID)
        return;
    }

    const { image, title, category, description, price, id } = singleProduct;

    product.innerHTML = `
    <button class="back-btn" onclick="window.history.back()"><i class="fa-solid fa-arrow-left"></i></button>
        <aside>
            <div class="image-container">
                <img src="${image}" alt="${title}">
            </div>
        </aside>
        <section>
            <div class="container">
                <div class="details">
                    <h2>${title}</h2>
                    <span class="cat-details">Category: ${category}</span>
                    <p class="desc">Description: ${description}</p>
                    <h3>Price: $${price}</h3>
                    <button
                        class="add-prod-btn"
                        data-id="${id}">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Add to Cart
                    </button>
                </div>
                <div class = "stars-container">
                    <h3>Reviews: </h3>
                </div>
            </div>
        </section>
    `
}

// This is where we fetch the data and display it also handling exceptions
async function getData() {
    const url = 'https://fakestoreapi.com/products';

    try {
        product.innerHTML = `<h2 class="loader">Loading Products...</h2>`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch products.");
        }

        products = await response.json();

        const params = new URLSearchParams(window.location.search); // Here we take parameters from the url i.e. ID
        const productId = Number(params.get("id")); // We convert that parameter into actual number 

        renderProducts(productId);  // Now using that productId we render that particular product

    } catch (e) {
        console.error(e);
        product.innerHTML = `<h2>Failed to load products</h2>`;
    }
}

getData();

function handleStars(){

}