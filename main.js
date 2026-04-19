// Bo'limlar ro'yxati
const categories = [
    { id: "pizza", title: "Пицца", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400" },
    { id: "sushi", title: "Суши", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400" },
    { id: "zakuski", title: "Закуски", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400" },
    { id: "desserts", title: "Десерты", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400" },
    { id: "drinks", title: "Напитки", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400" },
    { id: "sauces", title: "Соусы", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400" },
    { id: "combo", title: "Комбо", img: "https://images.unsplash.com/photo-1610614819513-58e34989848b?w=400" }
];

let allData = {};
let totalSum = 0;

// 56 ta kartani yaratish (har bo'limga 8 tadan)
categories.forEach(cat => {
    allData[cat.id] = [];
    for (let i = 1; i <= 8; i++) {
        allData[cat.id].push({
            id: i,
            name: `${cat.title} #${i}`,
            price: 100 + (i * 50),
            count: 0,
            status: i === 1 ? "NEW" : (i === 2 ? "XIT" : ""),
            description: "Магнат Мини — это коллекция легендарных вкусов эскимо...",
            img: cat.img
        });
    }
});

const mainContent = document.getElementById("main-content");

function renderAll() {
    mainContent.innerHTML = categories.map(cat => `
        <h2 class="section-title">${cat.title}</h2>
        <div class="grid-container" id="${cat.id}">
            ${allData[cat.id].map(item => `
                <div class="card">
                    ${item.status ? `<span class="badge">${item.status}</span>` : ''}
                    <div class="img-box"><img src="${item.img}" class="product-img"></div>
                    <h1>${item.name}</h1>
                    <p>${item.description}</p>
                    <div class="card-footer-flex">
                        <div class="counter">
                            <button class="btn-count" onclick="changeCount('${cat.id}', ${item.id}, -1)">−</button>
                            <span class="count-num">${item.count}</span>
                            <button class="btn-count" onclick="changeCount('${cat.id}', ${item.id}, 1)">+</button>
                        </div>
                        <span class="price-text">${item.price} ₽</span>
                    </div>
                    <button class="btn-select" onclick="addToCart('${cat.id}', ${item.id})">Выбрать</button>
                </div>
            `).join('')}
        </div>
    `).join('');
}

window.changeCount = function(catId, itemId, delta) {
    const item = allData[catId].find(p => p.id === itemId);
    if (item) {
        item.count = Math.max(0, item.count + delta);
        renderAll();
    }
};

window.addToCart = function(catId, itemId) {
    const item = allData[catId].find(p => p.id === itemId);
    if (item && item.count > 0) {
        totalSum += item.price * item.count;
        document.getElementById("total").textContent = `${totalSum} ₽`;
        item.count = 0;
        renderAll();
    }
};

renderAll();