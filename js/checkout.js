// Checkout Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    renderCheckoutItems();
    setupPlaceOrder();
});

function renderCheckoutItems() {
    const cart = App.cart || [];
    const container = document.getElementById('checkoutItems');
    
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p class="text-muted">No items in cart</p>';
        updateTotals(0);
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between mb-3">
            <div>
                <h6 class="mb-0">${item.title}</h6>
                <small class="text-muted">Quantity: ${item.quantity}</small>
            </div>
            <span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    updateTotals();
}

function updateTotals(discount = 0) {
    const subtotal = App.getCartTotal();
    const tax = subtotal * 0.1;
    const total = subtotal + tax - discount;

    document.getElementById('checkoutSubtotal').textContent = App.formatCurrency(subtotal);
    document.getElementById('checkoutTax').textContent = App.formatCurrency(tax);
    document.getElementById('checkoutTotal').textContent = App.formatCurrency(total);

    if (discount > 0) {
        document.getElementById('discountRow').style.display = 'flex';
        document.getElementById('checkoutDiscount').textContent = '-' + App.formatCurrency(discount);
    }
}

function setupPlaceOrder() {
    document.getElementById('placeOrderBtn')?.addEventListener('click', function() {
        const agreeTerms = document.getElementById('agreeTerms').checked;
        if (!agreeTerms) {
            App.showNotification('Please agree to the terms and conditions', 'warning');
            return;
        }

        // Simulate payment processing
        this.disabled = true;
        this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
        
        setTimeout(() => {
            App.showNotification('Order placed successfully!', 'success');
            
            // Clear cart
            App.cart = [];
            localStorage.setItem('cart', JSON.stringify(App.cart));
            App.loadCartCount();
            
            // Redirect to success page or dashboard
            setTimeout(() => {
                window.location.href = 'student-dashboard.html';
            }, 1500);
        }, 2000);
    });
}

