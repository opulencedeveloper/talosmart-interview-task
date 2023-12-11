import useHttp from "@/hooks/useHttp";
import { useRouter } from "next/router";
import {  useState } from "react";

const commonInputStyle = "w-full h-12 border pl-2";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  

  const { isLoading, error, sendRequest: useAuthRequest } = useHttp();

  
  const useAuthRequestResponse = (res) => {
    const { message } = res;
    if (message === "Login Successful") {
      router.replace("/home");
    }
  };

  const userAuthHandler = (event) => {
    event.preventDefault();

    const url = "login";

    useAuthRequest(
      {
        url,
        method: "POST",
        body: {
          username: email, //"james_hall@gmail.com",
          password: password, //"22suarez",
        },
      },
      useAuthRequestResponse
    );
  };

  return (
    <form
      onSubmit={userAuthHandler}
      className="max-w-lg mx-auto flex flex-col items-center mt-20 px-4"
    >
      <p className="text-2xl font-semibold text-blue-950">Login</p>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <div className="space-y-5 mt-7">
        <input
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Enter email"
          className={commonInputStyle}
        />
        <input
          required
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
          className={commonInputStyle}
        />

        <button
          disabled={isLoading}
          className="bg-blue-950 text-white py-3 rounded-lg w-full"
        >
          {isLoading ? "Please wait.." : "Sign in"}
        </button>
      </div>
    </form>
  );
}
