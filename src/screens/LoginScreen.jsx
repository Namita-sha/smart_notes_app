import { signInWithGoogle } from "../services/firebase";

export default function LoginScreen() {
  async function handleLogin() {
    try {
      await signInWithGoogle();
    } catch (e) {
      alert("Login failed: " + e.message);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>✦ Recallify</div>
        <p style={styles.tagline}>Your AI-powered study companion</p>
        <p style={styles.sub}>Sign in to save your notes, flashcards and quiz history.</p>
        <button onClick={handleLogin} style={styles.btn}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            style={{ width: "18px", height: "18px" }}
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  card: {
    backgroundColor: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: "20px",
    padding: "40px 32px",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#f9a8d4",
    marginBottom: "8px",
  },
  tagline: {
    fontSize: "14px",
    color: "#fff",
    fontWeight: "600",
    marginBottom: "8px",
  },
  sub: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "28px",
    lineHeight: "1.6",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    backgroundColor: "#fff",
    color: "#111",
    border: "none",
    borderRadius: "10px",
    padding: "13px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};