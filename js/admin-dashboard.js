// Admin Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    setupTabNavigation();
});

function setupTabNavigation() {
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.dataset.tab;
            
            document.querySelectorAll('.sidebar .nav-link').forEach(l => {
                l.classList.remove('active');
            });
            this.classList.add('active');
            
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.add('d-none'));
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.remove('d-none');
            }
        });
    });
}

