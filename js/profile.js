// Profile Page JavaScript

// Tab Navigation
function setupTabNavigation() {
    const navLinks = document.querySelectorAll('.sidebar .nav-link[data-tab]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Switch between tabs
function switchTab(tabName) {
    // Hide all tabs
    const allTabs = document.querySelectorAll('#profileTabs .tab-pane');
    allTabs.forEach(tab => {
        tab.classList.remove('active', 'd-block');
        tab.classList.add('d-none');
    });
    
    // Show selected tab
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.classList.remove('d-none');
        targetTab.classList.add('active', 'd-block');
    }
    
    // Update sidebar active state
    const navLinks = document.querySelectorAll('.sidebar .nav-link[data-tab]');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-tab') === tabName) {
            link.classList.add('active');
        }
    });
}

// Profile Form Submission
function setupProfileForm() {
    const form = document.getElementById('profileForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const location = document.getElementById('location').value;
        const bio = document.getElementById('bio').value;
        
        // Get additional form values
        const dob = document.getElementById('dob').value;
        const gender = document.getElementById('gender').value;
        
        // Save to localStorage
        const profileData = {
            firstName,
            lastName,
            email,
            phone,
            location,
            bio,
            dob,
            gender
        };
        saveProfileData(profileData);
        
        // Update display values
        document.getElementById('displayName').textContent = `${firstName} ${lastName}`;
        document.getElementById('profileName').textContent = `${firstName} ${lastName}`;
        document.getElementById('displayEmail').textContent = email;
        document.getElementById('displayPhone').textContent = phone || 'Not provided';
        document.getElementById('displayLocation').textContent = location || 'Not provided';
        document.getElementById('displayBio').textContent = bio || 'No bio available.';
        
        // Show success message
        if (typeof App !== 'undefined' && App.showNotification) {
            App.showNotification('Profile updated successfully!', 'success');
        } else {
            alert('Profile updated successfully!');
        }
        
        // Switch back to overview
        setTimeout(() => {
            switchTab('overview');
        }, 1500);
    });
}

// Image Upload
function setupImageUpload() {
    const imageUpload = document.getElementById('imageUpload');
    const profileImage = document.getElementById('profileImage');
    
    if (!imageUpload || !profileImage) return;
    
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                if (typeof App !== 'undefined' && App.showNotification) {
                    App.showNotification('Profile picture updated!', 'success');
                }
            };
            reader.readAsDataURL(file);
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setupTabNavigation();
    setupProfileForm();
    setupImageUpload();
    
    // Load profile data from localStorage or use defaults
    loadProfileData();
});

// Load profile data
function loadProfileData() {
    // In a real application, this would fetch from an API
    // For now, we'll use the default values or localStorage
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            // Update display values
            if (document.getElementById('displayName')) {
                document.getElementById('displayName').textContent = `${data.firstName || 'John'} ${data.lastName || 'Doe'}`;
                document.getElementById('profileName').textContent = `${data.firstName || 'John'} ${data.lastName || 'Doe'}`;
                document.getElementById('displayEmail').textContent = data.email || 'john.doe@example.com';
                document.getElementById('displayPhone').textContent = data.phone || 'Not provided';
                document.getElementById('displayLocation').textContent = data.location || 'Not provided';
                document.getElementById('displayBio').textContent = data.bio || 'No bio available.';
            }
            // Populate form fields if on edit tab
            if (document.getElementById('firstName')) {
                document.getElementById('firstName').value = data.firstName || 'John';
                document.getElementById('lastName').value = data.lastName || 'Doe';
                document.getElementById('email').value = data.email || 'john.doe@example.com';
                document.getElementById('phone').value = data.phone || '+1 (555) 123-4567';
                document.getElementById('location').value = data.location || 'New York, USA';
                document.getElementById('bio').value = data.bio || 'Student passionate about learning new skills.';
                if (data.dob) document.getElementById('dob').value = data.dob;
                if (data.gender) document.getElementById('gender').value = data.gender;
            }
        } catch (e) {
            console.error('Error loading profile data:', e);
        }
    }
}

// Save profile data (called on form submit)
function saveProfileData(data) {
    localStorage.setItem('profileData', JSON.stringify(data));
}

// Export functions for global access
window.switchTab = switchTab;
