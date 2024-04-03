document.addEventListener("DOMContentLoaded", async function () {
    try {
      const response = await fetch("data.json");
      const data = await response.json();
  
      const offersContent = document.querySelector(".offers__content");
  
      offersContent.innerHTML = "";
  
      data.forEach((item) => {
        const article = document.createElement("article");
        article.classList.add("offer");
  
        const html = `
                  <div class="offer_cart">
                      <img class="offer__img" src="${item.img}" alt="offer img">
                      <div class="offer_button">
                          <img src="./img/cart.svg" alt="cart" class="cart_img">
                          <span class="add_cart_text">Add to Cart</span>
                      </div>
                  </div>
                  <div class="offer__content">
                      <h3 class="offer__heading">${item.name}</h3>
                      <p class="offer__text">${item.description}</p>
                      <p class="offer__price">${item.price}</p>
                  </div>
              `;
  
        article.innerHTML = html;
  
        offersContent.appendChild(article);
      });
  
      setUpEventListeners();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
  
  function setUpEventListeners() {
    document.querySelectorAll(".offer_button").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const productInfo = e.target.closest(".offer");
        const product = {
          name: productInfo.querySelector(".offer__heading").textContent,
          price: productInfo
            .querySelector(".offer__price")
            .textContent.replace("$", ""),
          img: productInfo.querySelector(".offer__img").src,
          size: randomSize(),
          color: randomColor(),
        };
        addToCart(product);
      });
    });
  }
  
  function randomSize() {
    const sizes = ["S", "M", "L", "XL"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  }
  
  function randomColor() {
    const colors = ["Red", "Blue", "Green", "Black"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  let cart = [];
  
  function addToCart(product) {
    const existingProductIndex = cart.findIndex(
      (item) => item.name === product.name
    );
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
  }
  
  function removeFromCart(itemIndex) {
    cart.splice(itemIndex, 1);
    updateCartDisplay();
  }
  
  function updateCartDisplay() {
    const cartSection = document.querySelector(".cart");
    const cartContent = cartSection.querySelector(".cart__content");
  
    cartContent.innerHTML = cart
      .map(
        (item, index) => `
        <div class="cart-item" data-index="${index}">
          <img src="${item.img}" alt="${item.name}" class="cart-item__img">
          <div class="cart-item__info">
            <h4>${item.name}</h4>
            <p>Price: $${item.price}</p>
            <p>Color: ${item.color}</p>
            <p>Size: ${item.size}</p>
            <p>Quantity: <input type="number" value="${
              item.quantity
            }" min="1" data-name="${encodeURIComponent(
          item.name
        )}" class="cart-item__quantity"></p>
            <button class="cart-item__remove"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z"
                fill="#575757" />
        </svg></button>
          </div>
        </div>
      `
      )
      .join("");
  
    cartSection.style.display = cart.length > 0 ? "block" : "none";
  
    document.querySelectorAll(".cart-item__remove").forEach((button) => {
      button.addEventListener("click", function () {
        const itemIndex = this.closest(".cart-item").getAttribute("data-index");
        removeFromCart(itemIndex);
      });
    });
  }
  
  document.querySelectorAll(".offer_button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const productInfo = e.target.closest(".offer");
      const product = {
        name: productInfo.querySelector(".offer__heading").textContent,
        price: productInfo
          .querySelector(".offer__price")
          .textContent.replace("$", ""),
        img: productInfo.querySelector(".offer__img").src,
      };
      addToCart(product);
    });
  });
  
  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("cart-item__quantity")) {
      const productName = e.target.dataset.name;
      const productQuantity = parseInt(e.target.value, 10);
      const productIndex = cart.findIndex((item) => item.name === productName);
      if (productIndex !== -1) {
        cart[productIndex].quantity = productQuantity;
      }
      updateCartDisplay();
    }
  });
  