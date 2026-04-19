export default function ScoreScreen({ results, onRetry, onNew }) {
  const { questions, userAnswers } = results;
  const correct = questions.filter((q, i) => userAnswers[i] === q.correctIndex).length;
  const total = questions.length;
  const percent = Math.round((correct / total) * 100);

  const emoji = percent === 100 ? "🏆" : percent >= 80 ? "🎉" : percent >= 60 ? "👍" : "💪";
  const message =
    percent === 100 ? "Perfect score! You nailed it." :
    percent >= 80 ? "Great job! Almost perfect." :
    percent >= 60 ? "Good effort. Review the missed ones." :
    "Keep studying — you'll get there!";

  return (
    <div style={styles.page}>
      {/* Score card */}
      <div style={styles.scoreCard}>
        <div style={{ fontSize: "48px", marginBottom: "10px" }}>{emoji}</div>
        <div style={styles.scoreNum}>{correct}/{total}</div>
        <div style={styles.percent}>{percent}% correct</div>
        <p style={styles.message}>{message}</p>
      </div>

      {/* Breakdown */}
      <div style={{ width: "100%", marginBottom: "24px" }}>
        {questions.map((q, i) => {
          const isCorrect = userAnswers[i] === q.correctIndex;
          return (
            <div key={i} style={isCorrect ? styles.correctRow : styles.wrongRow}>
              <div style={{ fontSize: "16px", flexShrink: 0 }}>{isCorrect ? "✅" : "❌"}</div>
              <div>
                <p style={styles.qText}>{q.question}</p>
                {!isCorrect && (
                  <p style={styles.answerLine}>
                    Your answer: <span style={{ color: "#f87171" }}>{q.options[userAnswers[i]] ?? "None"}</span>
                    {" · "}Correct: <span style={{ color: "#86efac" }}>{q.options[q.correctIndex]}</span>
                  </p>
                )}
                <p style={styles.explanation}>{q.explanation}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div style={styles.btnRow}>
        <button onClick={onRetry} style={styles.secondaryBtn}>↺ Retry Quiz</button>
        <button onClick={onNew} style={styles.primaryBtn}>+ New Notes</button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "32px 16px",
    maxWidth: "560px",
    margin: "0 auto",
  },
  scoreCard: {
    width: "100%",
    backgroundColor: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: "20px",
    padding: "32px",
    textAlign: "center",
    marginBottom: "20px",
  },
  scoreNum: {
    fontSize: "48px",
    fontWeight: "700",
    color: "#fff",
    lineHeight: 1,
    marginBottom: "4px",
  },
  percent: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#f9a8d4",
    marginBottom: "8px",
  },
  message: {
    fontSize: "13px",
    color: "#888",
  },
  correctRow: {
    display: "flex",
    gap: "12px",
    backgroundColor: "#0a1a0f",
    border: "1px solid #1a3a20",
    borderRadius: "12px",
    padding: "14px",
    marginBottom: "8px",
  },
  wrongRow: {
    display: "flex",
    gap: "12px",
    backgroundColor: "#1a0a0a",
    border: "1px solid #3a1a1a",
    borderRadius: "12px",
    padding: "14px",
    marginBottom: "8px",
  },
  qText: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#fff",
    marginBottom: "4px",
  },
  answerLine: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "4px",
  },
  explanation: {
    fontSize: "12px",
    color: "#555",
    fontStyle: "italic",
  },
  btnRow: {
    display: "flex",
    gap: "10px",
    width: "100%",
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: "#f9a8d4",
    color: "#0a0a0a",
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: "transparent",
    color: "#888",
    border: "1px solid #2a2a2a",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};