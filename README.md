# Miko AI Chat Demo

A minimal full-stack web application that allows users to send text or voice messages and receive responses from an AI model.

The project was built as a test assignment for a full-stack developer position I am aiming for. Wish me a good luck!

---

# Features

• Text input for sending questions to AI  
• Voice input using the Web Speech API  
• Chat-style conversation history  
• Loading and error handling states  
• Automatic scrolling for new messages  
• Clean and minimal UI built with Tailwind CSS  
• Secure AI API integration through a backend route

---

# Tech Stack

Frontend:

- Next.js (App Router)
- React
- TypeScript <3
- Tailwind CSS

Backend:

- Next.js Route Handlers (API routes)

AI Integration:

- OpenAI-compatible Chat API

---

# Architecture Overview

The application follows a simple full-stack pattern:

Client → Next.js API route → AI API

1. The client sends a message to `/api/chat`
2. The server validates the request
3. The server calls the AI API
4. The response is returned to the client
5. The message is added to the chat history

The AI API key is stored securely on the server using environment variables.

---

# Project Structure

src
├─ app
│ ├─ page.tsx
│ └─ api
│ └─ chat
│ └─ route.ts
│
├─ components
│ ├─ ChatClient.tsx
│ ├─ ChatMessages.tsx
│ ├─ ChatInput.tsx
│ └─ VoiceButton.tsx
│
├─ lib
│ └─ ai.ts
│
└─ types
├─ chat.ts
└─ speech.d.ts

---

# Getting Started

Clone the repository:

```bash
git clone https://github.com/ImMikobtw/AI-Chat-Demo.git
```

Install dependencies:

```bash
npm install
```

Set up environment variables:

Create a `.env.local` file in the root directory, you can ask me a key BTW:

```bash
OPENAI_API_KEY=fxckingKey
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

# Voice Input

Voice input is implemented using the **Web Speech API**.

When the microphone button is pressed:

1. The browser starts speech recognition
2. Spoken words are converted to text
3. The recognized text is inserted into the message input field

Note:  
Speech recognition is supported in most Chromium-based browsers.

---

# Error Handling

The application handles errors at multiple levels:

Client:

- Network errors
- Disabled input during loading

Server:

- Request validation
- AI API failures
- Unexpected runtime errors

---

# Possible Improvements

If this project were extended further:

- Streaming AI responses
- Persisting chat history
- Message editing
- Dark/light theme switch
- Improved mobile layout
- Rate limiting for API requests

---

# Author

Miras Tleusserik
Full-Stack Developer
