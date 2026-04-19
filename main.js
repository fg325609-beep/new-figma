// ==================== DATA ====================
let stwoData = [
    { id: 1, name: "Филадельфия кранч", price: 475, count: 0, status: "NEW", description: "Семга, рис, сыр креметто, соус унаги, авокадо...", img: "./img/section_two_img.png" },
    { id: 2, name: "Филадельфия крем-брюle", price: 395, count: 0, status: "XIT", description: "Сливочный сыр, семга татаки, соус унаги...", img: "./img/section_two_img_2.png" },
    { id: 3, name: "Супер Филадельфия", price: 425, count: 0, status: "", description: "Действительно много семги, сливочный сыр...", img: "./img/section_two_img.png" },
    { id: 4, name: "Тигр мама", price: 525, count: 0, status: "", description: "Тигровая креветка, огурец, авокадо, соус Айоли...", img: "./img/section_two_img_2.png" }
];

let section_theareDATA = [
    { id: 101, name: "Картофель фри", price: 475, count: 0, status: "NEW", description: "Золотистая, хрустящая картошечка фри.", img: "./img/firi.png" },
    { id: 102, name: "Куриные крылышки", price: 395, count: 0, status: "XIT", description: "Аппетитные крылышки гриль bilan.", img: "./img/tovuq.png" },
    { id: 103, name: "Наггетсы куриные", price: 425, count: 0, status: "", description: "Нежное куриное филе в панировке.", img: "./img/KFC.png" },
    { id: 104, name: "Классический ролл", price: 525, count: 0, status: "", description: "Сытный ролл в лаваше с курицей.", img: "./img/lavash.png" }
];

let dessertsData = [
    { id: 1, name: "Мини-слойки", price: 475, count: 0, status: "NEW", description: "Хрустящие слойки с сахарной пудрой.", img: "./img/bulochka.png" },
    { id: 2, name: "Трубочки с кремом", price: 395, count: 0, status: "XIT", description: "Классические трубочки bilan.", img: "./img/sosiska.png" },
    { id: 3, name: "Сырники", price: 425, count: 0, status: "", description: "Традиционные сырники из творога.", img: "./img/dessert-3.png" },
    { id: 4, name: "Мороженое Магнат", price: 525, count: 0, status: "", description: "Элитное мороженое в шоколаде.", img: "./img/dessert-4.png" },
    { id: 5, name: "Мороженое Магнат", price: 525, count: 0, status: "", description: "Элитное мороженое в шоколаде.", img: "./img/dessert-4.png" },
    { id: 6, name: "Мороженое Магнат", price: 525, count: 0, status: "", description: "Элитное мороженое в шоколаде.", img: "./img/dessert-4.png" },
    { id: 7, name: "Мороженое Магнат", price: 525, count: 0, status: "", description: "Элитное мороженое в шоколаде.", img: "./img/dessert-4.png" },
    { id: 8, name: "Мороженое Магнат", price: 525, count: 0, status: "", description: "Элитное мороженое в шоколаде.", img: "./img/dessert-4.png" },
];

let total = 0;

// ==================== UNIVERSAL RENDER ====================
function renderSection(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = data.map(el => `
        <div class="card">
            ${el.status ? `<span class="badge">${el.status}</span>` : ''}
            <img src="${el.img}" alt="${el.name}" class="product-img">
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

// ==================== LOGIC (++ --) ====================
window.changeCount = function(sectionId, id, delta) {
    let targetData;
    if (sectionId === 'section_two') targetData = stwoData;
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
    if (sectionId === 'section_two') targetData = stwoData;
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
renderSection("section_two", stwoData);
renderSection("section_theare", section_theareDATA);
renderSection("desserts", dessertsData);