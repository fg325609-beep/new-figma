// DATA
let sushiData = [
    { id: 1, name: "Филадельфия кранч", price: 475, count: 0, status: "NEW", description: "Семга, рис, сыр креметто, соус унаги, авокадо...", img: "https://upload.wikimedia.org/wikipedia/commons/6/60/Sushi_lot_1.jpg" },
    { id: 2, name: "Филадельфия крем-брюле", price: 395, count: 0, status: "XIT", description: "Сливочный сыр, семга татаки, соус унаги...", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sushi_roll_California.jpg/640px-Sushi_roll_California.jpg" },
    { id: 3, name: "Супер Филадельфия", price: 425, count: 0, status: "", description: "Действительно много семги, сливочный сыр...", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Dragon_Roll.jpg/640px-Dragon_Roll.jpg" },
    { id: 4, name: "Тигр мама", price: 525, count: 0, status: "", description: "Тигровая креветка, огурец, авокадо, соус Айоли...", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Sake_maki.jpg/640px-Sake_maki.jpg" }
];

let section_theareDATA = [
    { id: 1, name: "Картофель фри", price: 150, count: 0, status: "NEW", description: "Хрустящий картофель с солью.", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500" },
    { id: 2, name: "Крылышки", price: 395, count: 0, status: "XIT", description: "Острые куриные крылышки гриль.", img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500" },
    { id: 3, name: "Наггетсы", price: 250, count: 0, status: "", description: "Куриное филе в панировке.", img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500" },
    { id: 4, name: "Шаурма Классик", price: 320, count: 0, status: "", description: "Мясо гриль, соус, свежие овощи.", img: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=500" }
];

let dessertsData = [
    { id: 1, name: "Мини-слойки", price: 100, count: 0, status: "NEW", description: "Свежая выпечка с сахаром.", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500" },
    { id: 2, name: "Трубочки", price: 80, count: 0, status: "XIT", description: "Сладкие вафельные трубочки с кремом.", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500" },
    { id: 3, name: "Сырники", price: 180, count: 0, status: "", description: "Домашние сырники со сметаной.", img: "https://images.unsplash.com/photo-1549395156-9acc8894ca69?w=500" },
    { id: 4, name: "Мороженое", price: 120, count: 0, status: "", description: "Шоколадное мороженое Магнат.", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500" }
];

let totalValue = 0;

// Universal Render
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
            
            <div class="card-footer-flex">
                <div class="counter">
                    <button class="btn-count" onclick="changeCount('${containerId}', ${el.id}, -1)">−</button>
                    <span class="count-num">${el.count}</span>
                    <button class="btn-count" onclick="changeCount('${containerId}', ${el.id}, 1)">+</button>
                </div>
                <span class="price-text">${el.price} ₽</span>
            </div>
            
            <button class="btn-select" onclick="addToCart(${el.id}, '${containerId}')">Выбрать</button>
        </div>
    `).join('');
}

// Logic: Change Count
window.changeCount = function(sectionId, id, delta) {
    let targetData = getTargetData(sectionId);
    const item = targetData.find(p => p.id === id);
    if (item) {
        item.count = Math.max(0, item.count + delta);
        renderSection(sectionId, targetData);
    }
};

// Logic: Add to Cart
window.addToCart = function(id, sectionId) {
    let targetData = getTargetData(sectionId);
    const item = targetData.find(p => p.id === id);

    if (item && item.count > 0) {
        totalValue += item.price * item.count;
        document.getElementById("total").textContent = `${totalValue} ₽`;
        item.count = 0; // reset
        renderSection(sectionId, targetData);
    } else {
        alert("Miqdorni tanlang!");
    }
};

function getTargetData(sectionId) {
    if (sectionId === 'sushi') return sushiData;
    if (sectionId === 'section_theare') return section_theareDATA;
    if (sectionId === 'desserts') return dessertsData;
}

// INITIALIZE
renderSection("sushi", sushiData);
renderSection("section_theare", section_theareDATA);
renderSection("desserts", dessertsData);