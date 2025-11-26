// Settings Page JavaScript

// Section Navigation
function setupSectionNavigation() {
    const navLinks = document.querySelectorAll('.settings-nav .nav-link[data-section]');
    const sectionTitles = {
        'account': 'Account Settings',
        'privacy': 'Privacy Settings',
        'notifications': 'Notification Settings',
        'security': 'Security Settings',
        'preferences': 'Learning Preferences',
        'billing': 'Billing & Payments',
        'appearance': 'Appearance Settings'
    };
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            switchSection(targetSection);
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update title
            const titleElement = document.getElementById('settingsTitle');
            if (titleElement && sectionTitles[targetSection]) {
                titleElement.textContent = sectionTitles[targetSection];
            }
        });
    });
}

// Switch between sections
function switchSection(sectionName) {
    // Hide all sections
    const allSections = document.querySelectorAll('#settingsSections .settings-section');
    allSections.forEach(section => {
        section.classList.remove('active', 'd-block');
        section.classList.add('d-none');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.remove('d-none');
        targetSection.classList.add('active', 'd-block');
    }
}

// Form Submissions
function setupFormSubmissions() {
    // Account Form
    const accountForm = document.getElementById('accountForm');
    if (accountForm) {
        accountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSettings('account', {
                firstName: document.getElementById('accountFirstName').value,
                lastName: document.getElementById('accountLastName').value,
                email: document.getElementById('accountEmail').value,
                username: document.getElementById('accountUsername').value,
                language: document.getElementById('accountLanguage').value,
                timezone: document.getElementById('accountTimezone').value
            });
            showNotification('Account settings saved successfully!', 'success');
        });
    }
    
    // Privacy Form
    const privacyForm = document.getElementById('privacyForm');
    if (privacyForm) {
        privacyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSettings('privacy', {
                profileVisibility: document.getElementById('profileVisibility').checked,
                showEmail: document.getElementById('showEmail').checked,
                activityStatus: document.getElementById('activityStatus').checked,
                courseProgress: document.getElementById('courseProgress').checked,
                dataSharing: document.getElementById('dataSharing').value
            });
            showNotification('Privacy settings saved successfully!', 'success');
        });
    }
    
    // Email Notifications Form
    const emailNotificationsForm = document.getElementById('emailNotificationsForm');
    if (emailNotificationsForm) {
        emailNotificationsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSettings('emailNotifications', {
                courseUpdates: document.getElementById('emailCourseUpdates').checked,
                achievements: document.getElementById('emailAchievements').checked,
                marketing: document.getElementById('emailMarketing').checked,
                weekly: document.getElementById('emailWeekly').checked
            });
            showNotification('Email notification settings saved!', 'success');
        });
    }
    
    // App Notifications Form
    const appNotificationsForm = document.getElementById('appNotificationsForm');
    if (appNotificationsForm) {
        appNotificationsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSettings('appNotifications', {
                courseUpdates: document.getElementById('appCourseUpdates').checked,
                messages: document.getElementById('appMessages').checked,
                announcements: document.getElementById('appAnnouncements').checked
            });
            showNotification('Notification settings saved!', 'success');
        });
    }
    
    // Password Form
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (newPassword !== confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }
            
            if (newPassword.length < 8) {
                showNotification('Password must be at least 8 characters long!', 'error');
                return;
            }
            
            // In a real app, this would send to the server
            showNotification('Password changed successfully!', 'success');
            passwordForm.reset();
        });
    }
    
    // Preferences Form
    const preferencesForm = document.getElementById('preferencesForm');
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSettings('preferences', {
                videoQuality: document.getElementById('videoQuality').value,
                playbackSpeed: document.getElementById('playbackSpeed').value,
                autoPlay: document.getElementById('autoPlay').checked,
                subtitles: document.getElementById('subtitles').checked,
                downloadQuality: document.getElementById('downloadQuality').value
            });
            showNotification('Preferences saved successfully!', 'success');
        });
    }
    
    // Appearance Form
    const appearanceForm = document.getElementById('appearanceForm');
    if (appearanceForm) {
        appearanceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const theme = document.querySelector('input[name="theme"]:checked').value;
            saveSettings('appearance', {
                theme: theme,
                fontSize: document.getElementById('fontSize').value,
                animations: document.getElementById('animations').checked
            });
            
            // Apply theme immediately
            applyTheme(theme);
            
            showNotification('Appearance settings saved!', 'success');
        });
    }
}

// Save settings to localStorage
function saveSettings(category, data) {
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    settings[category] = data;
    localStorage.setItem('userSettings', JSON.stringify(settings));
}

// Load settings from localStorage
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    
    // Load account settings
    if (settings.account) {
        if (document.getElementById('accountFirstName')) {
            document.getElementById('accountFirstName').value = settings.account.firstName || 'John';
            document.getElementById('accountLastName').value = settings.account.lastName || 'Doe';
            document.getElementById('accountEmail').value = settings.account.email || 'john.doe@example.com';
            document.getElementById('accountUsername').value = settings.account.username || 'johndoe';
            document.getElementById('accountLanguage').value = settings.account.language || 'en';
            document.getElementById('accountTimezone').value = settings.account.timezone || 'UTC-5';
        }
    }
    
    // Load privacy settings
    if (settings.privacy) {
        if (document.getElementById('profileVisibility')) {
            document.getElementById('profileVisibility').checked = settings.privacy.profileVisibility !== false;
            document.getElementById('showEmail').checked = settings.privacy.showEmail !== false;
            document.getElementById('activityStatus').checked = settings.privacy.activityStatus !== false;
            document.getElementById('courseProgress').checked = settings.privacy.courseProgress !== false;
            document.getElementById('dataSharing').value = settings.privacy.dataSharing || 'anonymous';
        }
    }
    
    // Load notification settings
    if (settings.emailNotifications) {
        if (document.getElementById('emailCourseUpdates')) {
            document.getElementById('emailCourseUpdates').checked = settings.emailNotifications.courseUpdates !== false;
            document.getElementById('emailAchievements').checked = settings.emailNotifications.achievements !== false;
            document.getElementById('emailMarketing').checked = settings.emailNotifications.marketing === true;
            document.getElementById('emailWeekly').checked = settings.emailNotifications.weekly !== false;
        }
    }
    
    if (settings.appNotifications) {
        if (document.getElementById('appCourseUpdates')) {
            document.getElementById('appCourseUpdates').checked = settings.appNotifications.courseUpdates !== false;
            document.getElementById('appMessages').checked = settings.appNotifications.messages !== false;
            document.getElementById('appAnnouncements').checked = settings.appNotifications.announcements !== false;
        }
    }
    
    // Load preferences
    if (settings.preferences) {
        if (document.getElementById('videoQuality')) {
            document.getElementById('videoQuality').value = settings.preferences.videoQuality || 'auto';
            document.getElementById('playbackSpeed').value = settings.preferences.playbackSpeed || '1';
            document.getElementById('autoPlay').checked = settings.preferences.autoPlay !== false;
            document.getElementById('subtitles').checked = settings.preferences.subtitles === true;
            document.getElementById('downloadQuality').value = settings.preferences.downloadQuality || '720p';
        }
    }
    
    // Load appearance settings
    if (settings.appearance) {
        if (document.getElementById('fontSize')) {
            const theme = settings.appearance.theme || 'light';
            const themeRadio = document.getElementById(`theme${theme.charAt(0).toUpperCase() + theme.slice(1)}`) || 
                              document.getElementById('themeLight');
            if (themeRadio) themeRadio.checked = true;
            
            document.getElementById('fontSize').value = settings.appearance.fontSize || 'medium';
            document.getElementById('animations').checked = settings.appearance.animations !== false;
            
            applyTheme(theme);
        }
    }
}

// Apply theme
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else if (theme === 'light') {
        document.body.classList.remove('dark-theme');
    } else {
        // Auto theme - match system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }
}

// Show notification
function showNotification(message, type = 'success') {
    if (typeof App !== 'undefined' && App.showNotification) {
        App.showNotification(message, type);
    } else {
        alert(message);
    }
}

// Delete Account
function setupDeleteAccount() {
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const deleteConfirm = document.getElementById('deleteConfirm');
    
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            const confirmText = deleteConfirm.value;
            if (confirmText === 'DELETE') {
                // In a real app, this would send a request to the server
                showNotification('Account deletion requested. You will receive a confirmation email.', 'info');
                
                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('deleteAccountModal'));
                if (modal) modal.hide();
                
                // Redirect to home after a delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 3000);
            } else {
                showNotification('Please type "DELETE" to confirm', 'error');
            }
        });
    }
}

// Session Management
function setupSessionManagement() {
    const revokeButtons = document.querySelectorAll('.session-item .btn-outline-danger');
    revokeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to revoke this session?')) {
                this.closest('.session-item').remove();
                showNotification('Session revoked successfully', 'success');
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setupSectionNavigation();
    setupFormSubmissions();
    setupDeleteAccount();
    setupSessionManagement();
    loadSettings();
    
    // Set default section
    const urlHash = window.location.hash.substring(1);
    if (urlHash) {
        switchSection(urlHash);
        // Update nav active state
        const navLink = document.querySelector(`[data-section="${urlHash}"]`);
        if (navLink) {
            document.querySelectorAll('.settings-nav .nav-link').forEach(l => l.classList.remove('active'));
            navLink.classList.add('active');
        }
    }
});

// Export functions for global access
window.switchSection = switchSection;
