const zapatillas =[
  {
    id:1,
    nombre:"yeezy 700",
    precio:500,
  },
  {
    id:2,
    nombre:"forum low",
    precio:430,
  },
  {
    id:3,
    nombre:"gazelle",
    precio:200,
  },
  {
    id:4,
    nombre:"bad bunny",
    precio:740,
  },
  {
    id:5,
    nombre:"jordab 4",
    precio:545,
  },
  {
    id:6,
    nombre:"jordan 3",
    precio:334,
  },
  {
    id:7,
    nombre:"jordan 5",
    precio:670,
  },
  {
    id:8,
    nombre:"jordan 11",
    precio:780,
  },
];

let cartrProducts = []
let productsContainer = document.getElementById("products-container");

function renderproductos(productsarray){
  productsarray.forEach(producto => {
    const card = document.createElement("div")
    card.innerHTML = `<h3>${producto.nombre}</h3>
                      <h4>${producto.precio}</h4>
                      <button class="agregarproducto" id="${producto.id}">agregar a carrito</button>`

                      productsContainer.appendChild(card)
      })
       addtocartbutton()
}
renderproductos(zapatillas)

function addtocartbutton() {
  addbutton = document.querySelectorAll(".agregarproducto")
  addbutton.forEach(button => {
    button.onclick = (e) => {
      const productId = e.currentTarget.id
      const selectedProduct = zapatillas.find(producto => producto.id == productId)
       cartrProducts.push(selectedProduct)
       console.log(cartrProducts)
localStorage.setItem("cartproducts",JSON.stringify(cartrProducts))
    }
  })
}