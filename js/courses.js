// Courses Page JavaScript

// Extended courses data (for demo purposes)
const allCoursesData = [
    ...window.coursesData || [],
    {
        id: 7,
        title: 'Machine Learning Fundamentals',
        instructor: 'Andrew Ng',
        rating: 4.9,
        students: 156000,
        price: 119.99,
        originalPrice: 249.99,
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
        category: 'Data Science',
        level: 'Intermediate',
        duration: '60 hours'
    },
    {
        id: 8,
        title: 'Figma UI/UX Design Mastery',
        instructor: 'Daniel Walter Scott',
        rating: 4.7,
        students: 78000,
        price: 74.99,
        originalPrice: 169.99,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
        category: 'Design',
        level: 'Beginner',
        duration: '30 hours'
    },
    {
        id: 9,
        title: 'AWS Cloud Architecture',
        instructor: 'Stephane Maarek',
        rating: 4.8,
        students: 92000,
        price: 99.99,
        originalPrice: 199.99,
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
        category: 'Business',
        level: 'Advanced',
        duration: '45 hours'
    },
    {
        id: 10,
        title: 'Digital Marketing Complete Course',
        instructor: 'Phil Ebiner',
        rating: 4.6,
        students: 65000,
        price: 69.99,
        originalPrice: 159.99,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
        category: 'Marketing',
        level: 'Beginner',
        duration: '25 hours'
    },
    {
        id: 11,
        title: 'Vue.js Complete Guide',
        instructor: 'Maximilian Schwarzmüller',
        rating: 4.8,
        students: 88000,
        price: 89.99,
        originalPrice: 189.99,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
        category: 'Web Development',
        level: 'Intermediate',
        duration: '50 hours'
    },
    {
        id: 12,
        title: 'Photography Masterclass',
        instructor: 'Phil Ebiner',
        rating: 4.5,
        students: 45000,
        price: 59.99,
        originalPrice: 149.99,
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400',
        category: 'Design',
        level: 'All Levels',
        duration: '22 hours'
    }
];

// Store in global scope
if (!window.coursesData) {
    window.coursesData = allCoursesData;
} else {
    window.coursesData = [...window.coursesData, ...allCoursesData.filter(c => 
        !window.coursesData.find(existing => existing.id === c.id)
    )];
}

let filteredCourses = [...window.coursesData];
let currentPage = 1;
const coursesPerPage = 9;
let currentView = 'grid';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const category = urlParams.get('category');

    if (searchQuery) {
        document.getElementById('searchInput').value = searchQuery;
        filterBySearch(searchQuery);
    }

    if (category) {
        document.getElementById(`cat-${category}`).checked = true;
        filterByCategory(category);
    }

    renderCourses();
    setupEventListeners();
    updateCourseCount();
});

// Setup Event Listeners
function setupEventListeners() {
    // Search
    document.getElementById('searchInput').addEventListener('input', function(e) {
        filterBySearch(e.target.value);
        renderCourses();
    });

    // Category filters
    document.querySelectorAll('.filter-category').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.value === 'all' && this.checked) {
                document.querySelectorAll('.filter-category').forEach(cb => {
                    if (cb.value !== 'all') cb.checked = false;
                });
                filteredCourses = [...window.coursesData];
            } else if (this.checked) {
                document.getElementById('cat-all').checked = false;
                filterByCategory(this.value);
            }
            renderCourses();
            updateCourseCount();
        });
    });

    // Price filters
    document.querySelectorAll('.filter-price').forEach(radio => {
        radio.addEventListener('change', function() {
            filterByPrice(this.value);
            renderCourses();
            updateCourseCount();
        });
    });

    // Level filters
    document.querySelectorAll('.filter-level').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            filterByLevel();
            renderCourses();
            updateCourseCount();
        });
    });

    // Rating filter
    document.getElementById('ratingFilter').addEventListener('change', function() {
        filterByRating(parseFloat(this.value));
        renderCourses();
        updateCourseCount();
    });

    // Sort
    document.getElementById('sortSelect').addEventListener('change', function() {
        sortCourses(this.value);
        renderCourses();
    });

    // View toggle
    document.getElementById('gridView').addEventListener('click', function() {
        currentView = 'grid';
        this.classList.add('active');
        document.getElementById('listView').classList.remove('active');
        renderCourses();
    });

    document.getElementById('listView').addEventListener('click', function() {
        currentView = 'list';
        this.classList.add('active');
        document.getElementById('gridView').classList.remove('active');
        renderCourses();
    });

    // Reset filters
    document.getElementById('resetFilters').addEventListener('click', function() {
        resetFilters();
        renderCourses();
        updateCourseCount();
    });
}

// Filter Functions
function filterBySearch(query) {
    if (!query) {
        filteredCourses = [...window.coursesData];
        return;
    }
    filteredCourses = window.coursesData.filter(course =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.instructor.toLowerCase().includes(query.toLowerCase()) ||
        course.category.toLowerCase().includes(query.toLowerCase())
    );
    currentPage = 1;
    updateCourseCount();
}

function filterByCategory(category) {
    filteredCourses = window.coursesData.filter(course =>
        course.category.toLowerCase() === category.toLowerCase()
    );
    currentPage = 1;
    updateCourseCount();
}

function filterByPrice(priceType) {
    if (priceType === 'all') {
        filteredCourses = [...window.coursesData];
        return;
    }
    
    const activeCategory = Array.from(document.querySelectorAll('.filter-category:checked'))
        .map(cb => cb.value).filter(v => v !== 'all');
    
    let base = activeCategory.length > 0 
        ? window.coursesData.filter(c => activeCategory.includes(c.category.toLowerCase()))
        : [...window.coursesData];
    
    if (priceType === 'free') {
        filteredCourses = base.filter(c => c.price === 0);
    } else if (priceType === 'paid') {
        filteredCourses = base.filter(c => c.price > 0);
    } else if (priceType === 'discount') {
        filteredCourses = base.filter(c => c.price < c.originalPrice);
    }
    currentPage = 1;
    updateCourseCount();
}

function filterByLevel() {
    const selectedLevels = Array.from(document.querySelectorAll('.filter-level:checked'))
        .map(cb => cb.value);
    
    if (selectedLevels.length === 0) {
        return;
    }
    
    filteredCourses = filteredCourses.filter(course =>
        selectedLevels.some(level => 
            course.level.toLowerCase().includes(level.toLowerCase())
        )
    );
    currentPage = 1;
    updateCourseCount();
}

function filterByRating(minRating) {
    if (minRating === 0) return;
    filteredCourses = filteredCourses.filter(course => course.rating >= minRating);
    currentPage = 1;
    updateCourseCount();
}

function sortCourses(sortType) {
    switch(sortType) {
        case 'popular':
            filteredCourses.sort((a, b) => b.students - a.students);
            break;
        case 'rating':
            filteredCourses.sort((a, b) => b.rating - a.rating);
            break;
        case 'price-low':
            filteredCourses.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredCourses.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredCourses.sort((a, b) => b.id - a.id);
            break;
    }
    currentPage = 1;
}

function resetFilters() {
    document.querySelectorAll('.filter-category').forEach(cb => {
        cb.checked = cb.value === 'all';
    });
    document.querySelectorAll('.filter-price').forEach(rb => {
        rb.checked = rb.value === 'all';
    });
    document.querySelectorAll('.filter-level').forEach(cb => {
        cb.checked = false;
    });
    document.getElementById('ratingFilter').value = '0';
    document.getElementById('searchInput').value = '';
    filteredCourses = [...window.coursesData];
    currentPage = 1;
    updateCourseCount();
}

// Render Functions
function renderCourses() {
    const container = document.getElementById('coursesContainer');
    if (!container) return;

    const start = (currentPage - 1) * coursesPerPage;
    const end = start + coursesPerPage;
    const coursesToShow = filteredCourses.slice(start, end);

    if (currentView === 'grid') {
        container.className = 'row g-4';
        container.innerHTML = coursesToShow.map(course => createCourseCard(course)).join('');
    } else {
        container.className = 'row g-3';
        container.innerHTML = coursesToShow.map(course => createCourseListItem(course)).join('');
    }

    // Add event listeners
    setupCourseCardListeners();
    renderPagination();
}

function createCourseCard(course) {
    const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
    const isInWishlist = App.isInWishlist(course.id);
    
    return `
        <div class="col-md-4">
            <div class="course-card card border-0 shadow-sm h-100">
                <div class="position-relative">
                    <img src="${course.image}" class="card-img-top" alt="${course.title}">
                    ${discount > 0 ? `<span class="course-badge">${discount}% OFF</span>` : ''}
                    <button class="btn btn-sm btn-light position-absolute bottom-0 end-0 m-2 rounded-circle wishlist-btn" 
                            data-course-id="${course.id}">
                        <i class="bi bi-heart${isInWishlist ? '-fill text-danger' : ''}"></i>
                    </button>
                </div>
                <div class="card-body">
                    <span class="badge bg-primary mb-2">${course.category}</span>
                    <h5 class="card-title fw-bold">${course.title}</h5>
                    <p class="text-muted small mb-2">${course.instructor}</p>
                    <div class="d-flex align-items-center mb-2">
                        <span class="text-warning me-1">${course.rating}</span>
                        ${generateStars(course.rating)}
                        <span class="text-muted small ms-2">(${formatNumber(course.students)})</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <div>
                            <span class="fw-bold text-primary fs-5">$${course.price}</span>
                            ${course.originalPrice > course.price ? 
                                `<span class="text-muted text-decoration-line-through ms-2">$${course.originalPrice}</span>` : ''
                            }
                        </div>
                        <a href="course-detail.html?id=${course.id}" class="btn btn-primary btn-sm">View</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createCourseListItem(course) {
    const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
    const isInWishlist = App.isInWishlist(course.id);
    
    return `
        <div class="col-12">
            <div class="course-list-item card border-0 shadow-sm">
                <div class="row g-0">
                    <div class="col-md-3">
                        <div class="position-relative">
                            <img src="${course.image}" class="img-fluid rounded-start" alt="${course.title}" style="height: 200px; width: 100%; object-fit: cover;">
                            ${discount > 0 ? `<span class="course-badge">${discount}% OFF</span>` : ''}
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div class="flex-grow-1">
                                    <span class="badge bg-primary mb-2">${course.category}</span>
                                    <h5 class="card-title fw-bold">${course.title}</h5>
                                    <p class="text-muted mb-2">${course.instructor}</p>
                                    <div class="d-flex align-items-center mb-2">
                                        <span class="text-warning me-1">${course.rating}</span>
                                        ${generateStars(course.rating)}
                                        <span class="text-muted small ms-2">(${formatNumber(course.students)} students)</span>
                                        <span class="text-muted small ms-3"><i class="bi bi-clock"></i> ${course.duration}</span>
                                        <span class="text-muted small ms-3"><i class="bi bi-bar-chart"></i> ${course.level}</span>
                                    </div>
                                </div>
                                <div class="text-end ms-3">
                                    <button class="btn btn-sm btn-light rounded-circle wishlist-btn mb-2" 
                                            data-course-id="${course.id}">
                                        <i class="bi bi-heart${isInWishlist ? '-fill text-danger' : ''}"></i>
                                    </button>
                                    <div class="mb-2">
                                        <span class="fw-bold text-primary fs-5">$${course.price}</span>
                                        ${course.originalPrice > course.price ? 
                                            `<span class="text-muted text-decoration-line-through d-block">$${course.originalPrice}</span>` : ''
                                        }
                                    </div>
                                    <a href="course-detail.html?id=${course.id}" class="btn btn-primary btn-sm">View Course</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupCourseCardListeners() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const courseId = parseInt(this.dataset.courseId);
            const course = window.coursesData.find(c => c.id === courseId);
            
            if (App.isInWishlist(courseId)) {
                App.removeFromWishlist(courseId);
                this.querySelector('i').className = 'bi bi-heart';
            } else {
                App.addToWishlist(courseId, course.title, course.price, course.image);
                this.querySelector('i').className = 'bi bi-heart-fill text-danger';
            }
        });
    });
}

function renderPagination() {
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Previous button
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>
        </li>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }

    // Next button
    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
        </li>
    `;

    pagination.innerHTML = paginationHTML;

    // Add event listeners
    pagination.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = parseInt(this.dataset.page);
            if (page && page !== currentPage && page >= 1 && page <= totalPages) {
                currentPage = page;
                renderCourses();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

function updateCourseCount() {
    const countElement = document.getElementById('courseCount');
    if (countElement) {
        countElement.textContent = filteredCourses.length;
    }
}

// Helper functions (reuse from home.js)
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

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

