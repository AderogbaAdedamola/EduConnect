// src/data/mockQuestions.js
export const mockQuestions = [
  {
    id: 1,
    title: 'Solve the quadratic equation: x² - 5x + 6 = 0',
    content: 'Find the roots and explain your steps',
    category: 'Mathematics',
    creator: {
      username: 'math_expert',
      avatar: null
    },
    createdAt: '2024-01-15T10:30:00Z',
    answerCount: 24,
    aiEnabled: true,
    responseType: 'text',
    difficulty: 'intermediate',
    tags: ['algebra', 'quadratic', 'equations']
  },
  {
    id: 2,
    title: 'Explain the concept of chemical bonding',
    content: 'Compare ionic, covalent, and metallic bonds with examples',
    category: 'Chemistry',
    creator: {
      username: 'chem_prof',
      avatar: null
    },
    createdAt: '2024-01-14T14:20:00Z',
    answerCount: 15,
    aiEnabled: true,
    responseType: 'both',
    difficulty: 'beginner',
    tags: ['chemical bonding', 'ionic', 'covalent']
  },
  {
    id: 3,
    title: 'JavaScript closure concept with practical example',
    content: 'Explain closures in JavaScript and provide a real-world use case',
    category: 'Programming',
    creator: {
      username: 'js_dev',
      avatar: null
    },
    createdAt: '2024-01-13T09:15:00Z',
    answerCount: 8,
    aiEnabled: false,
    responseType: 'text',
    difficulty: 'intermediate',
    tags: ['javascript', 'closures', 'web-dev']
  },
  {
    id: 4,
    title: 'Newton\'s laws of motion application',
    content: 'Solve this physics problem involving force and acceleration',
    category: 'Physics',
    creator: {
      username: 'physics_guru',
      avatar: null
    },
    createdAt: '2024-01-12T16:45:00Z',
    answerCount: 32,
    aiEnabled: true,
    responseType: 'image',
    difficulty: 'advanced',
    tags: ['physics', 'newton', 'motion']
  },
  {
    id: 5,
    title: 'World War II causes and consequences',
    content: 'Analyze the main causes and global impact of WWII',
    category: 'History',
    creator: {
      username: 'history_buff',
      avatar: null
    },
    createdAt: '2024-01-11T11:20:00Z',
    answerCount: 18,
    aiEnabled: true,
    responseType: 'text',
    difficulty: 'intermediate',
    tags: ['history', 'wwii', '20th-century']
  },
  {
    id: 6,
    title: 'Cell structure and function in biology',
    content: 'Describe the main organelles and their functions',
    category: 'Biology',
    creator: {
      username: 'bio_teacher',
      avatar: null
    },
    createdAt: '2024-01-10T08:45:00Z',
    answerCount: 22,
    aiEnabled: true,
    responseType: 'both',
    difficulty: 'beginner',
    tags: ['biology', 'cells', 'organelles']
  },
  {
    id: 7,
    title: 'Market analysis for startup businesses',
    content: 'How to conduct effective market research for new ventures',
    category: 'Business',
    creator: {
      username: 'entrepreneur',
      avatar: null
    },
    createdAt: '2024-01-09T13:20:00Z',
    answerCount: 11,
    aiEnabled: false,
    responseType: 'text',
    difficulty: 'advanced',
    tags: ['business', 'marketing', 'startup']
  },
  {
    id: 8,
    title: 'Python list comprehension vs loops',
    content: 'When to use list comprehensions and when to use traditional loops',
    category: 'Programming',
    creator: {
      username: 'python_master',
      avatar: null
    },
    createdAt: '2024-01-08T17:30:00Z',
    answerCount: 27,
    aiEnabled: true,
    responseType: 'text',
    difficulty: 'intermediate',
    tags: ['python', 'programming', 'efficiency']
  }
]