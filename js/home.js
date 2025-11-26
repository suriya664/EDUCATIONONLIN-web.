// Home Page Specific JavaScript

// Sample Courses Data
const popularCoursesData = [
    {
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
        duration: '55 hours'
    },
    {
        id: 2,
        title: 'Python for Data Science & Machine Learning',
        instructor: 'Jose Portilla',
        rating: 4.8,
        students: 89000,
        price: 94.99,
        originalPrice: 194.99,
        image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400',
        category: 'Data Science',
        level: 'Intermediate',
        duration: '42 hours'
    },
    {
        id: 3,
        title: 'UI/UX Design Masterclass',
        instructor: 'Daniel Walter Scott',
        rating: 4.6,
        students: 67000,
        price: 79.99,
        originalPrice: 179.99,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
        category: 'Design',
        level: 'Beginner',
        duration: '35 hours'
    },
    {
        id: 4,
        title: 'Digital Marketing Mastery',
        instructor: 'Phil Ebiner',
        rating: 4.5,
        students: 54000,
        price: 69.99,
        originalPrice: 159.99,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
        category: 'Marketing',
        level: 'All Levels',
        duration: '28 hours'
    },
    {
        id: 5,
        title: 'Advanced JavaScript Concepts',
        instructor: 'Brad Traversy',
        rating: 4.9,
        students: 98000,
        price: 84.99,
        originalPrice: 189.99,
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400',
        category: 'Web Development',
        level: 'Advanced',
        duration: '48 hours'
    },
    {
        id: 6,
        title: 'Complete React Developer Course',
        instructor: 'Andrei Neagoie',
        rating: 4.8,
        students: 112000,
        price: 99.99,
        originalPrice: 199.99,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
        category: 'Web Development',
        level: 'Intermediate',
        duration: '52 hours'
    }
];

// Sample Instructors Data
const trendingInstructorsData = [
    {
        id: 1,
        name: 'Angela Yu',
        title: 'Lead Instructor',
        students: 1250000,
        courses: 12,
        rating: 4.8,
        image: 'https://ui-avatars.com/api/?name=Angela+Yu&size=200&background=6366f1&color=fff'
    },
    {
        id: 2,
        name: 'Jose Portilla',
        title: 'Data Science Expert',
        students: 890000,
        courses: 8,
        rating: 4.9,
        image: 'https://ui-avatars.com/api/?name=Jose+Portilla&size=200&background=8b5cf6&color=fff'
    },
    {
        id: 3,
        name: 'Brad Traversy',
        title: 'Full Stack Developer',
        students: 760000,
        courses: 15,
        rating: 4.7,
        image: 'https://ui-avatars.com/api/?name=Brad+Traversy&size=200&background=10b981&color=fff'
    },
    {
        id: 4,
        name: 'Daniel Walter Scott',
        title: 'Design Master',
        students: 540000,
        courses: 10,
        rating: 4.6,
        image: 'https://ui-avatars.com/api/?name=Daniel+Scott&size=200&background=f59e0b&color=fff'
    }
];

// Store courses data globally for search functionality
window.coursesData = popularCoursesData;

// Render Popular Courses
function renderPopularCourses() {
    const container = document.getElementById('popularCourses');
    if (!container) return;

    container.innerHTML = popularCoursesData.slice(0, 6).map(course => `
        <div class="col-lg-4 col-md-6">
            <div class="course-card card border-0 shadow-sm h-100 d-flex flex-column">
                <div class="position-relative">
                    <img src="${course.image}" class="card-img-top" alt="${course.title}" style="height: 200px; object-fit: cover;">
                    <span class="course-badge">${Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF</span>
                    <button class="btn btn-sm btn-light position-absolute bottom-0 end-0 m-2 rounded-circle wishlist-btn" 
                            data-course-id="${course.id}" 
                            data-bs-toggle="tooltip" 
                            title="Add to wishlist">
                        <i class="bi bi-heart"></i>
                    </button>
                </div>
                <div class="card-body d-flex flex-column flex-grow-1">
                    <span class="badge bg-primary mb-2">${course.category}</span>
                    <h5 class="card-title fw-bold">${course.title}</h5>
                    <p class="text-muted small mb-2">${course.instructor}</p>
                    <div class="d-flex align-items-center mb-3">
                        <span class="text-warning me-1 fw-bold">${course.rating}</span>
                        <div class="rating me-2">
                            ${generateStars(course.rating)}
                        </div>
                        <span class="text-muted small">(${formatNumber(course.students)})</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                        <div class="d-flex flex-column">
                            <span class="fw-bold text-primary fs-5">$${course.price}</span>
                            <span class="text-muted text-decoration-line-through small">$${course.originalPrice}</span>
                        </div>
                        <a href="course-detail.html?id=${course.id}" class="btn btn-primary btn-sm">View</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners for wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const courseId = parseInt(this.dataset.courseId);
            const course = popularCoursesData.find(c => c.id === courseId);
            
            if (App.isInWishlist(courseId)) {
                App.removeFromWishlist(courseId);
                this.innerHTML = '<i class="bi bi-heart"></i>';
                this.setAttribute('title', 'Add to wishlist');
            } else {
                App.addToWishlist(courseId, course.title, course.price, course.image);
                this.innerHTML = '<i class="bi bi-heart-fill text-danger"></i>';
                this.setAttribute('title', 'Remove from wishlist');
            }
        });
    });

    // Initialize tooltips
    App.initTooltips();
}

// Render Trending Instructors
function renderTrendingInstructors() {
    const container = document.getElementById('trendingInstructors');
    if (!container) return;

    container.innerHTML = trendingInstructorsData.map(instructor => `
        <div class="col-lg-3 col-md-6">
            <div class="instructor-card card border-0 shadow-sm h-100">
                <img src="${instructor.image}" alt="${instructor.name}" class="mx-auto">
                <h5 class="fw-bold mb-1">${instructor.name}</h5>
                <p class="text-muted small mb-2">${instructor.title}</p>
                <div class="mb-2">
                    <span class="text-warning me-1">${instructor.rating}</span>
                    ${generateStars(instructor.rating)}
                </div>
                <div class="d-flex justify-content-center gap-3 small text-muted mb-3">
                    <div>
                        <i class="bi bi-people"></i> ${formatNumber(instructor.students)} students
                    </div>
                    <div>
                        <i class="bi bi-book"></i> ${instructor.courses} courses
                    </div>
                </div>
                <a href="instructor-profile.html?id=${instructor.id}" class="btn btn-outline-primary btn-sm">View Profile</a>
            </div>
        </div>
    `).join('');
}

// Generate Star Rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="bi bi-star-fill text-warning"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="bi bi-star-half text-warning"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="bi bi-star text-warning"></i>';
    }
    
    return stars;
}

// Format Number (e.g., 125000 -> 125K)
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('courseSearch');
    const searchBtn = searchInput?.nextElementSibling;
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `courses.html?search=${encodeURIComponent(query)}`;
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    window.location.href = `courses.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }

    // Newsletter Subscription
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

    // Render courses and instructors
    renderPopularCourses();
    renderTrendingInstructors();
});
