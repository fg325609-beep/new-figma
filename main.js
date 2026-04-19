// ==================== DATA ====================
const categories = [
    { name: "AKSIYA", img: "./img/logo.png" },
    { name: "PIZZA",  img: "./img/logo.png" },
    { name: "SUSHI",  img: "./img/logo.png" },
    { name: "NAPITKI",img: "./img/logo.png" },
];

// Birinchi bo'lim ma'lumotlari
let stwoData = [
    { id: 1, name: "Филадельфия кранч", price: 475, count: 0, status: "NEW", description: "Семга, рис, сыр креметто, соус унаги, авокадо...", img: "./img/section_two_img.png" },
    { id: 2, name: "Филадельфия крем-брюle", price: 395, count: 0, status: "XIT", description: "Сливочный сыр, семга татаки, соус унаги...", img: "./img/section_two_img_2.png" },
    { id: 3, name: "Супер Филадельфия", price: 425, count: 0, status: "", description: "Действительно много семги, сливочный сыр...", img: "./img/section_two_img.png" },
    { id: 4, name: "Тигр мама", price: 525, count: 0, status: "", description: "Тигровая креветка, огурец, авокадо, соус Айоли...", img: "./img/section_two_img_2.png" }
];

// Ikkinchi bo'lim (Zakuski) ma'lumotlari
let section_theareDATA = [
    { id: 9, name: "Картофель фри", price: 475, count: 0, status: "NEW", description: "Золотистая, хрустящая картошечка фри.", img: "./img/firi.png" },
    { id: 10, name: "Куриные крылышки", price: 395, count: 0, status: "XIT", description: "Аппетитные крылышки гриль bilan.", img: "./img/tovuq.png" },
    { id: 11, name: "Наггетсы куриные", price: 425, count: 0, status: "", description: "Нежное куриное филе в панировке.", img: "./img/KFC.png" },
    { id: 12, name: "Классический ролл", price: 525, count: 0, status: "", description: "Сытный ролл в лаваше с курицей.", img: "./img/lavash.png" },
    { id: 12, name: "Классический ролл", price: 525, count: 0, status: "", description: "Сытный ролл в лаваше с курицей.", img: "./img/lavash.png" },
    { id: 11, name: "Наггетсы куриные", price: 425, count: 0, status: "", description: "Нежное куриное филе в панировке.", img: "./img/KFC.png" },

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

// ==================== LOGIC ====================
window.changeCount = function(sectionId, id, delta) {
    let targetData = (sectionId === 'section_two') ? stwoData : section_theareDATA;
    const item = targetData.find(p => p.id === id);
    
    if (item) {
        item.count = Math.max(0, item.count + delta);
        renderSection(sectionId, targetData);
    }
};

window.addToCart = function(id, sectionId) {
    let targetData = (sectionId === 'section_two') ? stwoData : section_theareDATA;
    const item = targetData.find(p => p.id === id);

    if (item && item.count > 0) {
        total += item.price * item.count;
        document.getElementById("total").textContent = `Jami: ${total} ₽`;
        item.count = 0; // Savatga qo'shilgach nolga tushirish
        renderSection(sectionId, targetData);
    } else {
        alert("Avval miqdorni tanlang!");
    }
};

// INITIALIZE
renderSection("section_two", stwoData);
renderSection("section_theare", section_theareDATA);