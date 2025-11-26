// Student Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    setupTabNavigation();
    loadEnrolledCourses();
    loadWishlist();
    loadProgress();
    loadCertificates();
    loadWatchHistory();
    setupSettings();
});

function setupTabNavigation() {
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.dataset.tab;
            
            // Update active states
            document.querySelectorAll('.sidebar .nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide tab content
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.add('d-none'));
            document.getElementById(targetTab).classList.remove('d-none');
        });
    });
}

function loadEnrolledCourses() {
    const enrolledCourses = [
        {
            id: 1,
            title: 'Complete Web Development Bootcamp',
            instructor: 'Angela Yu',
            progress: 65,
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
            lastAccessed: '2 days ago',
            totalLectures: 200,
            completedLectures: 130
        },
        {
            id: 5,
            title: 'Advanced JavaScript Concepts',
            instructor: 'Brad Traversy',
            progress: 45,
            image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400',
            lastAccessed: '5 days ago',
            totalLectures: 150,
            completedLectures: 68
        },
        {
            id: 2,
            title: 'Python for Data Science & Machine Learning',
            instructor: 'Jose Portilla',
            progress: 30,
            image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400',
            lastAccessed: '1 week ago',
            totalLectures: 180,
            completedLectures: 54
        }
    ];

    const container = document.getElementById('enrolledCourses');
    if (!container) return;

    container.innerHTML = enrolledCourses.map(course => `
        <div class="col-md-6 col-lg-4">
            <div class="course-card card border-0 shadow-sm h-100">
                <img src="${course.image}" class="card-img-top" alt="${course.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h6 class="card-title fw-bold">${course.title}</h6>
                    <p class="text-muted small mb-2">${course.instructor}</p>
                    <div class="mb-3">
                        <div class="d-flex justify-content-between small text-muted mb-1">
                            <span>Progress</span>
                            <span>${course.progress}%</span>
                        </div>
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar" role="progressbar" style="width: ${course.progress}%"></div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted"><i class="bi bi-clock me-1"></i>${course.lastAccessed}</small>
                        <a href="course-player.html?courseId=${course.id}" class="btn btn-primary btn-sm">Continue</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function loadWishlist() {
    const wishlist = App.wishlist || [];
    const container = document.getElementById('wishlistCourses');
    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="text-center py-5">
                    <i class="bi bi-heart fs-1 text-muted mb-3"></i>
                    <h5 class="text-muted">Your wishlist is empty</h5>
                    <a href="courses.html" class="btn btn-primary mt-3">Browse Courses</a>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = wishlist.map(course => `
        <div class="col-md-6 col-lg-4">
            <div class="course-card card border-0 shadow-sm h-100">
                <div class="position-relative">
                    <img src="${course.image}" class="card-img-top" alt="${course.title}" style="height: 200px; object-fit: cover;">
                    <button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 rounded-circle remove-wishlist" data-course-id="${course.id}">
                        <i class="bi bi-heart-fill"></i>
                    </button>
                </div>
                <div class="card-body">
                    <h6 class="card-title fw-bold">${course.title}</h6>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="fw-bold text-primary">$${course.price}</span>
                        <a href="course-detail.html?id=${course.id}" class="btn btn-primary btn-sm">View</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            const courseId = parseInt(this.dataset.courseId);
            App.removeFromWishlist(courseId);
            loadWishlist();
        });
    });
}

function loadProgress() {
    const progressData = [
        {
            courseId: 1,
            title: 'Complete Web Development Bootcamp',
            progress: 65,
            lecturesCompleted: 130,
            totalLectures: 200,
            quizzesCompleted: 8,
            totalQuizzes: 12
        },
        {
            courseId: 5,
            title: 'Advanced JavaScript Concepts',
            progress: 45,
            lecturesCompleted: 68,
            totalLectures: 150,
            quizzesCompleted: 5,
            totalQuizzes: 10
        }
    ];

    const container = document.getElementById('progressList');
    if (!container) return;

    container.innerHTML = progressData.map(course => `
        <div class="card border-0 shadow-sm mb-3">
            <div class="card-body p-4">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h5 class="fw-bold mb-2">${course.title}</h5>
                        <div class="d-flex gap-4 text-muted small">
                            <span><i class="bi bi-play-circle me-1"></i>${course.lecturesCompleted}/${course.totalLectures} Lectures</span>
                            <span><i class="bi bi-file-text me-1"></i>${course.quizzesCompleted}/${course.totalQuizzes} Quizzes</span>
                        </div>
                    </div>
                    <span class="badge bg-primary fs-6">${course.progress}%</span>
                </div>
                <div class="progress mb-3" style="height: 10px;">
                    <div class="progress-bar" role="progressbar" style="width: ${course.progress}%"></div>
                </div>
                <div class="d-flex justify-content-between">
                    <small class="text-muted">Started 2 weeks ago</small>
                    <a href="course-player.html?courseId=${course.courseId}" class="btn btn-sm btn-primary">Continue Learning</a>
                </div>
            </div>
        </div>
    `).join('');
}

function loadCertificates() {
    const certificates = [
        {
            id: 1,
            courseTitle: 'Complete Web Development Bootcamp',
            issueDate: '2024-01-15',
            certificateId: 'EDM-WD-2024-001234'
        },
        {
            id: 2,
            courseTitle: 'Advanced JavaScript Concepts',
            issueDate: '2024-02-20',
            certificateId: 'EDM-JS-2024-005678'
        }
    ];

    const container = document.getElementById('certificatesList');
    if (!container) return;

    if (certificates.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="text-center py-5">
                    <i class="bi bi-award fs-1 text-muted mb-3"></i>
                    <h5 class="text-muted">No certificates yet</h5>
                    <p class="text-muted">Complete courses to earn certificates</p>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = certificates.map(cert => `
        <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-body p-4 text-center">
                    <i class="bi bi-award-fill fs-1 text-warning mb-3"></i>
                    <h5 class="fw-bold mb-2">${cert.courseTitle}</h5>
                    <p class="text-muted mb-2">Issued: ${new Date(cert.issueDate).toLocaleDateString()}</p>
                    <p class="small text-muted mb-3">Certificate ID: ${cert.certificateId}</p>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary btn-download-certificate" data-cert-id="${cert.id}">
                            <i class="bi bi-download me-2"></i>Download PDF
                        </button>
                        <button class="btn btn-outline-primary btn-share-certificate" data-cert-id="${cert.id}">
                            <i class="bi bi-share me-2"></i>Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners
    document.querySelectorAll('.btn-download-certificate').forEach(btn => {
        btn.addEventListener('click', function() {
            App.showNotification('Certificate download started!', 'success');
        });
    });
}

function loadWatchHistory() {
    const history = [
        {
            courseTitle: 'Complete Web Development Bootcamp',
            lectureTitle: 'Introduction to HTML',
            watchedAt: '2 hours ago',
            duration: '15:30'
        },
        {
            courseTitle: 'Complete Web Development Bootcamp',
            lectureTitle: 'CSS Fundamentals',
            watchedAt: '1 day ago',
            duration: '22:15'
        },
        {
            courseTitle: 'Advanced JavaScript Concepts',
            lectureTitle: 'ES6 Features',
            watchedAt: '3 days ago',
            duration: '18:45'
        }
    ];

    const container = document.getElementById('watchHistory');
    if (!container) return;

    container.innerHTML = history.map(item => `
        <div class="card border-0 shadow-sm mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6 class="fw-bold mb-1">${item.lectureTitle}</h6>
                        <p class="text-muted small mb-1">${item.courseTitle}</p>
                        <small class="text-muted"><i class="bi bi-clock me-1"></i>${item.watchedAt} • ${item.duration}</small>
                    </div>
                    <a href="#" class="btn btn-sm btn-outline-primary">Watch Again</a>
                </div>
            </div>
        </div>
    `).join('');
}

function setupSettings() {
    document.getElementById('settingsForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        App.showNotification('Settings saved successfully!', 'success');
    });
}

