# EduConnect: Backend API Specifications & Requirements

This document outlines the entire backend architecture, API contracts, and requirements for the EduConnect platform. The frontend relies on these exact payload structures and endpoints.

## Backend Architecture Overview

1. **RESTful JSON API**: Base URL expected to be `https://api.educonnect.app/v1`.
2. **Authentication**: Stateless JWT token-based auth. Tokens are passed via `Authorization: Bearer <token>` headers.
3. **Real-Time Communication**: WebSocket connection for live chat and notifications.
4. **Third-party Integrations**: 
   - **Anthropic AI**: Backend must securely proxy and parse requests to Claude 3.5 Sonnet for question generation and feedback.
   - **Cloud Storage (AWS S3 / Cloudinary)**: Backend must handle file uploads for avatars and question images.

---

## 1. Authentication & Users

### User Registration
- **`POST /api/auth/register`**
  - Payload: `{ email, password, name }`
  - Response: `{ token, user: { id, name, email, avatarUrl, createdAt } }`

### User Login
- **`POST /api/auth/login`**
  - Payload: `{ email, password }`
  - Response: `{ token, user: { id, name, email, avatarUrl } }`

### Get Current User Profile
- **`GET /api/auth/me`**
  - Response: `{ user: { id, name, email, avatarUrl } }`

### Update User Profile
- **`PUT /api/users/me`**
  - Payload: `{ name, avatarUrl }`
  - Response: `{ user: { id, name, email, avatarUrl } }`

---

## 2. Question Sets (Quizzes & Flexible Forms)

### Create a Question Set
- **`POST /api/questions`**
  - Payload:
    ```json
    {
      "title": "React Basics",
      "description": "A quick quiz on React hooks.",
      "category": "Technology",
      "aiEnabled": true,
      "questionType": "quiz",
      "quizSettings": { "timerMin": 15, "timerSec": 0, "pointsPerQuestion": 10 },
      "settings": {
        "requireLogin": false,
        "allowAnonymous": true,
        "oneResponseOnly": false,
        "showRespondentsToCreator": true,
        "showResultsToRespondent": true,
        "hasDeadline": false,
        "deadline": null,
        "collectUserData": true
      },
      "userDataFields": [
        { "label": "Full Name", "type": "text", "required": true }
      ],
      "questions": [
        {
          "type": "Multiple Choice",
          "content": "<p>What is a hook?</p>",
          "options": ["A function", "A component", "A class"],
          "correctAnswers": [0],
          "required": true,
          "points": 10
        }
      ]
    }
    ```
  - Response: `{ id: "q_12345", shareableUrl: "https://educonnect.app/answer/q_12345" }`

### Fetch a Question Set (For Respondents)
- **`GET /api/questions/:id`**
  - Response: Returns the full question set object. If `requireLogin` is true, 401 Unauthorized if no valid token is provided.

### Fetch User's Created Question Sets (History)
- **`GET /api/questions/me`**
  - Response: Array of summary objects `{ id, title, responseCount, createdAt, status, category }`.

### Discover Public Question Sets
- **`GET /api/questions/discover?query=react&category=tech&sort=recent`**
  - Response: Array of public quizzes `{ id, title, creator: {name, avatarUrl}, category, usesAI, responseCount }`.

---

## 3. Submissions & Responses

### Submit an Answer
- **`POST /api/questions/:id/responses`**
  - Payload:
    ```json
    {
      "isAnonymous": true,
      "respondentInfo": { "Full Name": "John Doe" },
      "answers": [
        { "questionIndex": 0, "value": [0] } // array for checkboxes, string for text
      ],
      "timeTakenSeconds": 120
    }
    ```
  - Response: `{ responseId: "r_9876", score: 10, aiFeedback: [{ questionIndex: 0, feedback: "Great job!" }] }`

### Get Responses for a Question Set (Creator Dashboard)
- **`GET /api/questions/:id/responses`**
  - Response: 
    ```json
    {
      "overview": { "total": 45, "avgScore": 85, "completionRate": 90 },
      "responses": [
        {
          "responseId": "r_9876",
          "user": { "id": "u_1", "name": "John Doe" }, // null if anonymous
          "score": 10,
          "submittedAt": "2026-06-06T12:00:00Z",
          "answers": [...]
        }
      ]
    }
    ```

---

## 4. Real-time Messaging (WebSockets)

### WebSocket Connection
- **Endpoint:** `wss://api.educonnect.app/ws`
- **Auth:** Pass JWT token in initial connection payload or headers.

### HTTP Endpoints for Chat History
- **`POST /api/chat/request`** (Respondent initiates chat)
  - Payload: `{ responseId: "r_9876", initialMessage: "Can you explain Q1?" }`
- **`GET /api/chat/requests?questionId=q_12345`** (Creator views pending requests)
- **`POST /api/chat/requests/:requestId/accept`** (Creator accepts)
- **`GET /api/chat/:threadId/messages`** (Fetch message history for a thread)

### WebSocket Events
- **`subscribe`**: Client subscribes to a specific `threadId`.
- **`send_message`**: Client sends `{ threadId, content }`.
- **`new_message`**: Server pushes `{ messageId, threadId, senderId, content, timestamp }` to clients.

---

## 5. AI Integration (Proxied Endpoints)

The frontend must NOT expose Anthropic keys. The backend handles prompt engineering.

### Generate Quiz Questions via AI
- **`POST /api/ai/generate-questions`**
  - Payload: `{ topic: "React Hooks", count: 5, difficulty: "intermediate" }`
  - Response: `{ questions: [ {type, content, options, correctAnswers} ] }`

### Chat with AI Assistant (Creator Workspace)
- **`POST /api/ai/chat`**
  - Payload: `{ messages: [{role: "user", content: "Make a math quiz"}] }`
  - Response: `{ reply: "Here is your quiz...", generatedQuestions: [...] }`

---

## 6. File Uploads

### Upload Image/Media
- **`POST /api/upload`**
  - Payload: `FormData` containing the file.
  - Response: `{ url: "https://storage.provider.com/file_123.jpg" }`
