let cart = [];


document.querySelectorAll(".add-cart").forEach(function (btn) {

    btn.addEventListener("click", function () {

        let card = this.closest(".card");

        let name = card.querySelector(".card-title").innerText;
        let price = Number(card.querySelector(".price").innerText.replace("Rs.", ""));
        let img = card.querySelector("img").src;

        addToCart(name, price, img);

    });

});

function addToCart(name, price, img) {

    let found = false;


    cart.forEach(function (item) {

        if (item.name === name) {
            item.qty++;
            found = true;
        }

    });


    if (found == false) {

        cart.push({
            name: name,
            price: price,
            img: img,
            qty: 1
        });

    }

    renderCart();
}

function renderCart() {

    let html = "";
    let total = 0;

    cart.forEach(function (item, index) {

        let itemTotal = item.price * item.qty;
        total = total + itemTotal;

        html += `
<li class="list-group-item bg-dark text-white d-flex align-items-center gap-3">

<img src="${item.img}" class="cart-img">

<div class="flex-grow-1">
<div class="fw-bold fs-5">${item.name}</div>
<div class="fs-6">Rs.${item.price}</div>
</div>

<div class="text-center">
<button class="btn btn-danger btn-sm" onclick="updateQty(${index},-1)">-</button>
<div class="my-1 fs-5">${item.qty}</div>
<button class="btn btn-success btn-sm" onclick="updateQty(${index},1)">+</button>
</div>

<button class="btn btn-outline-danger ms-2" onclick="removeItem(${index})">
<i class="bi bi-trash fs-5"></i>
</button>

</li>
`;

    });

    document.getElementById("cartItems").innerHTML =
        html || "<p>Cart Empty</p>";

    document.getElementById("cartTotal").innerText =
        "Rs." + total;
}

function updateQty(index, val) {

    cart[index].qty = cart[index].qty + val;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}
