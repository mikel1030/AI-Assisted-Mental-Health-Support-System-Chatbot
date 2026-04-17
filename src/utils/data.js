export const moodData = {
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
}

export const moodEmojis = {
  'Happy': '😊',
  'Sad': '😢',
  'Anxious': '😰',
  'Stressed': '😣'
}

export const inspirationalQuotes = [
  "Your mental health is a priority, not a luxury.",
  "You are stronger than you think.",
  "It's okay to not be okay. But it's not okay to stay there.",
  "Progress, not perfection.",
  "Heal at your own pace.",
  "You've survived 100% of your worst days.",
  "Self-care is not selfish.",
  "This too shall pass."
]

export const breathingExercises = {
  basic: {
    name: 'Basic Breathing',
    steps: ["Inhale...", "Hold...", "Exhale..."],
    durations: [2000, 2000, 2000]
  },
  boxBreathing: {
    name: 'Box Breathing',
    steps: ["Inhale (4s)", "Hold (4s)", "Exhale (4s)", "Hold (4s)"],
    durations: [4000, 4000, 4000, 4000]
  },
  '478': {
    name: '4-7-8 Technique',
    steps: ["Inhale (4s)", "Hold (7s)", "Exhale (8s)"],
    durations: [4000, 7000, 8000]
  }
}
