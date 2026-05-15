// Assessment questionnaire data organized by mental health categories
export const assessmentQuestions = {
  overallWellbeing: {
    category: 'Overall Well-being',
    description: 'Rate your overall well-being on a scale of 1-10',
    questions: [
      {
        id: 'overall_1',
        text: 'On a scale of 1-10, how would you rate your overall well-being right now?',
        type: 'scale',
        scale: { min: 1, max: 10, minLabel: 'Very Poor', maxLabel: 'Excellent' }
      }
    ]
  },

  anxiety: {
    category: 'Anxiety',
    description: 'Questions related to anxiety and worry',
    questions: [
      {
        id: 'anxiety_1',
        text: 'How often do you feel anxious or worried?',
        type: 'multipleChoice',
        options: [
          { value: 1, label: 'Never' },
          { value: 2, label: 'Rarely' },
          { value: 3, label: 'Sometimes' },
          { value: 4, label: 'Often' },
          { value: 5, label: 'Always' }
        ]
      },
      {
        id: 'anxiety_2',
        text: 'Do you experience physical symptoms of anxiety (racing heart, trembling, sweating)?',
        type: 'multipleChoice',
        options: [
          { value: 1, label: 'Never' },
          { value: 2, label: 'Rarely' },
          { value: 3, label: 'Sometimes' },
          { value: 4, label: 'Often' },
          { value: 5, label: 'Very Often' }
        ]
      },
      {
        id: 'anxiety_3',
        text: 'How much does anxiety affect your daily activities?',
        type: 'scale',
        scale: { min: 1, max: 10, minLabel: 'No Impact', maxLabel: 'Severe Impact' }
      },
      {
        id: 'anxiety_4',
        text: 'Do you have difficulty concentrating due to worry or racing thoughts?',
        type: 'multipleChoice',
        options: [
          { value: 1, label: 'Not at all' },
          { value: 2, label: 'Slightly' },
          { value: 3, label: 'Moderately' },
          { value: 4, label: 'Very Much' },
          { value: 5, label: 'Extremely' }
        ]
      },
      {
        id: 'anxiety_5',
        text: 'Do you have panic attacks or episodes of intense fear?',
        type: 'multipleChoice',
        options: [
          { value: 1, label: 'Never' },
          { value: 2, label: 'Rarely' },
          { value: 3, label: 'Sometimes' },
          { value: 4, label: 'Often' },
          { value: 5, label: 'Very Often' }
        ]
      }
    ]
  },

  depression: {
    category: 'Depression',
    description: 'Questions related to depression and mood',
    questions: [
      {
        id: 'depression_1',
        text: 'How often do you feel sad, empty, or hopeless?',
        type: 'multipleChoice',
        options: [
          { value: 1, label: 'Never' },
          { value: 2, label: 'Rarely' },
          { value: 3, label: 'Sometimes' },
          { value: 4, label: 'Often' },
          { value: 5, label: 'Almost Always' }
        ]
      },
      {
        id: 'depression_2',
        text: 'Have you lost interest in activities you normally enjoy?',
        type: 'multipleChoice',
        options: [
          { value: 1, label: 'Not at all' },
          { value: 2, label: 'Slightly' },
          { value: 3, label: 'Moderately' },
          { value: 4, label: 'Very Much' },
          { value: 5, label: 'Completely' }
        ]
      },
      {
        id: 'depression_3',
        text: 'How would you rate your energy levels?',
        type: 'scale',
        scale: { min: 1, max: 10, minLabel: 'Extremely Low', maxLabel: 'Very High' }
      },
      {
        id: 'depression_4',
        text: 'Do you have difficulty sleeping or sleeping too much?',
        type: 'multipleChoice',
        options: [
          { value: 1, label: 'No problem' },
          { value: 2, label: 'Slight problem' },
          { value: 3, label: 'Moderate problem' },
          { value: 4, label: 'Significant problem' },
          { value: 5, label: 'Severe problem' }
        ]
      },
      {
        id: 'depression_5',
        text: 'Do you feel worthless or guilty about things?',
        type: 'multipleChoice',
        options: [
          { value: 1, label: 'Not at all' },
          { value: 2, label: 'Slightly' },
          { value: 3, label: 'Moderately' },
          { value: 4, label: 'Very Much' },
          { value: 5, label: 'Extremely' }
        ]
      }
    ]
  },

  stress: {
    category: 'Stress & Overwhelm',
    description: 'Questions related to stress and feeling overwhelmed',
    questions: [
      {
        id: 'stress_1',
        text: 'How stressed do you feel currently?',
        type: 'scale',
        scale: { min: 1, max: 10, minLabel: 'Not Stressed', maxLabel: 'Extremely Stressed' }
      },
      {
        id: 'stress_2',
        text: 'Do you feel overwhelmed by your responsibilities?',
        type: 'multipleChoice',
        options: [
          { value: 1, label: 'Not at all' },
          { value: 2, label: 'A little' },
          { value: 3, label: 'Somewhat' },
          { value: 4, label: 'Very much' },
          { value: 5, label: 'Completely' }
        ]
      },
      {
        id: 'stress_3',
        text: 'How well do you manage stressful situations?',
        type: 'scale',
        scale: { min: 1, max: 10, minLabel: 'Very Poorly', maxLabel: 'Very Well' }
      },
      {
        id: 'stress_4',
        text: 'Do you find it difficult to relax or unwind?',
        type: 'multipleChoice',
        options: [
          { value: 1, label: 'Not at all' },
          { value: 2, label: 'Rarely' },
          { value: 3, label: 'Sometimes' },
          { value: 4, label: 'Often' },
          { value: 5, label: 'Always' }
        ]
      }
    ]
  },

  socialConnection: {
    category: 'Social Connection & Relationships',
    description: 'Questions about social relationships and connections',
    questions: [
      {
        id: 'social_1',
        text: 'How satisfied are you with your social relationships?',
        type: 'scale',
        scale: { min: 1, max: 10, minLabel: 'Very Unsatisfied', maxLabel: 'Very Satisfied' }
      },
      {
        id: 'social_2',
        text: 'Do you feel lonely or isolated?',
        type: 'multipleChoice',
        options: [
          { value: 1, label: 'Never' },
          { value: 2, label: 'Rarely' },
          { value: 3, label: 'Sometimes' },
          { value: 4, label: 'Often' },
          { value: 5, label: 'Always' }
        ]
      },
      {
        id: 'social_3',
        text: 'Do you have people you can talk to about your feelings?',
        type: 'multipleChoice',
        options: [
          { value: 5, label: 'Yes, definitely' },
          { value: 4, label: 'Somewhat' },
          { value: 3, label: 'A little' },
          { value: 2, label: 'Rarely' },
          { value: 1, label: 'Not at all' }
        ]
      }
    ]
  },

  selfEsteem: {
    category: 'Self-Esteem & Confidence',
    description: 'Questions about self-esteem and confidence',
    questions: [
      {
        id: 'selfesteem_1',
        text: 'How would you rate your self-esteem?',
        type: 'scale',
        scale: { min: 1, max: 10, minLabel: 'Very Low', maxLabel: 'Very High' }
      },
      {
        id: 'selfesteem_2',
        text: 'Do you feel confident in your abilities?',
        type: 'multipleChoice',
        options: [
          { value: 1, label: 'Not at all' },
          { value: 2, label: 'Slightly' },
          { value: 3, label: 'Moderately' },
          { value: 4, label: 'Very Much' },
          { value: 5, label: 'Extremely' }
        ]
      },
      {
        id: 'selfesteem_3',
        text: 'Do you engage in negative self-talk?',
        type: 'multipleChoice',
        options: [
          { value: 5, label: 'Never' },
          { value: 4, label: 'Rarely' },
          { value: 3, label: 'Sometimes' },
          { value: 2, label: 'Often' },
          { value: 1, label: 'Always' }
        ]
      }
    ]
  },

  lifestyle: {
    category: 'Lifestyle & Self-Care',
    description: 'Questions about lifestyle habits and self-care',
    questions: [
      {
        id: 'lifestyle_1',
        text: 'How many days per week do you exercise or move your body?',
        type: 'multipleChoice',
        options: [
          { value: 5, label: '5-7 days' },
          { value: 4, label: '3-4 days' },
          { value: 3, label: '1-2 days' },
          { value: 2, label: 'Rarely' },
          { value: 1, label: 'Not at all' }
        ]
      },
      {
        id: 'lifestyle_2',
        text: 'How well do you eat and maintain a healthy diet?',
        type: 'scale',
        scale: { min: 1, max: 10, minLabel: 'Very Poorly', maxLabel: 'Very Well' }
      },
      {
        id: 'lifestyle_3',
        text: 'How many hours of sleep do you typically get per night?',
        type: 'multipleChoice',
        options: [
          { value: 5, label: '7-9 hours' },
          { value: 4, label: '6-7 hours' },
          { value: 3, label: '5-6 hours' },
          { value: 2, label: '4-5 hours' },
          { value: 1, label: 'Less than 4 hours' }
        ]
      },
      {
        id: 'lifestyle_4',
        text: 'Do you practice self-care activities (meditation, hobbies, etc.)?',
        type: 'multipleChoice',
        options: [
          { value: 5, label: 'Regularly' },
          { value: 4, label: 'Sometimes' },
          { value: 3, label: 'Occasionally' },
          { value: 2, label: 'Rarely' },
          { value: 1, label: 'Never' }
        ]
      }
    ]
  }
}

// ─── Assessment Levels: 1 = Severe (red), 2–3 = Moderate (orange), 4–5 = Good (green) ───
export const assessmentLevels = {
  severe: {
    name: 'Needs Immediate Support',
    emoji: '🔴',
    color: '#e74c3c',
    description: 'Your responses suggest you may be experiencing significant challenges right now. Please consider reaching out to a mental health professional or someone you trust.',
    recommendations: [
      'Consider speaking with a mental health professional as soon as possible',
      'Reach out to a trusted friend, family member, or counselor today',
      'If you are in crisis, please contact a mental health helpline immediately',
      'Practice grounding techniques: deep breathing or the 5-4-3-2-1 sensory exercise',
      'Prioritize basic self-care: eating, hydrating, and resting'
    ]
  },
  moderate: {
    name: 'Doing Okay, Room to Grow',
    emoji: '🟠',
    color: '#e67e22',
    description: 'You are managing, but there are some areas where extra support or attention could make a meaningful difference in your well-being.',
    recommendations: [
      'Try journaling daily to identify patterns in your mood',
      'Add one small wellness habit this week such as a short walk or better sleep schedule',
      'Connect with someone you trust about how you are feeling',
      'Explore stress management techniques like mindfulness or breathing exercises',
      'Consider speaking with a counselor for extra support'
    ]
  },
  good: {
    name: 'Thriving & Flourishing',
    emoji: '🟢',
    color: '#27ae60',
    description: 'You are in a good place! Your wellbeing is strong. Keep nurturing your mental health habits and supporting those around you.',
    recommendations: [
      'Keep up your current wellness routines — they are working!',
      'Share your positive habits with someone who might benefit',
      'Set a new personal growth goal to keep your momentum going',
      'Practice gratitude daily to maintain your positive outlook',
      'Check in with yourself weekly to stay aware of any shifts in your mood'
    ]
  }
}

// ─── Core scoring logic: maps 1–5 scale to severe / moderate / good ───
export const getAssessmentLevel = (score) => {
  if (score <= 1) return assessmentLevels.severe      // 1       → red
  if (score <= 3) return assessmentLevels.moderate    // 2 – 3   → orange
  return assessmentLevels.good                        // 4 – 5   → green
}

// ─── Category-specific insights ───
export const getCategoryInsights = (categoryName, score) => {
  const insights = {
    'Overall Well-being': {
      low:      'Your overall well-being needs attention. Please reach out for support.',
      moderate: 'Your overall well-being is moderate. Small daily improvements can help.',
      high:     'Your overall well-being is strong. Keep doing what is working!'
    },
    'Anxiety': {
      low:      'Your anxiety levels are elevated. Consider grounding techniques and breathing exercises.',
      moderate: 'You experience moderate anxiety. Mindfulness and gradual exposure can help.',
      high:     'Your anxiety is well-managed. Keep up your positive coping strategies.'
    },
    'Depression': {
      low:      'You may be experiencing significant depressive symptoms. Please reach out to a mental health professional.',
      moderate: 'You experience some depressive symptoms. Engage in activities you enjoy and maintain social connections.',
      high:     'Your mood is generally positive. Continue engaging in activities that bring you joy.'
    },
    'Stress & Overwhelm': {
      low:      'You are experiencing high stress. Prioritize rest and stress-reduction activities.',
      moderate: 'You experience moderate stress. Break tasks into smaller steps and practice relaxation techniques.',
      high:     'You manage stress well. Continue your current strategies.'
    },
    'Social Connection & Relationships': {
      low:      'Building social connections may improve your well-being. Start with one small step today.',
      moderate: 'Consider reaching out to friends or family more often.',
      high:     'Your social connections are strong. Keep nurturing these important relationships.'
    },
    'Self-Esteem & Confidence': {
      low:      'Focus on your strengths and practice self-affirmation daily.',
      moderate: 'Work on self-compassion and gently challenge negative self-talk.',
      high:     'Your self-esteem is healthy. Maintain this positive self-view.'
    },
    'Lifestyle & Self-Care': {
      low:      'Small improvements in self-care can make a big difference. Start with sleep or movement.',
      moderate: 'Try to improve one area, like sleep consistency or daily exercise.',
      high:     'Your lifestyle habits support good mental health. Keep it up!'
    }
  }

  const category = insights[categoryName]

  if (!category) return 'Keep paying attention to this area of your well-being.'

  if (score >= 4) return category.high
  if (score >= 2) return category.moderate
  return category.low
}