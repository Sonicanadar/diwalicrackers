let finalTotal = 0;

// Load products and render them
fetch('products.json')
  .then(response => response.json())
  .then(products => {
    renderProducts(products);
  })
  .catch(error => console.error('Error loading products:', error));

// Retrieve cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render product cards
function renderProducts(products) {
  const container = document.getElementById('product-list');
  container.innerHTML = '';
  products.forEach(product => {
    const count = cart.filter(item => item.id === product.id).length;
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
  <img src="${product.image}" alt="${product.title}">
  <h3>${product.title}</h3>
  <p>${product.category}</p>
  <p class="price">₹${product.price}</p>
  <div class="cart-controls">
    <button class="minus" onclick="updateQuantity(${product.id}, -1)">−</button>
    <span class="count">${count}</span>
    <button class="plus" onclick="updateQuantity(${product.id}, 1)">+</button>
  </div>
`;

    container.appendChild(card);
  });
}

// Add item to cart
function addToCart(productId) {
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const product = products.find(p => p.id === productId);
      if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartPopup();
        updateCartCount();
        renderProducts(products);
      }
    });
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartPopup();
  updateCartCount();
}

// Update cart count in header
function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.length;
}
function updateQuantity(productId, change) {
  const index = cart.findIndex(item => item.id === productId);
  if (change === 1) {
    const product = cart.find(p => p.id === productId);
    if (product) cart.push(product);
  } else if (change === -1 && index !== -1) {
    cart.splice(index, 1);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  displayCartPopup();
  fetch('products.json')
    .then(response => response.json())
    .then(products => renderProducts(products));
}

// Display cart in popup
function displayCartPopup() {
  const cartContainer = document.getElementById('cart-list-popup');
  const cartTotal = document.getElementById('cart-total-popup');
  cartContainer.innerHTML = '';
  let total = 0;

  // Group items by product ID
  const groupedCart = cart.reduce((acc, item) => {
    const existing = acc.find(p => p.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // Render grouped items
  groupedCart.forEach(product => {
    total += product.price * product.quantity;
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.title}" width="50">
      <span>${product.title} - ₹${product.price}</span>
      <div class="cart-controls">
        <button class="minus" onclick="updateQuantity(${product.id}, -1)">−</button>
        <span class="count">${product.quantity}</span>
        <button class="plus" onclick="updateQuantity(${product.id}, 1)">+</button>
      </div>
    `;
    cartContainer.appendChild(cartItem);
  });

  const discount = total * 0.5;
const finalTotal = total - discount;
cartTotal.innerHTML = `
  <h3>Subtotal: ₹${total}</h3>
  <h3>Discount (50%): -₹${discount}</h3>
  <h2>Total: ₹${finalTotal}</h2>
 
`;
}


// Popup open/close logic
const cartPopup = document.getElementById('cart-popup');
const closeBtn = document.querySelector('.close-btn');
const cartIcon = document.querySelector('.cart-icon');

cartIcon.addEventListener('click', () => {
  displayCartPopup();
  cartPopup.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  cartPopup.style.display = 'none';
});

// Fade-in animation for sections
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// Initialize on load
window.onload = () => {
  updateCartCount();
};



setTimeout(() => {
  const upiBtn = document.getElementById('upi-btn');
  const codBtn = document.getElementById('cod-btn');

  if (upiBtn) {
    upiBtn.addEventListener('click', () => {
      const upiLink = `upi://pay?pa=yourupiid@bank&pn=VAVPyropark&am=${finalTotal}&cu=INR&tn=Diwali Crackers Order`;
      window.location.href = upiLink;
    });
  }

  if (codBtn) {
    codBtn.addEventListener('click', () => {
      alert("Order placed with Cash on Delivery. You’ll pay when the crackers arrive!");
      sendWhatsAppDetails("COD Order");
    });
  }
}, 100);


function sendWhatsAppDetails(orderId) {
  const message = `Order confirmed!\nOrder ID: ${orderId}\nTotal: ₹${finalTotal}\nThank you for shopping at VAV Pyropark 🎆`;
  const phoneNumber = "918976029973"; // your business WhatsApp number
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
}
