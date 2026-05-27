import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { error } = await signUp(email, password);

    if (error) {
      setError(error.message);
    } else {
      navigate("/");
    }

  };


  
  return (
    <div className="auth-container">
      <h2>SignUp</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
    <div className="field">
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      

        <button type="submit">SignUp</button>
      </form>
      </div>
    </div>
  );
}

export default SignUp;