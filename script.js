const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const voiceSelect = document.getElementById("voiceSelect");
const fileInput = document.getElementById("fileInput");
const toggleDarkModeBtn = document.getElementById("toggleDarkMode");

function populateVoices() {
    const synth = window.speechSynthesis;
    let voices = synth.getVoices();
    
    voiceSelect.innerHTML = "";
    voices.forEach((voice, index) => {
        let option = document.createElement("option");
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = index;
        voiceSelect.appendChild(option);
    });
}

convertBtn.addEventListener('click', function () {
    const speechSynth = window.speechSynthesis;
    const enteredText = text.value.trim();
    const error = document.querySelector('.error-para');

    if (!enteredText.length) {
        error.textContent = "Nothing to Convert! Enter text in the text area.";
        return;
    }

    error.textContent = "";
    const utterance = new SpeechSynthesisUtterance(enteredText);
    let voices = speechSynth.getVoices();
    utterance.voice = voices[voiceSelect.value];
    speechSynth.speak(utterance);
    convertBtn.textContent = "Playing...";
    
    setTimeout(() => {
        convertBtn.textContent = "Play Converted Sound";
    }, 5000);
});

fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            text.value = e.target.result;
        };
        reader.readAsText(file);
    }
});

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container").classList.toggle("dark-mode");
    document.querySelector(".app-container").classList.toggle("dark-mode");
    document.querySelector(".text-control").classList.toggle("dark-mode-input");
    document.querySelector(".file-upload").classList.toggle("dark-mode-input");
    document.querySelector(".voice-dropdown").classList.toggle("dark-mode-input");
    toggleDarkModeBtn.classList.toggle("dark-mode-btn");

    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
}

toggleDarkModeBtn.addEventListener("click", toggleDarkMode);

window.onload = function () {
    if (localStorage.getItem("darkMode") === "true") {
        toggleDarkMode();
    }
};

window.speechSynthesis.onvoiceschanged = populateVoices;
