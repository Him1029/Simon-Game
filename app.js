let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Sounds setup
function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3.wav`);
    audio.play();
}

// Flash for button
function flash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

// Flash for user click
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

// Game start
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

// ✅ Game start on button click
let startBtn = document.getElementById("start-btn");
if (startBtn) {
    startBtn.addEventListener("click", function () {
        if (!started) {
            started = true;
            levelUp();
        }
    });
}

// Main logic
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // Get random button
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`#${randColor}`);
    gameSeq.push(randColor);

    // Show to user
    flash(randBtn);
    playSound(randColor);
}

// Check user answer
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            // Correct sequence completed
            setTimeout(levelUp, 1000);
        }
    } else {
        // ❌ Wrong input
        let loseAudio = new Audio("sounds/lose.mp3");
        loseAudio.play();
        h2.innerHTML = `<span class="blink-red"> Game Over! Press any key to restart. </span><br> You reached Level ${level}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        reset();
    }
}

// Button press logic
function btnPress() {
    let btn = this;

    if (!started) return; // Prevent clicks before game starts

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    userFlash(btn);

    // Only play button sound if correct so far
    if (userSeq[userSeq.length - 1] === gameSeq[userSeq.length - 1]) {
        playSound(userColor);
    }

    checkAns(userSeq.length - 1);
}

// Add event listeners
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

