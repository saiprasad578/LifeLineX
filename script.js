// Go To Home Page
function goHome() {
    window.location.href = "index.html";
}

// Back Button Function
function goBack() {
    history.back();
}

// Success Sound
function playSound() {

    const audio = new Audio(
        "https://www.soundjay.com/buttons/sounds/button-3.mp3"
    );

    audio.play();
}

playSound();

// Auto Redirect After 10 Seconds
setTimeout(() => {

    window.location.href = "index.html";

}, 10000);

// Success Alert
setTimeout(() => {

    alert("Emergency notification sent successfully!");

}, 1000);

// Dynamic Footer Year
const footer = document.getElementById("footer");

const year = new Date().getFullYear();

footer.innerHTML =
    `© ${year} LifeLineX | Emergency Support System`;