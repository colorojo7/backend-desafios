const socket = io()

socket.emit("mensaje" , "Hola te escribo desde cliente!")

socket.on("saludito", (data)=>{
    console.log(data);
})

socket.on("products", (data)=>{
    const productsList = document.getElementById("productsList");
    
    productsList.innerHTML="";

    data.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("col-3", "p-4");
        productItem.innerHTML = `
            <div class="card">
                <img src="img/noImage.png" class="card-img-top" alt="product image">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p>USD <span class="text-danger-emphasis fw-bold">${product.price}</span></p>
                    <a href="/product" class="btn btn-primary">See details</a>   
                    <button data-id="${product.id}" class="deleteBtn btn btn-danger">DELETE</button>
                </div>
            </div>`;
        productsList.appendChild(productItem);
    });
})

//Event Listener
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("deleteBtn")) {
        const productId = event.target.getAttribute("data-id");
        socket.emit("deleteProduct", productId);
    }
});

// Manejador de envío del formulario para agregar productos
document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const formData = new FormData(this);
    const productData = {};
    
    formData.forEach((value, key) => {
      productData[key] = value;
    });
  
    socket.emit('addProduct', productData);
    this.reset();
  });
