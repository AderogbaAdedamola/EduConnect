export const mockQuestionSet = {
  id: "q_12345",
  title: "React & Modern Web Development",
  description: "Test your knowledge of modern web development concepts including React hooks, routing, and styling.",
  category: "Technology",
  aiEnabled: true,
  questionType: "flexible",
  settings: {
    requireLogin: false,
    allowAnonymous: true,
    collectUserData: true
  },
  userDataFields: [
    { label: "Full Name", type: "text", required: true },
    { label: "Email", type: "email", required: false }
  ],
  questions: [
    {
      id: 1,
      type: "Multiple Choice",
      question: "Which hook is used to perform side effects in a functional component?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      required: true,
      points: 10
    },
    {
      id: 2,
      type: "Checkboxes",
      question: "Which of the following are valid React hooks? (Select all that apply)",
      options: ["useFetch", "useMemo", "useCallback", "useHistory"],
      required: true,
      points: 10
    },
    {
      id: 3,
      type: "Short Answer",
      question: "What does CSS stand for?",
      required: true,
      points: 10
    },
    {
      id: 4,
      type: "Paragraph",
      question: "Explain the difference between client-side routing and server-side routing.",
      required: false,
      points: 20
    }
  ]
};
