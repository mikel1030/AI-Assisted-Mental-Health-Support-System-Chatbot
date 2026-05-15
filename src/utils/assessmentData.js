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

// Assessment level interpretations and recommendations
export const assessmentLevels = [
  {
    level: 1,
    name: 'Critical',
    range: { min: 1, max: 2 },
    color: '#c0392b',
    emoji: '🚨',
    description: 'You are experiencing significant mental health challenges',
    recommendations: [
      'Please consider reaching out to a mental health professional or therapist',
      'Contact a crisis helpline or mental health support service immediately',
      'Talk to someone you trust about what you are experiencing',
      'Focus on basic self-care: eating, sleeping, and staying hydrated'
    ]
  },
  {
    level: 2,
    name: 'Severe',
    range: { min: 2.1, max: 3.5 },
    color: '#e74c3c',
    emoji: '⚠️',
    description: 'You are experiencing significant struggles with your mental health',
    recommendations: [
      'Consider seeking professional help from a therapist or counselor',
      'Talk to your doctor about your mental health concerns',
      'Use this chatbot as a daily support tool',
      'Implement stress-reduction techniques like deep breathing or journaling',
      'Try to maintain regular sleep and eating schedules'
    ]
  },
  {
    level: 3,
    name: 'Moderate',
    range: { min: 3.6, max: 5.5 },
    color: '#f39c12',
    emoji: '😟',
    description: 'You are experiencing some mental health challenges',
    recommendations: [
      'Use this chatbot regularly for daily emotional support',
      'Practice stress management techniques',
      'Engage in regular physical activity',
      'Maintain a healthy sleep schedule',
      'Consider speaking with a therapist if challenges persist',
      'Focus on activities that bring you joy'
    ]
  },
  {
    level: 4,
    name: 'Mild',
    range: { min: 5.6, max: 7.5 },
    color: '#3498db',
    emoji: '😌',
    description: 'You are managing fairly well overall',
    recommendations: [
      'Continue using healthy coping strategies',
      'Engage in regular exercise and outdoor activities',
      'Maintain social connections with friends and family',
      'Use this chatbot for ongoing emotional wellness',
      'Practice mindfulness or meditation regularly'
    ]
  },
  {
    level: 5,
    name: 'Good',
    range: { min: 7.6, max: 8.5 },
    color: '#27ae60',
    emoji: '😊',
    description: 'You are in a good place mentally and emotionally',
    recommendations: [
      'Maintain your current healthy habits',
      'Continue social connections and positive relationships',
      'Use this chatbot for ongoing personal growth',
      'Share your positive coping strategies with others',
      'Focus on helping others who may be struggling'
    ]
  },
  {
    level: 6,
    name: 'Excellent',
    range: { min: 8.6, max: 10 },
    color: '#16a085',
    emoji: '😄',
    description: 'You are thriving with excellent mental and emotional well-being',
    recommendations: [
      'Keep doing what you are doing - it is working!',
      'Maintain your positive lifestyle and routines',
      'Consider becoming a support or mentor to others',
      'Use this chatbot for continued personal development',
      'Share your strategies and insights with your community'
    ]
  }
]

// Get assessment level based on score
export const getAssessmentLevel = (score) => {
  return assessmentLevels.find(level => 
    score >= level.range.min && score <= level.range.max
  ) || assessmentLevels[0]
}

// Category-specific insights
export const getCategoryInsights = (categoryName, score) => {
  const insights = {
    anxiety: {
      high: 'Your anxiety levels are elevated. Consider practicing grounding techniques and breathing exercises.',
      moderate: 'You experience moderate anxiety. Mindfulness and gradual exposure can help.',
      low: 'Your anxiety is well-managed. Keep up your positive coping strategies.'
    },
    depression: {
      high: 'You may be experiencing significant depressive symptoms. Please reach out to a mental health professional.',
      moderate: 'You experience some depressive symptoms. Engage in activities you enjoy and maintain social connections.',
      low: 'Your mood is generally positive. Continue engaging in activities that bring you joy.'
    },
    stress: {
      high: 'You are experiencing high stress levels. Prioritize stress-reduction activities.',
      moderate: 'You experience moderate stress. Break tasks into smaller steps and practice relaxation techniques.',
      low: 'You manage stress well. Continue your current strategies.'
    },
    socialConnection: {
      high: 'Your social connections are strong. Keep nurturing these important relationships.',
      moderate: 'Consider reaching out to friends or family more often.',
      low: 'Building social connections may help improve your well-being. Start with small steps.'
    },
    selfEsteem: {
      high: 'Your self-esteem is healthy. Maintain this positive self-view.',
      moderate: 'Work on self-compassion and challenging negative self-talk.',
      low: 'Focus on your strengths and practice self-affirmation daily.'
    },
    lifestyle: {
      high: 'Your lifestyle habits support good mental health. Keep it up!',
      moderate: 'Try to improve one area, like sleep or exercise.',
      low: 'Small improvements in self-care can make a big difference.'
    }
  }

  const category = categoryName.toLowerCase().replace(/[_\s&]/g, '').replace('socialconnectionrelationships', 'socialConnection')
  
  if (score >= 4) {
    return insights[category]?.high || 'Good work maintaining your well-being.'
  } else if (score >= 3) {
    return insights[category]?.moderate || 'Consider ways to improve in this area.'
  } else {
    return insights[category]?.low || 'This area needs some attention.'
  }
}
