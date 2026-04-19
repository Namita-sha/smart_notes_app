import { useState } from "react";

export default function FlashcardsTab({ cards }) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  function next() {
    setFlipped(false);
    setTimeout(() => setCurrent((c) => (c + 1) % cards.length), 150);
  }

  function prev() {
    setFlipped(false);
    setTimeout(() => setCurrent((c) => (c - 1 + cards.length) % cards.length), 150);
  }

  const card = cards[current];

  return (
    <div style={styles.wrapper}>
      <p style={styles.counter}>Card {current + 1} of {cards.length}</p>

      {/* Flip card */}
      <div
        style={{ perspective: "1000px", width: "100%", cursor: "pointer" }}
        onClick={() => setFlipped((f) => !f)}
      >
        <div style={{
          position: "relative",
          height: "220px",
          transformStyle: "preserve-3d",
          transition: "transform 0.5s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>
          {/* Front */}
          <div style={{ ...styles.face, ...styles.front }}>
            <span style={styles.faceLabel}>Question</span>
            <p style={styles.faceText}>{card.question}</p>
            <p style={styles.tapHint}>Tap to reveal answer</p>
          </div>
          {/* Back */}
          <div style={{ ...styles.face, ...styles.back }}>
            <span style={{ ...styles.faceLabel, color: "#86efac" }}>Answer</span>
            <p style={styles.faceText}>{card.answer}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <button onClick={prev} style={styles.navBtn}>←</button>
        <button onClick={() => setFlipped((f) => !f)} style={styles.flipBtn}>↺ Flip</button>
        <button onClick={next} style={styles.navBtn}>→</button>
      </div>

      {/* Dots */}
      <div style={styles.dots}>
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => { setFlipped(false); setCurrent(i); }}
            style={{
              height: "6px",
              width: i === current ? "20px" : "6px",
              borderRadius: "99px",
              backgroundColor: i === current ? "#f9a8d4" : "#2a2a2a",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "32px",
  },
  counter: {
    fontSize: "12px",
    color: "#555",
    marginBottom: "20px",
  },
  face: {
    position: "absolute",
    inset: 0,
    borderRadius: "18px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    textAlign: "center",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  },
  front: {
    backgroundColor: "#111",
    border: "1px solid #1e1e1e",
  },
  back: {
    backgroundColor: "#1a0d12",
    border: "1px solid #3d1a28",
    transform: "rotateY(180deg)",
  },
  faceLabel: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#f9a8d4",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: "14px",
  },
  faceText: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#fff",
    lineHeight: "1.5",
  },
  tapHint: {
    fontSize: "11px",
    color: "#444",
    marginTop: "16px",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "20px",
  },
  navBtn: {
    backgroundColor: "transparent",
    border: "1px solid #2a2a2a",
    color: "#888",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  flipBtn: {
    backgroundColor: "transparent",
    border: "1px solid #2a2a2a",
    color: "#888",
    borderRadius: "99px",
    padding: "8px 18px",
    cursor: "pointer",
    fontSize: "12px",
    fontFamily: "inherit",
  },
  dots: {
    display: "flex",
    gap: "6px",
    marginTop: "18px",
  },
};