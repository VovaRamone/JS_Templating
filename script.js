document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch("data.json");
        const data = await response.json();

        const offersContent = document.querySelector(".offers__content");

        offersContent.innerHTML = "";

        data.forEach(item => {
            const article = document.createElement("article");
            article.classList.add("offer");

            const html = `
                <div class="offer_cart">
                    <img class="offer__img" src="${item.img}" alt="offer img">
                    <a href="#" class="offer_button">
                        <img src="./img/cart.svg" alt="cart" class="cart_img">
                        <span class="add_cart_text">Add to Cart</span>
                    </a>
                </div>
                <div class="offer__content">
                    <a href="#" class="offer__heading">${item.name}</a>
                    <p class="offer__text">${item.description}</p>
                    <p class="offer__price">${item.price}</p>
                </div>
            `;

            article.innerHTML = html;

            offersContent.appendChild(article);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});
