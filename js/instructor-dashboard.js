// Instructor Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    setupTabNavigation();
    loadInstructorCourses();
    setupForms();
});

function setupTabNavigation() {
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.dataset.tab;
            
            document.querySelectorAll('.sidebar .nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.add('d-none'));
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.remove('d-none');
            }
        });
    });
}

function loadInstructorCourses() {
    const courses = [
        {
            id: 1,
            title: 'Complete Web Development Bootcamp',
            students: 125000,
            rating: 4.7,
            price: 89.99,
            status: 'Published',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400'
        },
        {
            id: 2,
            title: 'Advanced JavaScript Concepts',
            students: 89000,
            rating: 4.8,
            price: 94.99,
            status: 'Published',
            image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400'
        }
    ];

    const container = document.getElementById('instructorCourses');
    if (!container) return;

    container.innerHTML = courses.map(course => `
        <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${course.image}" class="img-fluid rounded-start" alt="${course.title}" style="height: 100%; object-fit: cover;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${course.title}</h5>
                            <div class="d-flex gap-3 mb-2 small text-muted">
                                <span><i class="bi bi-people"></i> ${formatNumber(course.students)}</span>
                                <span><i class="bi bi-star-fill text-warning"></i> ${course.rating}</span>
                                <span class="badge bg-success">${course.status}</span>
                            </div>
                            <div class="d-flex gap-2">
                                <a href="course-detail.html?id=${course.id}" class="btn btn-sm btn-outline-primary">View</a>
                                <a href="edit-course.html?id=${course.id}" class="btn btn-sm btn-outline-secondary">Edit</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function setupForms() {
    document.getElementById('createCourseForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        App.showNotification('Course created successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'edit-course.html';
        }, 1500);
    });

    document.getElementById('withdrawalForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        App.showNotification('Withdrawal request submitted!', 'success');
    });

    document.getElementById('announcementForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        App.showNotification('Announcement sent successfully!', 'success');
        this.reset();
    });

    document.getElementById('instructorSettingsForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        App.showNotification('Settings saved successfully!', 'success');
    });
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

