const containerCards = document.getElementById('container-card');
const selectProducts = document.getElementById('select-products');

window.addEventListener('load', listSelect);
selectProducts.addEventListener('change', rendercards);

function rendercards(){
    zapatillas.map (zapatilla =>{zapatilla.producto === selectProducts.value ? createCards(fruit): null})
}

function listSelect() {
    zapatillas.map(zapatilla => {
        const option = document.createElement('option');
        option.value = zapatilla.producto;
        option.textContent = zapatilla.producto;
        selectProducts.appendChild(option);
    });
}

function createCards(zapatillas) {
    const {producto, image, id, precio} = zapatillas;
    const card = document.createElement('div');
    card.classList.add('card-prodcut');
    const imgcard = document.createElement('img')
    imgcard.setAttribute('src',image);
    imgcard.setAttribute('alt',`${id}-${producto}`);
    imgcard.classList.add('img-product');
    const namecard = document.createElement('p');
    namecard.textContent = producto;
    namecard.classList.add('name-product');
    const precioCard = document.createElement('p');
    precioCard.classList.add('precio-producto');
    precioCard.textContent = "add to cart";
   const btnAdd = document.createElement('button');
   btnAdd.setAttribute('id',id);
   btnAdd.classList.add('btn-add');
   btnAdd.textContent = "Add to cart";
    card.appendChild(imgcard);   
    card.appendChild(namecard);
    card.appendChild(precioCard);
    card.appendChild(btnAdd);

    containerCards.appendChild(card);
}