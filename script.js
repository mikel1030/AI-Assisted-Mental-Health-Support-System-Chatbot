// DATA STORAGE
let userMoods = JSON.parse(localStorage.getItem('moods')) || [];
let userStreak = JSON.parse(localStorage.getItem('streak')) || 0;
let lastMoodDate = localStorage.getItem('lastMoodDate') || '';

// MOOD RESPONSES & ACTIVITIES
const moodData = {
    'Happy': {
        response: "That's wonderful! 😊 Keep spreading that positive energy!",
        activities: ['Share your joy with a friend', 'Create something positive', 'Help someone today'],
        quote: "Happiness is found in the smallest of moments. Enjoy them!"
    },
    'Sad': {
        response: "I'm sorry you're feeling sad. 💙 It's okay to feel this way. Let's talk about it.",
        activities: ['Call a friend', 'Take a walk outside', 'Listen to your favorite music', 'Journal your thoughts'],
        quote: "Every storm passes. This feeling is temporary, and you will feel better."
    },
    'Anxious': {
        response: "Anxiety is tough, but you're not alone. 💙 Let's work through this together.",
        activities: ['Try a breathing exercise', 'Ground yourself (5-4-3-2-1 technique)', 'Meditate', 'Do something calming'],
        quote: "Worry is like a rocking chair: it gives you something to do but gets you nowhere."
    },
    'Stressed': {
        response: "Stress is heavy, but we can lighten the load. 💚 Let's find some relief.",
        activities: ['Break tasks into smaller steps', 'Take a short break', 'Practice deep breathing', 'Do some exercise'],
        quote: "You don't have to see the whole staircase, just take the first step."
    }
};

const moodEmojis = {
    'Happy': '😊',
    'Sad': '😢',
    'Anxious': '😰',
    'Stressed': '😣'
};

const inspirationalQuotes = [
    "Your mental health is a priority, not a luxury.",
    "You are stronger than you think.",
    "It's okay to not be okay. But it's not okay to stay there.",
    "Progress, not perfection.",
    "Heal at your own pace.",
    "You've survived 100% of your worst days.",
    "Self-care is not selfish.",
    "This too shall pass."
];

// SEND MESSAGE WITH BOT TYPING ANIMATION
function sendMessage() {
    let input = document.getElementById("userInput").value;
    let chat = document.getElementById("chatBox");

    if (input === "") return;

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.textContent = input;
    chat.appendChild(userMsg);

    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing-indicator';
    typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    chat.appendChild(typingDiv);

    document.getElementById("userInput").value = "";
    chat.scrollTop = chat.scrollHeight;

    // Simulate bot response delay
    setTimeout(() => {
        typingDiv.remove();
        
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot';
        botMsg.textContent = getSmartResponse(input);
        chat.appendChild(botMsg);
        chat.scrollTop = chat.scrollHeight;
    }, 1500);
}

// SMART RESPONSE LOGIC
function getSmartResponse(input) {
    input = input.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi')) {
        return "Hello! How are you doing today? 💚";
    } else if (input.includes('help')) {
        return "I'm here to help. Tell me what's on your mind.";
    } else if (input.includes('thank')) {
        return "You're welcome! I'm always here for you. 💚";
    } else if (input.includes('exercise') || input.includes('breathing')) {
        return "Breathing exercises are great! Try starting one below. They really help calm the mind. 🌬";
    } else {
        const responses = [
            "That sounds important. Tell me more about how you're feeling.",
            "I understand. What would help you feel better right now?",
            "Thank you for sharing that with me. How can I support you?",
            "I hear you. You're not alone in this. 💚"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// SET MOOD
function setMood(mood) {
    let chat = document.getElementById("chatBox");

    // Add user mood message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.textContent = `I'm feeling ${mood}`;
    chat.appendChild(userMsg);

    // Update streak
    updateStreak();

    // Add mood to history
    userMoods.push({
        mood: mood,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    });
    localStorage.setItem('moods', JSON.stringify(userMoods));

    // Show quick activities
    const data = moodData[mood];
    
    // Add bot response
    const botMsg = document.createElement('div');
    botMsg.className = 'message bot';
    botMsg.innerHTML = `${data.response}<br><br><strong>Suggestions for you:</strong><br>${data.activities.map(a => '• ' + a).join('<br>')}<br><br><em>"${data.quote}"</em>`;
    chat.appendChild(botMsg);

    chat.scrollTop = chat.scrollHeight;
}

// UPDATE STREAK
function updateStreak() {
    const today = new Date().toLocaleDateString();
    if (lastMoodDate !== today) {
        userStreak++;
        localStorage.setItem('streak', userStreak);
        localStorage.setItem('lastMoodDate', today);
    }
}

// BREATHING EXERCISES
let breathingInterval;
function startBreathing(type = 'basic') {
    const breathText = document.getElementById("breathText");
    
    if (breathingInterval) clearInterval(breathingInterval);
    
    let steps, durations;
    
    switch(type) {
        case 'boxBreathing':
            steps = ["Inhale (4s)", "Hold (4s)", "Exhale (4s)", "Hold (4s)"];
            durations = [4000, 4000, 4000, 4000];
            break;
        case '478':
            steps = ["Inhale (4s)", "Hold (7s)", "Exhale (8s)"];
            durations = [4000, 7000, 8000];
            break;
        default: // basic
            steps = ["Inhale...", "Hold...", "Exhale..."];
            durations = [2000, 2000, 2000];
    }
    
    let i = 0;
    breathText.innerText = steps[i];
    
    breathingInterval = setInterval(() => {
        i = (i + 1) % steps.length;
        breathText.innerText = steps[i];
    }, durations[i % durations.length]);
}

// GET RANDOM QUOTE
function getRandomQuote() {
    return inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
}