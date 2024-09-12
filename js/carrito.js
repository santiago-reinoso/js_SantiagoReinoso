 let cartStorage = localStorage.getItem("cartProducts");
        let cartItems = JSON.parse(cartStorage) || []; 
        const cartContainer = document.getElementById("cart-section");

        function renderCarrito(cartItems) {
            cartContainer.innerHTML = '';

            cartItems.forEach(producto => {
                const card = document.createElement("div");
                card.className = 'producto';
                card.innerHTML = `
                    <h3>${producto.nombre}</h3>
                    <h4>${producto.precio}</h4>
                    <button class="btn-eliminar" id="${producto.id}">Eliminar producto</button>
                `;

                const eliminarBtn = card.querySelector('.btn-eliminar');
                eliminarBtn.addEventListener('click', () => eliminarProducto(producto.id));

                cartContainer.appendChild(card);
            });
        }

        function eliminarProducto(productId) {
            cartItems = cartItems.filter(producto => producto.id !== productId);
            
            localStorage.setItem("cartProducts", JSON.stringify(cartItems));

            renderCarrito(cartItems);
        }

        renderCarrito(cartItems);

