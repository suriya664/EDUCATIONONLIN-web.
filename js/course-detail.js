// Course Detail Page JavaScript

let currentCourse = null;
let selectedRating = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Get course ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id')) || 1;

    // Load course data
    loadCourseData(courseId);
    setupEventListeners();
    renderReviews();
});

function loadCourseData(courseId) {
    // Default course data (will be used if coursesData is not available)
    const defaultCourse = {
        id: 1,
        title: 'Complete Web Development Bootcamp',
        instructor: 'Angela Yu',
        rating: 4.7,
        students: 125000,
        price: 89.99,
        originalPrice: 199.99,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
        category: 'Web Development',
        level: 'Beginner',
        duration: '55 hours',
        description: 'This comprehensive course will take you from absolute beginner to confident web developer. You\'ll learn HTML, CSS, JavaScript, React, Node.js, MongoDB and much more through hands-on projects.'
    };

    // Try to find course in coursesData, otherwise use default
    let course = defaultCourse;
    
    if (window.coursesData && Array.isArray(window.coursesData)) {
        const foundCourse = window.coursesData.find(c => c.id === courseId);
        if (foundCourse) {
            course = foundCourse;
        }
    }
    
    // Also check if courses data is loaded from home.js
    if (typeof popularCoursesData !== 'undefined' && Array.isArray(popularCoursesData)) {
        const foundCourse = popularCoursesData.find(c => c.id === courseId);
        if (foundCourse) {
            course = foundCourse;
        }
    }

    currentCourse = course;
    renderCourseDetails(course);
    
    // Update course image if available
    if (course.image && document.querySelector('.course-image img')) {
        document.querySelector('.course-image img').src = course.image;
    }
}

function renderCourseDetails(course) {
    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('courseCategory').textContent = course.category;
    document.getElementById('courseRating').textContent = course.rating;
    document.getElementById('studentCount').textContent = formatNumber(course.students);
    document.getElementById('courseDuration').textContent = course.duration;
    document.getElementById('courseLevel').textContent = course.level;
    document.getElementById('instructorName').textContent = course.instructor;
    document.getElementById('coursePrice').textContent = `$${course.price}`;
    document.getElementById('originalPrice').textContent = `$${course.originalPrice}`;
    document.getElementById('courseDescription').textContent = course.description || 'Learn from the best instructors in the industry.';

    // Generate stars
    const starsHTML = generateStars(course.rating);
    document.getElementById('courseStars').innerHTML = starsHTML;

    // Check wishlist status
    const isInWishlist = App.isInWishlist(course.id);
    const wishlistBtn = document.getElementById('wishlistBtn');
    if (isInWishlist) {
        wishlistBtn.innerHTML = '<i class="bi bi-heart-fill me-2"></i>Remove from Wishlist';
        wishlistBtn.classList.remove('btn-outline-danger');
        wishlistBtn.classList.add('btn-danger');
    }

    // Discount badge
    const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
    document.getElementById('discountBadge').textContent = `${discount}% OFF`;
}

function setupEventListeners() {
    // Enroll/Add to Cart button
    document.getElementById('enrollBtn').addEventListener('click', function() {
        if (currentCourse) {
            App.addToCart(
                currentCourse.id,
                currentCourse.title,
                currentCourse.price,
                currentCourse.image
            );
            this.innerHTML = '<i class="bi bi-check-circle me-2"></i>Added to Cart';
            this.classList.remove('btn-primary');
            this.classList.add('btn-success');
            setTimeout(() => {
                this.innerHTML = '<i class="bi bi-cart-plus me-2"></i>Add to Cart';
                this.classList.remove('btn-success');
                this.classList.add('btn-primary');
            }, 2000);
        }
    });

    // Wishlist button
    document.getElementById('wishlistBtn').addEventListener('click', function() {
        if (currentCourse) {
            const isInWishlist = App.isInWishlist(currentCourse.id);
            if (isInWishlist) {
                App.removeFromWishlist(currentCourse.id);
                this.innerHTML = '<i class="bi bi-heart me-2"></i>Add to Wishlist';
                this.classList.remove('btn-danger');
                this.classList.add('btn-outline-danger');
            } else {
                App.addToWishlist(
                    currentCourse.id,
                    currentCourse.title,
                    currentCourse.price,
                    currentCourse.image
                );
                this.innerHTML = '<i class="bi bi-heart-fill me-2"></i>Remove from Wishlist';
                this.classList.remove('btn-outline-danger');
                this.classList.add('btn-danger');
            }
        }
    });

    // Rating input
    document.querySelectorAll('.rating-input i').forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.rating);
            updateRatingDisplay(selectedRating);
        });
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
        });
    });

    document.querySelector('.rating-input').addEventListener('mouseleave', function() {
        if (selectedRating > 0) {
            highlightStars(selectedRating);
        } else {
            highlightStars(0);
        }
    });

    // Review form
    document.getElementById('reviewForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        if (selectedRating === 0) {
            App.showNotification('Please select a rating', 'warning');
            return;
        }
        App.showNotification('Review submitted successfully!', 'success');
        bootstrap.Modal.getInstance(document.getElementById('reviewModal')).hide();
        this.reset();
        selectedRating = 0;
        updateRatingDisplay(0);
    });
}

function updateRatingDisplay(rating) {
    document.querySelectorAll('.rating-input i').forEach((star, index) => {
        if (index < rating) {
            star.className = 'bi bi-star-fill fs-3 text-warning';
            star.classList.add('active');
        } else {
            star.className = 'bi bi-star fs-3 text-warning';
            star.classList.remove('active');
        }
    });
}

function highlightStars(rating) {
    document.querySelectorAll('.rating-input i').forEach((star, index) => {
        if (index < rating) {
            star.className = 'bi bi-star-fill fs-3 text-warning';
        } else {
            star.className = 'bi bi-star fs-3 text-warning';
        }
    });
}

function renderReviews() {
    const reviews = [
        {
            id: 1,
            user: 'John Doe',
            rating: 5,
            title: 'Excellent Course!',
            content: 'This course exceeded my expectations. The instructor explains everything clearly and the projects are very practical.',
            date: '2 weeks ago',
            helpful: 234
        },
        {
            id: 2,
            user: 'Sarah Smith',
            rating: 5,
            title: 'Best Web Development Course',
            content: 'I learned so much from this course. Highly recommend to anyone starting their web development journey.',
            date: '1 month ago',
            helpful: 189
        },
        {
            id: 3,
            user: 'Mike Johnson',
            rating: 4,
            title: 'Great content, fast pace',
            content: 'The content is excellent, though sometimes the pace is a bit fast. Overall, a great learning experience.',
            date: '2 months ago',
            helpful: 156
        }
    ];

    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;

    reviewsList.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header d-flex justify-content-between align-items-start mb-3">
                <div>
                    <h6 class="fw-bold mb-1">${review.user}</h6>
                    <div class="d-flex align-items-center mb-2">
                        ${generateStars(review.rating)}
                        <span class="text-muted small ms-2">${review.date}</span>
                    </div>
                </div>
                <button class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-flag"></i>
                </button>
            </div>
            <h6 class="fw-bold mb-2">${review.title}</h6>
            <p class="text-muted mb-3">${review.content}</p>
            <div class="d-flex align-items-center">
                <button class="btn btn-sm btn-link text-decoration-none">
                    <i class="bi bi-hand-thumbs-up me-1"></i>Helpful (${review.helpful})
                </button>
                <button class="btn btn-sm btn-link text-decoration-none ms-3">
                    <i class="bi bi-hand-thumbs-down me-1"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) {
            stars += '<i class="bi bi-star-fill text-warning"></i>';
        } else if (i < rating) {
            stars += '<i class="bi bi-star-half text-warning"></i>';
        } else {
            stars += '<i class="bi bi-star text-warning"></i>';
        }
    }
    return stars;
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}
