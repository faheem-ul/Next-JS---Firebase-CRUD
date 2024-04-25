import React, { useState } from "react";

import { useRouter } from "next/router";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import { auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";

function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignupSubmit = async () => {
    setError("");

    if (name === "" || email === "" || password === "") {
      alert("Please fill all the fields");
    } else {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // console.log(userCredentials);
        const uid = userCredentials.user.uid;
        console.log(uid);

        const userdata = {
          Name: name,

          Email: email,
          Password: password,
        };

        await setDoc(doc(db, "signups", uid), userdata);

        router.push("/dashboard");
      } catch (err: any) {
        setError(err.message);
        console.log(err);
      }
    }
  };

  return (
    <div className=" flex flex-col gap-5">
      Signup
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignupSubmit();
        }}
      >
        <input
          placeholder="Name"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          placeholder="Email"
          type="emial"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Signup</button>
      </form>
      <p>{error}</p>
    </div>
  );
}

export default Signup;
("");
