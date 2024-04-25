import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  return (
    <div>
      Home
      <button
        onClick={() => {
          router.push("/login");
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          router.push("/signup");
        }}
      >
        Signup
      </button>
    </div>
  );
}

export default Home;
