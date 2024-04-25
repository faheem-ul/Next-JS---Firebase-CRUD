import { useState } from "react";

import { useRouter } from "next/router";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebaseConfig";

function Login() {
  const router = useRouter();
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const handleLoginFormSubmit = async () => {
    setLoginError("");
    if (loginEmail === "" || loginPassword === "") {
      alert("Please enter all the fields");
    } else {
      try {
        const loginUserCredentials = await signInWithEmailAndPassword(
          auth,
          loginEmail,
          loginPassword
        );
        console.log("login successful");

        router.push("/dashboard");
      } catch (error: any) {
        setLoginError(error.message);
        console.log("error in login", error);
      }
    }
  };

  return (
    <div>
      Login
      <form
        onSubmit={(e) => {
          e.preventDefault();
          {
            handleLoginFormSubmit();
          }
        }}
      >
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
      {loginError && <p>{loginError}</p>}
    </div>
  );
}

export default Login;
