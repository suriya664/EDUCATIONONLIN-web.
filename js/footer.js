// Footer Component Loader
// This script loads the complete footer on all pages

function loadCompleteFooter() {
    const footerHTML = `
    <footer class="footer bg-dark text-white py-5">
        <div class="container">
            <div class="row g-4 mb-4">
                <!-- Company Info -->
                <div class="col-lg-3 col-md-6">
                    <h5 class="fw-bold mb-3">
                        <i class="bi bi-mortarboard-fill text-primary"></i> EduMaster
                    </h5>
                    <p class="text-muted mb-3">
                        Empowering learners worldwide with quality education and skill development. Join millions of students learning new skills every day.
                    </p>
                    <div class="social-links mb-3">
                        <a href="#" class="text-white me-3" aria-label="Facebook">
                            <i class="bi bi-facebook fs-5"></i>
                        </a>
                        <a href="#" class="text-white me-3" aria-label="Twitter">
                            <i class="bi bi-twitter fs-5"></i>
                        </a>
                        <a href="#" class="text-white me-3" aria-label="LinkedIn">
                            <i class="bi bi-linkedin fs-5"></i>
                        </a>
                        <a href="#" class="text-white me-3" aria-label="Instagram">
                            <i class="bi bi-instagram fs-5"></i>
                        </a>
                        <a href="#" class="text-white me-3" aria-label="YouTube">
                            <i class="bi bi-youtube fs-5"></i>
                        </a>
                    </div>
                    <div class="download-apps">
                        <p class="small text-muted mb-2">Download Our App</p>
                        <div class="d-flex gap-2">
                            <a href="#" class="btn btn-sm btn-outline-light">
                                <i class="bi bi-apple me-1"></i> App Store
                            </a>
                            <a href="#" class="btn btn-sm btn-outline-light">
                                <i class="bi bi-google-play me-1"></i> Play Store
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="col-lg-2 col-md-6">
                    <h6 class="fw-bold mb-3">Quick Links</h6>
                    <ul class="list-unstyled footer-links">
                        <li class="mb-2">
                            <a href="index.html" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>Home
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="courses.html" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>All Courses
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="instructors.html" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>Instructors
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="about.html" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>About Us
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="contact.html" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>Contact
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="faq.html" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>FAQ
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Categories -->
                <div class="col-lg-2 col-md-6">
                    <h6 class="fw-bold mb-3">Categories</h6>
                    <ul class="list-unstyled footer-links">
                        <li class="mb-2">
                            <a href="courses.html?category=web" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>Web Development
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="courses.html?category=design" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>Design
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="courses.html?category=business" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>Business
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="courses.html?category=marketing" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>Marketing
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="courses.html?category=data" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>Data Science
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="courses.html" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>View All
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Resources -->
                <div class="col-lg-2 col-md-6">
                    <h6 class="fw-bold mb-3">Resources</h6>
                    <ul class="list-unstyled footer-links">
                        <li class="mb-2">
                            <a href="student-dashboard.html" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>Student Dashboard
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="instructor-dashboard.html" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>Teach on EduMaster
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="#" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>Blog
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="#" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>Careers
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="#" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>Affiliate Program
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="admin-dashboard.html" class="text-muted text-decoration-none">
                                <i class="bi bi-chevron-right small me-1"></i>Admin Portal
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Contact & Newsletter -->
                <div class="col-lg-3 col-md-6">
                    <h6 class="fw-bold mb-3">Get in Touch</h6>
                    <ul class="list-unstyled mb-4">
                        <li class="mb-2 text-muted">
                            <i class="bi bi-geo-alt text-primary me-2"></i>
                            123 Education Street, Learning City, LC 12345
                        </li>
                        <li class="mb-2">
                            <a href="mailto:support@edumaster.com" class="text-muted text-decoration-none">
                                <i class="bi bi-envelope text-primary me-2"></i>support@edumaster.com
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="tel:+15551234567" class="text-muted text-decoration-none">
                                <i class="bi bi-phone text-primary me-2"></i>+1 (555) 123-4567
                            </a>
                        </li>
                        <li class="mb-2 text-muted">
                            <i class="bi bi-clock text-primary me-2"></i>Mon - Fri: 9:00 AM - 6:00 PM
                        </li>
                    </ul>

                    <h6 class="fw-bold mb-3">Newsletter</h6>
                    <p class="text-muted small mb-2">Subscribe to get updates on new courses and exclusive offers.</p>
                    <form id="newsletterForm" class="mb-3">
                        <div class="input-group input-group-sm">
                            <input type="email" class="form-control" placeholder="Enter your email" required>
                            <button class="btn btn-primary" type="submit">
                                <i class="bi bi-send"></i>
                            </button>
                        </div>
                    </form>
                    <p class="small text-muted mb-0">We respect your privacy. Unsubscribe at any time.</p>
                </div>
            </div>

            <!-- Legal & Payment -->
            <hr class="my-4 bg-secondary">
            <div class="row g-3 align-items-center">
                <div class="col-lg-6 col-md-6">
                    <div class="d-flex flex-wrap gap-3 footer-links">
                        <a href="privacy.html" class="text-muted text-decoration-none small">Privacy Policy</a>
                        <a href="terms.html" class="text-muted text-decoration-none small">Terms & Conditions</a>
                        <a href="refund.html" class="text-muted text-decoration-none small">Refund Policy</a>
                        <a href="contact.html" class="text-muted text-decoration-none small">Contact Us</a>
                        <a href="faq.html" class="text-muted text-decoration-none small">FAQ</a>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 text-md-end">
                    <div class="payment-methods mb-2">
                        <span class="small text-muted me-2">We Accept:</span>
                        <i class="bi bi-credit-card text-muted me-2" title="Credit Cards"></i>
                        <i class="bi bi-paypal text-muted me-2" title="PayPal"></i>
                        <i class="bi bi-wallet2 text-muted me-2" title="Digital Wallets"></i>
                        <span class="badge bg-success small">Secure Payments</span>
                    </div>
                    <p class="small text-muted mb-0">
                        &copy; 2025 EduMaster. All rights reserved.
                    </p>
                </div>
            </div>

            <!-- Additional Info -->
            <div class="row mt-3">
                <div class="col-12">
                    <div class="text-center">
                        <p class="small text-muted mb-0">
                            <i class="bi bi-shield-check text-success me-1"></i>
                            SSL Secured | 
                            <i class="bi bi-award text-warning me-1"></i>
                            Trusted by 5M+ Students | 
                            <i class="bi bi-globe text-info me-1"></i>
                            Available in 50+ Countries
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    `;

    // Find existing footer or placeholder
    const existingFooter = document.querySelector('footer.footer');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = footerHTML;
    } else if (existingFooter && existingFooter.innerHTML.trim().length < 500) {
        // Replace simple footer with complete one
        existingFooter.outerHTML = footerHTML;
    }

    // Setup newsletter form after footer loads
    setTimeout(() => {
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm && !newsletterForm.dataset.setup) {
            newsletterForm.dataset.setup = 'true';
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                if (email) {
                    if (window.App && window.App.showNotification) {
                        window.App.showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
                    } else {
                        alert('Thank you for subscribing!');
                    }
                    this.reset();
                    
                    // Store subscription
                    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
                    if (!subscribers.includes(email)) {
                        subscribers.push(email);
                        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
                    }
                }
            });
        }
    }, 100);
}

// Auto-load footer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCompleteFooter);
} else {
    loadCompleteFooter();
}

