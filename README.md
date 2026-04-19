# Recallify

An AI-powered study tool that transforms raw notes into structured study material. Paste unorganized notes and get clean notes, flashcards, and a scored quiz — instantly.

Live: https://smart-notes-app-tawny.vercel.app  
Repository: https://github.com/Namita-sha/smart_notes_app

---

## Features

- AI-generated clean notes with summaries, sections, and key terms
- Interactive flashcards with 3D flip animation
- 5-question multiple choice quiz with scoring and explanations
- Google authentication via Firebase
- Study session history saved per user
- Fully responsive dark theme UI

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework |
| Tailwind CSS | Styling |
| Gemini 2.5 Flash API | AI note processing |
| Firebase Auth | Google sign-in |
| Cloud Firestore | Session storage |
| Vercel | Deployment |

---

## Project Structure

```
src/
  screens/
    InputScreen.jsx       # Note input form
    OutputScreen.jsx      # Notes, flashcards, quiz tabs
    ScoreScreen.jsx       # Quiz results and explanations
    LoginScreen.jsx       # Google sign-in
    HistoryScreen.jsx     # Past study sessions
  components/
    Flashcard.jsx         # 3D flip card component
  context/
    AuthContext.jsx       # Firebase auth state
  services/
    firebase.js           # Auth and Firestore functions
    gemini.js             # Gemini API integration
  App.jsx
  main.jsx
```

---

## Local Setup

**Prerequisites:** Node.js 18+

**1. Clone the repository**
```bash
git clone https://github.com/Namita-sha/smart_notes_app.git
cd smart_notes_app
```

**2. Install dependencies**
```bash
npm install
```

**3. Create a `.env` file in the project root**
```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**4. Run the development server**
```bash
npm run dev
```

Open `http://localhost:5173`

---

## Environment Variables

| Variable | Where to get it |
|---|---|
| `VITE_GEMINI_API_KEY` | Google AI Studio |
| `VITE_FIREBASE_*` | Firebase Console > Project Settings > Your apps |

---

## Firebase Setup

1. Create a project at firebase.google.com
2. Enable Google sign-in under Authentication > Sign-in method
3. Create a Firestore database
4. Add a composite index on the `sessions` collection: `userId` (Ascending) + `createdAt` (Descending)
5. Add `localhost` to Authentication > Settings > Authorized domains

---

## Deployment

The app is deployed on Vercel. To deploy your own instance:

1. Push the repository to GitHub
2. Import the project on vercel.com
3. Add all environment variables from `.env` in the Vercel project settings
4. Deploy
5. Add your Vercel URL to Firebase authorized domains

---

## How It Works

1. User signs in with Google
2. User pastes raw notes and enters a topic
3. A single prompt is sent to Gemini 2.5 Flash requesting a structured JSON response
4. The response is parsed into three views: clean notes, flashcards, and a quiz
5. After completing the quiz, the session is saved to Firestore
6. User can revisit past sessions from the History screen

---

## Author

Namita Sharma  
GitHub: https://github.com/Namita-sha