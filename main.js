// 1. Sushi bo'limi
let sushiData = [
    { id: 1, name: "Филадельфия", price: 475, count: 0, status: "NEW", description: "Свежий лосось, сливочный сыр и рис.", img: "https://upload.wikimedia.org/wikipedia/commons/6/60/Sushi_lot_1.jpg" },
    { id: 2, name: "Калифорния", price: 395, count: 0, status: "XIT", description: "Краб, авокадо и икра тобико.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sushi_roll_California.jpg/640px-Sushi_roll_California.jpg" },
    { id: 3, name: "Дракон Ролл", price: 425, count: 0, status: "", description: "Угорь, авокадо и соус унаги.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Dragon_Roll.jpg/640px-Dragon_Roll.jpg" },
    { id: 4, name: "Сяке Маки", price: 525, count: 0, status: "", description: "Классический ролл с лососем.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Sake_maki.jpg/640px-Sake_maki.jpg" }
];

// 2. Zakuski bo'limi
let section_theareDATA = [
    { id: 1, name: "Картофель фри", price: 150, count: 0, status: "NEW", description: "Хрустящий картофель с солью.", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80" },
    { id: 2, name: "Крылышки", price: 395, count: 0, status: "XIT", description: "Острые куриные крылышки гриль.", img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500&q=80" },
    { id: 3, name: "Наггетсы", price: 250, count: 0, status: "", description: "Куриное филе в панировке.", img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500&q=80" }
];

// 3. Desertlar bo'limi
let dessertsData = [
    { id: 1, name: "Булочки", price: 100, count: 0, status: "NEW", description: "Свежая выпечка к чаю.", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80" },
    { id: 2, name: "Трубочки", price: 80, count: 0, status: "XIT", description: "Сладкие вафельные трубочки.", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80" }
];

let total = 0;

function renderSection(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = data.map(el => `
        <div class="card">
            ${el.status ? `<span class="badge">${el.status}</span>` : ''}
            <div class="img-box">
                <img src="${el.img}" alt="${el.name}" class="product-img">
            </div>
            <h1>${el.name}</h1>
            <p>${el.description}</p>
            
            <div class="counter-container">
                <div class="counter">
                    <button class="btn-count" onclick="changeCount('${containerId}', ${el.id}, -1)">−</button>
                    <span class="count-num">${el.count}</span>
                    <button class="btn-count" onclick="changeCount('${containerId}', ${el.id}, 1)">+</button>
                </div>
                <div class="card-footer">
                    <span class="price-text">${el.price * (el.count || 1)} ₽</span>
                </div>
            </div>
            <button class="btn-select" onclick="addToCart(${el.id}, '${containerId}')">Выбрать</button>
        </div>
    `).join('');
}

window.changeCount = function(sectionId, id, delta) {
    let targetData;
    if (sectionId === 'sushi') targetData = sushiData;
    else if (sectionId === 'section_theare') targetData = section_theareDATA;
    else if (sectionId === 'desserts') targetData = dessertsData;

    const item = targetData.find(p => p.id === id);
    if (item) {
        item.count = Math.max(0, item.count + delta);
        renderSection(sectionId, targetData);
    }
};

window.addToCart = function(id, sectionId) {
    let targetData;
    if (sectionId === 'sushi') targetData = sushiData;
    else if (sectionId === 'section_theare') targetData = section_theareDATA;
    else if (sectionId === 'desserts') targetData = dessertsData;

    const item = targetData.find(p => p.id === id);

    if (item && item.count > 0) {
        total += item.price * item.count;
        document.getElementById("total").textContent = `Jami: ${total} ₽`;
        item.count = 0; 
        renderSection(sectionId, targetData);
    } else {
        alert("Avval miqdorni tanlang!");
    }
};

// INITIALIZE
renderSection("sushi", sushiData);
renderSection("section_theare", section_theareDATA);
renderSection("desserts", dessertsData);