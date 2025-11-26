// Global App Configuration
const App = {
    // Initialize app
    init: function() {
        this.loadCartCount();
        this.initScrollToTop();
        this.initTooltips();
        this.initNotifications();
    },

    // Cart Management
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    
    addToCart: function(courseId, courseTitle, coursePrice, courseImage) {
        const existingItem = this.cart.find(item => item.id === courseId);
        
        if (!existingItem) {
            this.cart.push({
                id: courseId,
                title: courseTitle,
                price: coursePrice,
                image: courseImage,
                quantity: 1
            });
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.loadCartCount();
            this.showNotification('Course added to cart!', 'success');
            return true;
        } else {
            this.showNotification('Course already in cart!', 'warning');
            return false;
        }
    },

    removeFromCart: function(courseId) {
        this.cart = this.cart.filter(item => item.id !== courseId);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.loadCartCount();
        this.showNotification('Course removed from cart!', 'info');
    },

    loadCartCount: function() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = count;
            if (count === 0) {
                cartCount.style.display = 'none';
            } else {
                cartCount.style.display = 'block';
            }
        }
    },

    getCartTotal: function() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Wishlist Management
    wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
    
    addToWishlist: function(courseId, courseTitle, coursePrice, courseImage) {
        const existingItem = this.wishlist.find(item => item.id === courseId);
        
        if (!existingItem) {
            this.wishlist.push({
                id: courseId,
                title: courseTitle,
                price: coursePrice,
                image: courseImage
            });
            localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
            this.showNotification('Added to wishlist!', 'success');
            return true;
        } else {
            this.showNotification('Already in wishlist!', 'warning');
            return false;
        }
    },

    removeFromWishlist: function(courseId) {
        this.wishlist = this.wishlist.filter(item => item.id !== courseId);
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
        this.showNotification('Removed from wishlist!', 'info');
    },

    isInWishlist: function(courseId) {
        return this.wishlist.some(item => item.id === courseId);
    },

    // Scroll to Top
    initScrollToTop: function() {
        // Create scroll to top button
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-top';
        scrollTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
        scrollTopBtn.style.display = 'none';
        document.body.appendChild(scrollTopBtn);

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    },

    // Initialize Bootstrap Tooltips
    initTooltips: function() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    },

    // Notification System
    initNotifications: function() {
        // Create toast container if it doesn't exist
        if (!document.querySelector('.toast-container')) {
            const container = document.createElement('div');
            container.className = 'toast-container position-fixed top-0 end-0 p-3';
            container.style.zIndex = '9999';
            document.body.appendChild(container);
        }
    },

    showNotification: function(message, type = 'info') {
        const toastContainer = document.querySelector('.toast-container');
        const toastId = 'toast-' + Date.now();
        
        const bgColor = {
            'success': 'bg-success',
            'danger': 'bg-danger',
            'warning': 'bg-warning',
            'info': 'bg-info'
        }[type] || 'bg-info';

        const toastHTML = `
            <div id="${toastId}" class="toast align-items-center text-white ${bgColor} border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">${message}</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;

        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 3000
        });
        
        toast.show();
        
        toastElement.addEventListener('hidden.bs.toast', function() {
            toastElement.remove();
        });
    },

    // Format Currency
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    // Format Date
    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    // Course Rating Calculation
    calculateRating: function(reviews) {
        if (!reviews || reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    },

    // Search Courses
    searchCourses: function(query) {
        // This would typically call an API
        // For now, we'll filter client-side data
        return window.coursesData ? window.coursesData.filter(course => 
            course.title.toLowerCase().includes(query.toLowerCase()) ||
            course.description.toLowerCase().includes(query.toLowerCase()) ||
            course.category.toLowerCase().includes(query.toLowerCase())
        ) : [];
    }
};

    // Load Footer Component (if footer placeholder exists)
    loadFooter: function() {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            fetch('components/footer.html')
                .then(response => response.text())
                .then(html => {
                    footerPlaceholder.innerHTML = html;
                    // Setup newsletter form after footer loads
                    this.setupNewsletterForm();
                })
                .catch(err => {
                    console.log('Footer component not found, using inline footer');
                });
        } else {
            // Setup newsletter form if footer already exists
            this.setupNewsletterForm();
        }
    },

    // Setup Newsletter Form
    setupNewsletterForm: function() {
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                if (email) {
                    App.showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
                    this.reset();
                    
                    // Store subscription (in real app, this would send to backend)
                    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
                    if (!subscribers.includes(email)) {
                        subscribers.push(email);
                        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
                    }
                }
            });
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    App.init();
    App.loadFooter();
});

// Export for use in other scripts
window.App = App;
