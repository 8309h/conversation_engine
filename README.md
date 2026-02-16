Perfect 👍
Below is your **complete README.md content in one single copy-paste block**.
Just copy everything and paste into your `README.md`.

---

````md
# Modular Conversation Flow Engine

A backend system that powers a modular, question-based conversation flow.

This system allows users to navigate dynamic conversation modules where:
- Each module contains questions
- Each question contains options
- Options determine the next question or module
- Full conversation history is preserved
- Active user state is managed separately
- Deep link recovery is supported
- Checkpoints reset module context safely

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

---

## 🧠 Architecture Overview

The system is built as a graph-based flow engine.

Structure:

Module → Questions → Options → Next Question / Next Module

Each question acts as a node in a directed graph.
Each option acts as an edge pointing to:
- Another question (same module)
- Entry question of another module

### Core Design Principles

1. Separation of Active State and Conversation History
2. Defensive validation for incorrect flows
3. Modular and scalable data modeling
4. Deep link recovery handling
5. Clean REST API design

---

## 📦 Data Models

### 1. Module
- name
- description
- entryQuestionId
- isActive
- timestamps

### 2. Question
- moduleId
- text
- options
  - label
  - nextQuestionId
  - nextModuleId
- isCheckpoint
- timestamps

### 3. UserState
- userId (unique)
- currentModuleId
- currentQuestionId
- moduleContexts
- timestamps

### 4. ConversationHistory
- userId
- moduleId
- questionId
- selectedOptionId
- answeredAt
- timestamps

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd modular-conversation-engine
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory.

Example:

```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

You can use the `.env.example` file as reference.

### 4. Run Server

```bash
npm run dev
```

Server will start on:

```
http://localhost:5000
```

---

## 📌 API Endpoints

### Admin APIs

Create Module
POST `/admin/modules`

Create Question
POST `/admin/questions`

Set Module Entry Question
PATCH `/admin/modules/:moduleId/entry`

Link Option to Next Question or Module
PATCH `/admin/questions/:questionId/options/:optionId`

Get Module with Questions
GET `/admin/modules/:moduleId`

---

### User APIs

Start Module
POST `/user/start/:moduleId`

Get Current Question
GET `/user/current/:userId`

Answer Question
POST `/user/answer`

Deep Link Recovery
GET `/user/deeplink/:questionId?userId=...`

---

## 🔄 Flow Behavior

The system supports:

* Moving within the same module
* Switching between modules
* Preserving full conversation history
* Maintaining active user state
* Resetting module context using checkpoint questions
* Recovering safely from old deep links

---

## 🛡 Defensive Handling

The system validates:

* Users cannot answer non-current questions
* Invalid options are rejected
* Broken question references are validated
* Only one of nextQuestionId or nextModuleId can be set
* Deep links are validated against current state

---

## 🔍 Deep Link Recovery Logic

If a user opens a deep link to a specific question:

* If it matches the user's current active question → it is returned
* If it is outdated → the system returns the latest valid question

This ensures flow integrity and prevents broken navigation.

---

## 🧪 Testing

All endpoints can be tested using Postman.

Recommended test order:

1. Create module
2. Create questions
3. Set entry question
4. Link options
5. Start module (user)
6. Navigate using answer API
7. Test deep link recovery

---



