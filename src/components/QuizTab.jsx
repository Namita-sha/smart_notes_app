import { useState } from "react";

export default function QuizTab({ questions, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const q = questions[current];
  const isLast = current === questions.length - 1;

  function handleSelect(idx) {
    if (showFeedback) return;
    setSelected(idx);
  }

  function handleCheck() {
    if (selected === null) return;
    setShowFeedback(true);
  }

  function handleNext() {
    if (selected === null) return;
    const newAnswers = [...userAnswers, selected];
    if (isLast) {
      onComplete({ questions, userAnswers: newAnswers });
    } else {
      setUserAnswers(newAnswers);
      setShowFeedback(false);
      setSelected(null);
      setCurrent((c) => c + 1);
    }
  }

  function getOptionStyle(idx) {
    const base = {
      width: "100%",
      textAlign: "left",
      padding: "12px 14px",
      borderRadius: "10px",
      border: "1px solid",
      fontSize: "13px",
      cursor: showFeedback ? "default" : "pointer",
      fontFamily: "inherit",
      marginBottom: "8px",
      transition: "all 0.15s",
      backgroundColor: "transparent",
    };
    if (!showFeedback) {
      return selected === idx
        ? { ...base, borderColor: "#f9a8d4", backgroundColor: "#1a0d12", color: "#fff" }
        : { ...base, borderColor: "#2a2a2a", color: "#aaa" };
    }
    if (idx === q.correctIndex)
      return { ...base, borderColor: "#4ade80", backgroundColor: "#0a1a0f", color: "#86efac" };
    if (idx === selected && idx !== q.correctIndex)
      return { ...base, borderColor: "#f87171", backgroundColor: "#1a0a0a", color: "#f87171" };
    return { ...base, borderColor: "#1a1a1a", color: "#444" };
  }

  return (
    <div style={{ paddingBottom: "32px" }}>
      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <div style={{ flex: 1, height: "4px", backgroundColor: "#1a1a1a", borderRadius: "99px" }}>
          <div style={{
            height: "4px",
            backgroundColor: "#f9a8d4",
            borderRadius: "99px",
            width: `${(current / questions.length) * 100}%`,
            transition: "width 0.3s",
          }} />
        </div>
        <span style={{ fontSize: "11px", color: "#555" }}>{current + 1}/{questions.length}</span>
      </div>

      {/* Question */}
      <div style={styles.questionBox}>
        <p style={styles.qLabel}>Question {current + 1}</p>
        <p style={styles.qText}>{q.question}</p>
      </div>

      {/* Options */}
      <div style={{ marginBottom: "16px" }}>
        {q.options.map((opt, idx) => (
          <button key={idx} onClick={() => handleSelect(idx)} style={getOptionStyle(idx)}>
            <span style={{ color: "#555", marginRight: "8px", fontWeight: "600" }}>
              {["A", "B", "C", "D"][idx]}.
            </span>
            {opt}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {showFeedback && (
        <div style={styles.explanation}>
          <span style={{ fontWeight: "600", color: "#ddd" }}>Why? </span>
          {q.explanation}
        </div>
      )}

      {/* Action button */}
      {!showFeedback ? (
        <button
          onClick={handleCheck}
          disabled={selected === null}
          style={selected === null ? styles.btnDisabled : styles.btn}
        >
          Check Answer
        </button>
      ) : (
        <button onClick={handleNext} style={styles.btn}>
          {isLast ? "🏆 See Results" : "Next Question →"}
        </button>
      )}
    </div>
  );
}

const styles = {
  questionBox: {
    backgroundColor: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "14px",
  },
  qLabel: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#f9a8d4",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: "8px",
  },
  qText: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#fff",
    lineHeight: "1.6",
  },
  explanation: {
    backgroundColor: "#111",
    border: "1px solid #2a2a2a",
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "13px",
    color: "#888",
    marginBottom: "16px",
    lineHeight: "1.5",
  },
  btn: {
    width: "100%",
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
  btnDisabled: {
    width: "100%",
    backgroundColor: "#1a1a1a",
    color: "#444",
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "not-allowed",
    fontFamily: "inherit",
  },
};