// Authentication JavaScript

// Toggle Password Visibility
document.addEventListener('DOMContentLoaded', function() {
    // Student Login Password Toggle
    const toggleStudentPassword = document.getElementById('toggleStudentPassword');
    const studentPassword = document.getElementById('studentPassword');
    if (toggleStudentPassword && studentPassword) {
        toggleStudentPassword.addEventListener('click', function() {
            const type = studentPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            studentPassword.setAttribute('type', type);
            this.querySelector('i').classList.toggle('bi-eye');
            this.querySelector('i').classList.toggle('bi-eye-slash');
        });
    }

    // Instructor Login Password Toggle
    const toggleInstructorPassword = document.getElementById('toggleInstructorPassword');
    const instructorPassword = document.getElementById('instructorPassword');
    if (toggleInstructorPassword && instructorPassword) {
        toggleInstructorPassword.addEventListener('click', function() {
            const type = instructorPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            instructorPassword.setAttribute('type', type);
            this.querySelector('i').classList.toggle('bi-eye');
            this.querySelector('i').classList.toggle('bi-eye-slash');
        });
    }

    // Student Signup Password Toggle
    const toggleStudentSignupPassword = document.getElementById('toggleStudentSignupPassword');
    const studentSignupPassword = document.getElementById('studentSignupPassword');
    if (toggleStudentSignupPassword && studentSignupPassword) {
        toggleStudentSignupPassword.addEventListener('click', function() {
            const type = studentSignupPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            studentSignupPassword.setAttribute('type', type);
            this.querySelector('i').classList.toggle('bi-eye');
            this.querySelector('i').classList.toggle('bi-eye-slash');
        });
    }

    // Instructor Signup Password Toggle
    const toggleInstructorSignupPassword = document.getElementById('toggleInstructorSignupPassword');
    const instructorSignupPassword = document.getElementById('instructorSignupPassword');
    if (toggleInstructorSignupPassword && instructorSignupPassword) {
        toggleInstructorSignupPassword.addEventListener('click', function() {
            const type = instructorSignupPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            instructorSignupPassword.setAttribute('type', type);
            this.querySelector('i').classList.toggle('bi-eye');
            this.querySelector('i').classList.toggle('bi-eye-slash');
        });
    }

    // Form Submissions
    const studentLoginForm = document.getElementById('studentLoginForm');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate login
            localStorage.setItem('userType', 'student');
            localStorage.setItem('isLoggedIn', 'true');
            App.showNotification('Login successful!', 'success');
            setTimeout(() => {
                window.location.href = 'student-dashboard.html';
            }, 1000);
        });
    }

    const instructorLoginForm = document.getElementById('instructorLoginForm');
    if (instructorLoginForm) {
        instructorLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            localStorage.setItem('userType', 'instructor');
            localStorage.setItem('isLoggedIn', 'true');
            App.showNotification('Login successful!', 'success');
            setTimeout(() => {
                window.location.href = 'instructor-dashboard.html';
            }, 1000);
        });
    }

    const studentSignupForm = document.getElementById('studentSignupForm');
    if (studentSignupForm) {
        studentSignupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            App.showNotification('Account created successfully!', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    const instructorSignupForm = document.getElementById('instructorSignupForm');
    if (instructorSignupForm) {
        instructorSignupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            App.showNotification('Instructor account created successfully!', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    // Check URL parameters for instructor signup
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('type') === 'instructor') {
        const instructorTab = document.getElementById('instructor-signup-tab');
        if (instructorTab) {
            const tab = new bootstrap.Tab(instructorTab);
            tab.show();
        }
    }
});

