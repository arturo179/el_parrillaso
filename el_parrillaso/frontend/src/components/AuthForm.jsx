import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function AuthForm() {
  const { signUp, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp(e) {
    e.preventDefault();
    const { error } = await signUp(email, password);
    if (error) alert(error.message);
    else alert("Account created!");
  }

  async function handleSignIn(e) {
    e.preventDefault();
    const { error } = await signIn(email, password);
    if (error) alert(error.message);
    else alert("Logged in!");
  }

  return (
    <div>
      <h2>Create Account</h2>

      <form>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleSignIn}>Login</button>
      </form>
    </div>
  );
}

export default AuthForm;