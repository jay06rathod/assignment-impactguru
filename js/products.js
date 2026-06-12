async function getData(){
    const url = 'https://fakestoreapi.com/products';
    
    try{
        fetch(url)
        .then(res => {
            return res.json()
        }) 
        .then(data => {
            data.forEach(prod => {
                const card = `
                <div class="outer-handler"></div>
                <div class="cards">    
                    <img id="prod-img" src=${prod.image} alt=${prod.title}>
                    <h2>${prod.title}</h2>
                    <span>Category: ${prod.category}</span><br>
                    <span>Price: $${prod.price}</span><br>
                    <button id="view-prod-btn">View Product</button>
                </div>
                `;
                const productList = document.querySelector('ul')

                // productList.style.color = 'red';
                productList.insertAdjacentHTML("beforeend",card);
            })
        })
    }
    catch(e){
        console.error(e)
    }
}
getData();