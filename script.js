document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const message = document.getElementById('message');
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    const timerElement = document.getElementById('timer');
    
    // Fun messages when trying to click "No"
    const funnyMessages = [
        "Are you sure?",
        "Maybe think about it?",
        "I'll be sad!",
        "Try again!",
        "Please say yes!",
        "Don't break my heart!",
        "You're making this hard!",
        "I'm not giving up!",
        "Just click YES!",
        "Pretty please?",
        "With a cherry on top?",
        "You know you want to!"
    ];
    
    let messageIndex = 0;
    let clickCount = 0;
    let timeLeft = 30;
    let timerInterval;
    
    // Start countdown timer
    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            if (timeLeft <= 10) {
                timerElement.style.color = "#ff0000";
                timerElement.style.fontSize = "2rem";
            }
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                message.textContent = "Time's up! You have to say YES now!";
                message.style.opacity = 1;
                noBtn.style.display = "none";
            }
        }, 1000);
    }
    
    // Make "No" button move smoothly on hover
    noBtn.addEventListener('mouseover', function() {
        clickCount++;
        
        // Show funny message
        if (messageIndex < funnyMessages.length) {
            message.textContent = funnyMessages[messageIndex];
            message.style.opacity = 1;
            messageIndex++;
        } else {
            message.textContent = "OK, I'll stop asking... just kidding!";
        }
        
        // Get viewport dimensions
        const maxX = window.innerWidth - noBtn.offsetWidth - 50;
        const maxY = window.innerHeight - noBtn.offsetHeight - 50;
        
        // Generate random position within viewport
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        // Apply smooth transition with random position
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        
        // Make button smaller and harder to click
        if (clickCount > 3) {
            const scale = Math.max(0.5, 1 - (clickCount * 0.1));
            noBtn.style.transform = `scale(${scale})`;
        }
        
        // If clicked too many times, make it disappear
        if (clickCount > 8) {
            noBtn.style.opacity = '0.3';
            noBtn.style.pointerEvents = 'none';
            message.textContent = "The 'No' button gave up! Now you have to click YES!";
        }
    });
    
    // When "No" is actually clicked (if they manage to)
    noBtn.addEventListener('click', function() {
        message.textContent = "Hey! You're not supposed to click that! Try the YES button!";
        message.style.opacity = 1;
        
        // Make it even harder next time
        clickCount += 2;
    });
    
    // When "Yes" is clicked
    yesBtn.addEventListener('click', function() {
        clearInterval(timerInterval);
        
        // Create celebration effect
        createConfetti();
        
        // Play sound if audio is loaded
        if (bgMusic) {
            bgMusic.currentTime = 0;
            bgMusic.play().catch(e => console.log("Audio play failed:", e));
        }
        
        // Show celebration message
        message.textContent = "YAY! You made me the happiest person! 💖";
        message.style.opacity = 1;
        message.style.color = "#ff3366";
        message.style.fontSize = "2rem";
        
        // Hide the no button
        noBtn.style.display = "none";
        
        // Make yes button celebrate
        yesBtn.innerHTML = '<i class="fas fa-heart"></i> YAY! THANK YOU! <i class="fas fa-heart"></i>';
        yesBtn.style.background = 'linear-gradient(to right, #00ff88, #00ccff)';
        yesBtn.style.borderColor = '#00ccff';
        yesBtn.style.transform = 'scale(1.3)';
        yesBtn.style.transition = 'all 0.5s ease';
        
        // Redirect to second page after 3 seconds
        setTimeout(() => {
            window.location.href = "page2.html";
        }, 3000);
    });
    
    // Background music control
    musicBtn.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            musicBtn.style.background = '#00cc66';
        } else {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
            musicBtn.style.background = '#ff3366';
        }
    });
    
    // Confetti effect
    function createConfetti() {
        const colors = ['#ff3366', '#ff4d8d', '#ff6699', '#ff80b3', '#ff99cc'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `confetti ${Math.random() * 3 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    // Start the timer
    startTimer();
    
    // Preload audio
    bgMusic.load();
});
