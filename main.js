// ==================== DATA ====================
const categories = [
    { name: "AKSIYA", img: "./img/logo.png" },
    { name: "PIZZA",  img: "./img/logo.png" },
    { name: "SUSHI",  img: "./img/logo.png" },
    { name: "NAPITKI",img: "./img/logo.png" },
];

const products = [
    // XATOLIK: "NEW" va "XIT" larda status: kaliti qo'shildi
    { id: 1,  name: "Филадельфия кранч",      price: 475, img: "./img/pitssa.png", status: "NEW" },
    { id: 2,  name: "Филадельфия крем-брюле", price: 395, img: "./img/pitssa.png", status: "XIT" },
    { id: 3,  name: "Супер Филадельфия",      price: 425, img: "./img/pitssa.png", status: "" },
    { id: 4,  name: "Тигр мама",              price: 525, img: "./img/pitssa.png", status: "" },
    { id: 5,  name: "Тигр мама",              price: 525, img: "./img/pitssa.png", status: "" },
    { id: 6,  name: "Супер Филадельфия",      price: 425, img: "./img/pitssa.png", status: "" },
    { id: 7,  name: "Филадельфия кранч",      price: 475, img: "./img/pitssa.png", status: "" },
    { id: 8,  name: "Филадельфия крем-брюле", price: 395, img: "./img/pitssa.png", status: "" },
];

// ==================== STATE ====================
let counts = {};
let total = 0;
let currentProducts = [...products]; // Qidiruv uchun yordamchi o'zgaruvchi

// ==================== ELEMENTS ====================
const categoryContainer = document.getElementById("categoryContainer");
const section = document.getElementById("section");
const totalEl = document.getElementById("total");
const searchInput = document.getElementById("searchInput");

// ==================== RENDER ====================
function renderCategories() {
    categoryContainer.innerHTML = categories.map(cat => `
        <div class="category-card">
            <img src="${cat.img}" alt="${cat.name}">
            <h4>${cat.name}</h4>
        </div>
    `).join('');
}

function renderProducts(data) {
    section.innerHTML = data.map(product => `
        <div class="product-card">
            ${product.status ? `<span class="badge">${product.status}</span>` : ''}
            
            <img src="${product.img}" alt="${product.name}" class="product-img">
            
            <div class="info">
                <h3>${product.name}</h3>
                <p class="price">${product.price} ₽</p>
                
                <div class="counter">
                    <button onclick="minus(${product.id})" class="btn-minus">-</button>
                    <span class="count">${counts[product.id] || 0}</span>
                    <button onclick="plus(${product.id})" class="btn-plus">+</button>
                </div>

                <button class="add-btn" onclick="addToCart(${product.id})">
                    Выбрать
                </button>
            </div>
        </div>
    `).join('');
}

// ==================== COUNTER & CART ====================
window.plus = function(id) {
    counts[id] = (counts[id] || 0) + 1;
    renderProducts(currentProducts); // 'products' o'rniga joriy ko'rinishdagi massiv
};

window.minus = function(id) {
    if (counts[id] > 0) {
        counts[id]--;
    }
    renderProducts(currentProducts);
};

window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    const qty = counts[id] || 0;

    if (qty === 0) {
        alert("Avval miqdorni tanlang!");
        return;
    }

    total += product.price * qty;
    totalEl.textContent = `Jami: ${total} ₽`;

    counts[id] = 0;
    renderProducts(currentProducts);
};

// ==================== SEARCH ====================
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    
    currentProducts = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );
    
    renderProducts(currentProducts);
});

// ==================== INITIALIZE ====================
renderCategories();
renderProducts(products);