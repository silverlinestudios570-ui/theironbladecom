window.initHomePage = function() {
    const root = document.getElementById('app-root');
    const modal = document.getElementById('password-modal');
    const passInput = document.getElementById('pass-input');
    const submitBtn = document.getElementById('submit-pass');
    const cancelBtn = document.getElementById('cancel-pass');
    
    root.innerHTML = `
        <div id="main-content" style="color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center; padding: 20px;">
            <h1 style="color: #00a2ff; font-size: 2.5rem;">Under Construction</h1>
            <p>Sorry we are developing this website still...</p>
            <p style="color: #555; margin-top: 20px;">Press <strong style="color: #00a2ff;">/</strong> to enter passcode.</p>
            <div id="lockout-timer" style="color: #ff4444; margin-top: 15px;"></div>
        </div>
    `;

    // Listen for "/" to show modal
    window.addEventListener('keydown', (e) => {
        if (e.key === '/') {
            e.preventDefault();
            
            // Check lockout first
            const lockoutTime = localStorage.getItem('lockoutTimestamp');
            if (lockoutTime && (Date.now() < parseInt(lockoutTime) + 60000)) {
                alert("System Locked.");
                return;
            }

            modal.classList.remove('modal-hidden');
            passInput.focus();
        }
    });

    // Handle Submit
    submitBtn.onclick = () => {
        if (passInput.value === "Brayden8") {
            modal.classList.add('modal-hidden');
            root.innerHTML = `<div style="color:white;text-align:center;margin-top:20vh;"><h1>ACCESS GRANTED</h1><p>Nothing here yet.</p></div>`;
        } else {
            modal.classList.add('modal-hidden');
            localStorage.setItem('lockoutTimestamp', Date.now().toString());
            location.reload(); // Refresh to trigger lockout timer
        }
    };

    // Handle Cancel
    cancelBtn.onclick = () => {
        modal.classList.add('modal-hidden');
        passInput.value = "";
    };

    // Timer logic (Same as before)
    const savedLockout = localStorage.getItem('lockoutTimestamp');
    if (savedLockout) {
        const timeLeft = Math.ceil((parseInt(savedLockout) + 60000 - Date.now()) / 1000);
        if (timeLeft > 0) {
            const timerDiv = document.getElementById('lockout-timer');
            let remaining = timeLeft;
            const interval = setInterval(() => {
                if (remaining <= 0) {
                    localStorage.removeItem('lockoutTimestamp');
                    timerDiv.innerText = "";
                    clearInterval(interval);
                } else {
                    timerDiv.innerText = `LOCKOUT: ${remaining}s`;
                    remaining--;
                }
            }, 1000);
        }
    }
};