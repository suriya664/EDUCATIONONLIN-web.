// Cart Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    renderCart();
    setupEventListeners();
});

function renderCart() {
    const cart = App.cart || [];
    const container = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');

    if (cart.length === 0) {
        if (container) container.classList.add('d-none');
        if (emptyCart) emptyCart.classList.remove('d-none');
        updateTotals(0);
        return;
    }

    if (container) container.classList.remove('d-none');
    if (emptyCart) emptyCart.classList.add('d-none');

    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item border-bottom pb-3 mb-3" data-item-index="${index}">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <img src="${item.image}" alt="${item.title}" class="img-fluid rounded">
                </div>
                <div class="col-md-5">
                    <h6 class="fw-bold mb-1">${item.title}</h6>
                    <small class="text-muted">Course</small>
                </div>
                <div class="col-md-2">
                    <span class="fw-bold">$${item.price.toFixed(2)}</span>
                </div>
                <div class="col-md-2">
                    <div class="input-group input-group-sm">
                        <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="number" class="form-control text-center" value="${item.quantity}" min="1" readonly>
                        <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="col-md-1 text-end">
                    <button class="btn btn-link text-danger" onclick="removeFromCart(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    updateTotals();
}

function updateQuantity(index, change) {
    const cart = App.cart;
    if (!cart[index]) return;

    cart[index].quantity += change;
    if (cart[index].quantity < 1) {
        removeFromCart(index);
        return;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    App.loadCartCount();
    renderCart();
}

function removeFromCart(index) {
    App.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(App.cart));
    App.loadCartCount();
    renderCart();
    App.showNotification('Item removed from cart', 'info');
}

function updateTotals(discount = 0) {
    const subtotal = App.getCartTotal();
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax - discount;

    document.getElementById('subtotal').textContent = App.formatCurrency(subtotal);
    document.getElementById('tax').textContent = App.formatCurrency(tax);
    document.getElementById('total').textContent = App.formatCurrency(total);
}

function setupEventListeners() {
    document.getElementById('applyCoupon')?.addEventListener('click', function() {
        const code = document.getElementById('couponCode').value.toUpperCase();
        if (code === 'SAVE10') {
            const discount = App.getCartTotal() * 0.1;
            updateTotals(discount);
            App.showNotification('Coupon applied! 10% discount', 'success');
        } else if (code) {
            App.showNotification('Invalid coupon code', 'danger');
        }
    });
}

// Make functions globally available
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

