// Accessing the elements from the HTML  
let btn = document.getElementById("btn");
let content = document.querySelector("#content"); 
let voice = document.querySelector("#voice");

// Function to convert text to speech  
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";
    window.speechSynthesis.speak(text_speak);
}

// Function to greet the user based on the time  
function wishMe() {
    let hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Veera Sir");
    } else if (hour >= 12 && hour < 16) {
        speak("Good Afternoon Veera Sir");
    } else {
        speak("Good Evening Veera Sir");
    }
}

// Call wishMe function when the page loads  
window.addEventListener('load', wishMe);

// Checking if the browser supports speech recognition  
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!speechRecognition) {
    alert("Speech Recognition is not supported in your browser. Please use Google Chrome.");
}

// Initializing speech recognition  
let recognition = new speechRecognition();
recognition.lang = "en-IN";   
recognition.continuous = false;   

// When speech is recognized  
recognition.onresult = function(event) {
    let transcript = event.results[event.resultIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

// Start speech recognition when the button is clicked  
btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none"; 
    voice.style.display = "block";  
});

// When recognition ends, reset UI  
recognition.onend = function() {
    btn.style.display = "block";  
    voice.style.display = "none";  
};

// Function to process user commands  
function takeCommand(message) {
    if (!message) return;

    let greetings = ["hello", "hi", "hey", "hello veera", "heyy"];
    if (greetings.some(word => message.includes(word))) {
        speak("Hello Veera! How can I assist you?");
    }
    else if (message.includes("who are you") || message.includes("what is the use of") || message.includes("may i know who are you")) {
        speak("I am your virtual assistant created by Veera Sir. I will give you quick answers and help you anytime, Veera.");
    }
    else if (message.includes("open youtube")) {
        speak("Opening YouTube for you, Veera.");
        window.open("https://www.youtube.com", "_blank");
    }
    else if (message.includes("open instagram")) {
        speak("Opening Instagram for you, Veera.");
        window.open("https://www.instagram.com", "_blank");
    }
    else if (message.includes("open google")) {
        speak("Opening Google for you, Veera.");
        window.open("https://www.google.com", "_blank");
    }
    else if (message.includes("open linkedin")) {
        speak("Opening LinkedIn for you, Veera.");
        window.open("https://www.linkedin.com", "_blank");
    }
    else if (message.includes("calculator")) {
        speak("Opening Calculator for you, Veera.");
        openCalculator();  // Calls the function to open Calculator
    }
    else if(message.includes("what is the time")){
        let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
    }
    else if(message.includes("what is the date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"numeric",year:"numeric"})
        speak(date)
    }
    else {
        let finaltext = `This is what I found on the internet regarding ${message.replace("siri", "").trim()}`;
        speak(finaltext);
        window.open(`https://www.google.com/search?q=${message}`);
    }
}

