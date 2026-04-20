const categories = [
    { id: "pizza", title: "Пицца", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400" },
    { id: "sushi", title: "Суши", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400" },
    { id: "drinks", title: "Напитки", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400" },
    { id: "zakuski", title: "Закуски", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400" },
    { id: "combo", title: "Комбо", img: "https://images.unsplash.com/photo-1610614819513-58e34989848b?w=400" },
    { id: "desserts", title: "Десерты", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400" },
    { id: "sauces", title: "Соусы", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400" }
];

let allData = {};
let totalSum = 0;

// 7 category × 8 = 56 ta card
categories.forEach(cat => {
    allData[cat.id] = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        name: `${cat.title} mahsulot #${i + 1}`,
        price: 200 + i * 50,
        count: 0,
        img: cat.img
    }));
});

function renderAll() {
    const main = document.getElementById("main-content");

    main.innerHTML = categories.map(cat => `
        <section id="${cat.id}">
            <h2 class="section-title">${cat.title}</h2>
            <div class="grid-container">
                ${allData[cat.id].map(item => `
                    <div class="card">
                        <div class="img-box">
                            <img src="${item.img}" class="product-img">
                        </div>
                        <h3>${item.name}</h3>
                        <p class="price-text">${item.price} ₽</p>
                        <button onclick="addToCart('${cat.id}', ${item.id})" class="btn-select">
                            Qo‘shish
                        </button>
                    </div>
                `).join("")}
            </div>
        </section>
    `).join("");
}

function addToCart(catId, itemId) {
    const item = allData[catId].find(i => i.id === itemId);
    totalSum += item.price;
    document.getElementById("total").textContent = totalSum + " ₽";
}

renderAll();