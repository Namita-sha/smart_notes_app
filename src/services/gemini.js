const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function processNotes(rawNotes, topic) {
  const prompt = `
You are a study assistant. A student has given you raw notes on the topic: "${topic}".

Raw notes:
"""
${rawNotes}
"""

Return a single valid JSON object (no markdown, no backticks, just pure JSON) with this exact structure:

{
  "cleanNotes": {
    "summary": "2-3 sentence overview of the topic",
    "sections": [
      {
        "heading": "Section Title",
        "points": ["point 1", "point 2", "point 3"]
      }
    ],
    "keyTerms": [
      { "term": "term name", "definition": "short definition" }
    ]
  },
  "flashcards": [
    { "question": "Question on front of card", "answer": "Answer on back of card" }
  ],
  "quiz": [
    {
      "question": "MCQ question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Why this answer is correct"
    }
  ]
}

Rules:
- cleanNotes must have 3-5 sections with 3-5 points each
- keyTerms must have 4-6 important terms
- flashcards must have exactly 6 cards
- quiz must have exactly 5 questions
- correctIndex is 0-based (0 = first option)
- Return ONLY the JSON. No extra text.
`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 3000 },
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.error?.message || "Gemini API error");
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("No response from Gemini");

  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}