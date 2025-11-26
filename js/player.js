// Video Player JavaScript

document.addEventListener('DOMContentLoaded', function() {
    setupPlayer();
    setupLectureNavigation();
});

function setupPlayer() {
    const video = document.getElementById('courseVideo');
    if (!video) return;

    // Auto-play next lesson when video ends
    video.addEventListener('ended', function() {
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            setTimeout(() => {
                nextBtn.click();
            }, 2000);
        }
    });

    // Save watch progress
    video.addEventListener('timeupdate', function() {
        const progress = (video.currentTime / video.duration) * 100;
        if (progress > 0) {
            localStorage.setItem('watchProgress_' + getCourseId(), JSON.stringify({
                currentTime: video.currentTime,
                progress: progress
            }));
        }
    });

    // Load saved progress
    const savedProgress = localStorage.getItem('watchProgress_' + getCourseId());
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        if (progress.currentTime > 0) {
            video.currentTime = progress.currentTime;
        }
    }
}

function setupLectureNavigation() {
    document.querySelectorAll('.lecture-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            document.querySelectorAll('.lecture-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Update lecture title
            const title = this.querySelector('span').textContent.trim();
            document.getElementById('currentLectureTitle').textContent = title;
            
            // Here you would load the new video source
            // For demo purposes, we'll just show a notification
            App.showNotification('Loading lecture...', 'info');
        });
    });

    // Previous button
    document.getElementById('prevBtn')?.addEventListener('click', function() {
        const activeLecture = document.querySelector('.lecture-item.active');
        if (activeLecture) {
            const prevLecture = activeLecture.previousElementSibling;
            if (prevLecture && prevLecture.classList.contains('lecture-item')) {
                prevLecture.click();
            }
        }
    });

    // Next button
    document.getElementById('nextBtn')?.addEventListener('click', function() {
        const activeLecture = document.querySelector('.lecture-item.active');
        if (activeLecture) {
            const nextLecture = activeLecture.nextElementSibling;
            if (nextLecture && nextLecture.classList.contains('lecture-item')) {
                nextLecture.click();
            } else {
                // Try to find next lecture in next section
                const currentSection = activeLecture.closest('.accordion-collapse');
                if (currentSection) {
                    const nextSection = currentSection.nextElementSibling?.querySelector('.accordion-collapse');
                    if (nextSection) {
                        const nextButton = nextSection.previousElementSibling;
                        if (nextButton) {
                            nextButton.click();
                            setTimeout(() => {
                                const firstLecture = nextSection.querySelector('.lecture-item');
                                if (firstLecture) firstLecture.click();
                            }, 300);
                        }
                    }
                }
            }
        }
    });
}

function getCourseId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('courseId') || '1';
}

