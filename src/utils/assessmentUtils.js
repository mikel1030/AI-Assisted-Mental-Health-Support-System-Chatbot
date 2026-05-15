// Assessment-aware personalized tips and coping strategies
// This creates UNIQUE advice based on each user's specific mental health profile

export const getPersonalizedAdvice = (categoryScores, overallScore) => {
  const advice = {}

  // ANXIETY - Specific strategies based on severity
  if (categoryScores.anxiety) {
    const anxietyScore = categoryScores.anxiety.score
    if (anxietyScore >= 4) {
      advice.anxiety = {
        severity: 'High',
        strategy: 'Grounding Technique (5-4-3-2-1)',
        steps: [
          '• Name 5 things you see',
          '• Name 4 things you can touch',
          '• Name 3 things you hear',
          '• Name 2 things you smell',
          '• Name 1 thing you taste'
        ],
        rationale: 'This brings you back to the present moment and interrupts anxiety spirals.',
        tip: 'Practice when calm so it\'s easier during panic moments.'
      }
    } else if (anxietyScore >= 2) {
      advice.anxiety = {
        severity: 'Moderate',
        strategy: 'Box Breathing',
        steps: [
          '• Breathe in for 4 counts',
          '• Hold for 4 counts',
          '• Breathe out for 4 counts',
          '• Hold for 4 counts',
          '• Repeat 5 times'
        ],
        rationale: 'Slows your nervous system and creates calm.',
        tip: 'Do this before challenging situations.'
      }
    }
  }

  // DEPRESSION - Motivational strategies
  if (categoryScores.depression) {
    const depressionScore = categoryScores.depression.score
    if (depressionScore >= 4) {
      advice.depression = {
        severity: 'High',
        strategy: 'Behavioral Activation (Start Small)',
        steps: [
          '• Pick ONE small activity today (10-15 mins)',
          '• Could be: walk, call a friend, stretch',
          '• Do it at a set time each day',
          '• Track how you feel before & after',
          '• Build gradually - no pressure'
        ],
        rationale: 'Low mood makes us inactive, but inactivity deepens depression. Small actions rebuild momentum.',
        tip: 'The activity doesn\'t need to be big or fun — it just needs to happen.'
      }
    } else if (depressionScore >= 2) {
      advice.depression = {
        severity: 'Mild-Moderate',
        strategy: 'Mood Boosting Routine',
        steps: [
          '• Morning: 10-min sunlight exposure',
          '• Mid-day: Do something you enjoy (hobby, music)',
          '• Evening: Connect with someone (text, call, visit)',
          '• Night: Gratitude - write 3 things you\'re grateful for'
        ],
        rationale: 'Combats depression through light, pleasure, connection, and positivity.',
        tip: 'Consistency matters more than intensity.'
      }
    }
  }

  // STRESS - Problem-solving & boundary strategies
  if (categoryScores.stress) {
    const stressScore = categoryScores.stress.score
    if (stressScore >= 4) {
      advice.stress = {
        severity: 'High',
        strategy: 'The Worry Time Technique',
        steps: [
          '• Set a 15-min "worry block" (same time daily)',
          '• When worried outside this time, write it down & postpone',
          '• During worry time, process your concerns',
          '• After 15 mins, switch to problem-solving or distraction'
        ],
        rationale: 'Containment prevents worry from consuming your entire day.',
        tip: 'This sounds simple but is surprisingly effective.'
      }
    } else if (stressScore >= 2) {
      advice.stress = {
        severity: 'Moderate',
        strategy: 'Boundary Setting',
        steps: [
          '• Identify what\'s within YOUR control',
          '• For things outside control, practice acceptance',
          '• Set clear work/personal time boundaries',
          '• Learn to say "no" to non-essential tasks',
          '• Delegate or ask for help when possible'
        ],
        rationale: 'Most stress comes from taking responsibility for things you can\'t control.',
        tip: 'Practice with small "no"s first — it gets easier.'
      }
    }
  }

  // SOCIAL CONNECTION - Isolation intervention
  if (categoryScores.socialConnection) {
    const socialScore = categoryScores.socialConnection.score
    if (socialScore <= 2) {
      advice.socialConnection = {
        severity: 'High Isolation Risk',
        strategy: 'Micro-Connection Plan',
        steps: [
          '• Daily: Text 1 person (doesn\'t have to be deep)',
          '• 2-3x/week: Brief call with someone',
          '• Weekly: In-person hangout or group activity',
          '• Join an online community around your interests'
        ],
        rationale: 'Isolation amplifies negative emotions. Small connections rebuild your support network.',
        tip: 'Start with the person you feel most comfortable with.'
      }
    } else if (socialScore <= 4) {
      advice.socialConnection = {
        severity: 'Mild Isolation',
        strategy: 'Deepen Existing Connections',
        steps: [
          '• Move from group chats to 1-on-1 conversations',
          '• Share something real about how you\'re feeling',
          '• Invite someone to do something together',
          '• Be vulnerable — it strengthens bonds'
        ],
        rationale: 'Quality matters more than quantity. Real connections require vulnerability.',
        tip: 'You might be surprised how receptive people are.'
      }
    }
  }

  // SELF-ESTEEM - Confidence building
  if (categoryScores.selfEsteem) {
    const selfEsteemScore = categoryScores.selfEsteem.score
    if (selfEsteemScore <= 2) {
      advice.selfEsteem = {
        severity: 'Critical',
        strategy: 'Self-Compassion Practice',
        steps: [
          '• When you fail or feel bad: place hand on heart',
          '• Say: "I\'m struggling right now, and that\'s okay"',
          '• Remember: Everyone fails. You\'re not alone.',
          '• List 3 past challenges you overcame',
          '• Be your own best friend, not your worst critic'
        ],
        rationale: 'Low self-esteem is fed by self-criticism. Compassion breaks the cycle.',
        tip: 'This feels awkward at first, but research shows it works.'
      }
    } else if (selfEsteemScore <= 3.5) {
      advice.selfEsteem = {
        severity: 'Moderate',
        strategy: 'Win-Building Strategy',
        steps: [
          '• Accomplish 1 small goal daily (any size)',
          '• Celebrate it - tell someone or journal',
          '• Review weekly wins (you have more than you think)',
          '• Practice accepting compliments: "Thank you" only',
          '• Notice your strengths without comparing to others'
        ],
        rationale: 'Self-esteem grows through action and acknowledgment, not just thinking positive.',
        tip: 'Small consistent wins build real confidence.'
      }
    }
  }

  // LIFESTYLE - Self-care priority
  if (categoryScores.lifestyle) {
    const lifestyleScore = categoryScores.lifestyle.score
    if (lifestyleScore <= 2) {
      advice.lifestyle = {
        severity: 'Critical - Basics Neglected',
        strategy: 'Non-Negotiable Wellness Foundation',
        steps: [
          '• Sleep: Aim for 7 hrs (non-negotiable)',
          '• Movement: 20-min walk daily',
          '• Nutrition: Eat at least 1 real meal (not junk)',
          '• Water: Drink 6-8 glasses',
          '• Start with ONE habit for 1 week, then add more'
        ],
        rationale: 'These basics DIRECTLY affect mood, anxiety, and energy. Ignore them and everything else is harder.',
        tip: 'You can\'t think your way out of poor health basics. Fix the body, mind follows.'
      }
    } else if (lifestyleScore <= 3) {
      advice.lifestyle = {
        severity: 'Inconsistent',
        strategy: 'Routine Lock-In',
        steps: [
          '• Set fixed times: sleep, meals, movement',
          '• Use phone alarms/calendar reminders',
          '• Connect each habit to an existing routine',
          '• Example: After breakfast = 10-min walk',
          '• Track for 2 weeks to make it stick'
        ],
        rationale: 'Your health habits aren\'t failing because you\'re lazy — you need structure and triggers.',
        tip: 'Willpower is finite. Systems are forever.'
      }
    }
  }

  return advice
}

// Generate a custom assessment summary with action items
export const generateAssessmentSummary = (categoryScores, overallScore, assessmentLevel) => {
  const topAreas = Object.entries(categoryScores)
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 2)
    .map(([key, data]) => data.name)

  const criticalAreas = Object.entries(categoryScores)
    .filter(([key, data]) => data.score >= 4)
    .map(([key, data]) => data.name)

  const strengthAreas = Object.entries(categoryScores)
    .filter(([key, data]) => data.score <= 2)
    .map(([key, data]) => data.name)

  return {
    summary: `Your overall mental health assessment shows you're at a ${assessmentLevel.name} level. This assessment helps me understand what you're dealing with so I can give you advice that actually matters to YOUR situation.`,
    topChallenges: topAreas.length > 0 ? `Your biggest challenges seem to be around ${topAreas.join(' and ')}. We can work on strategies specific to these.` : null,
    criticalAreas: criticalAreas.length > 0 ? `These areas need attention: ${criticalAreas.join(', ')}. Let's focus here first.` : null,
    strengths: strengthAreas.length > 0 ? `You're doing well in: ${strengthAreas.join(', ')}. Keep these up!` : null,
    nextSteps: 'As we chat, I\'ll give you personalized tips. And feel free to retake this assessment anytime to track your progress.'
  }
}

// Get a motivational message based on their profile
export const getMotivationalMessage = (categoryScores, overallScore) => {
  const messages = {
    crisis: [
      'Kumusta, I see you\'re going through a lot right now. You reaching out here — that takes strength. Let\'s work through this together.',
      'Things feel heavy right now, and that\'s real. But you showing up? That\'s the first step to getting better.',
      'I\'m here. You\'re not alone in this. We\'ll take it one moment at a time.'
    ],
    struggling: [
      'I can see you\'re struggling with a few things. That\'s actually good news — it means you\'re aware, and awareness is where change starts.',
      'It\'s not easy what you\'re dealing with, pero kaya mo yan. Let\'s find some actual strategies that work for you.',
      'You reached out here — that shows you\'re not giving up. Let\'s use this conversation to make things better.'
    ],
    managing: [
      'You\'re managing pretty well overall. Let\'s work on those areas you identified so you can feel even better.',
      'You\'re in a good space to work on some improvements. This is the time to build better habits.',
      'You\'re doing okay, pero let\'s help you get to great. What do you want to focus on?'
    ],
    thriving: [
      'You\'re doing really well! Let\'s talk about how to keep this momentum going and maybe help others along the way.',
      'Your mental health is in a good place. Nandito kami to make sure it stays that way and keeps getting better.',
      'You\'re thriving — that\'s awesome. Let\'s talk about what\'s working and how to maintain it.'
    ]
  }

  const level = overallScore >= 4 ? 'thriving' : overallScore >= 2.5 ? 'managing' : overallScore >= 1.5 ? 'struggling' : 'crisis'
  return messages[level][Math.floor(Math.random() * messages[level].length)]
}

// Check if areas are worsening (compare with previous assessment)
export const checkAssessmentProgress = (currentResults, previousResults) => {
  if (!previousResults) return { isFirstAssessment: true, message: 'This is your first assessment - great start!' }

  const worseningAreas = []
  const improvingAreas = []

  Object.entries(currentResults.categoryScores).forEach(([key, current]) => {
    const previous = previousResults.categoryScores[key]
    if (previous) {
      const difference = current.score - previous.score
      if (difference > 1) {
        worseningAreas.push({ name: current.name, change: Math.round(difference * 10) / 10 })
      } else if (difference < -1) {
        improvingAreas.push({ name: current.name, change: Math.round(Math.abs(difference) * 10) / 10 })
      }
    }
  })

  return {
    isFirstAssessment: false,
    worseningAreas,
    improvingAreas,
    message: improvingAreas.length > 0 
      ? `Great progress! You\'ve improved in ${improvingAreas.map(a => a.name).join(', ')}.` 
      : worseningAreas.length > 0
      ? `Some areas need more attention: ${worseningAreas.map(a => a.name).join(', ')}. Let\'s focus there.`
      : 'Your scores stayed about the same. Let\'s work on consistency.'
  }
}
