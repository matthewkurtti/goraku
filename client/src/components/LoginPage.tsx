import React, { useEffect } from "react";
import { getData, postData } from "../helpers/fetchHelper";
import { User } from "../globalTypes";

type LoginPageProps = {
  setPage: Function;
  setLoggedInUser: Function;
  loggedInUser: User | null;
};

const LoginPage: React.FC<LoginPageProps> = (props) => {
  // changes database target URL depending on current environment
  const url: string =
    process.env.NODE_ENV === "production" ? "/" : "http://localhost:8080/";

  // useStates and variables

  // useEffect
  useEffect(() => {
    logOutPreviousSession();
  }, []);

  const logOutPreviousSession = async () => {
    if (props.loggedInUser) {
      const response = await getData(url, "api/auth/logout");
      console.log(response);
    }
  };

  // handlers
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const usernameInput = document.getElementById(
      "username"
    ) as HTMLInputElement;
    const givenUsername = usernameInput.value;

    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const givenPassword = passwordInput.value;

    const loginReqObjBody = {
      username: givenUsername,
      password: givenPassword,
    };

    const response = await postData(url, "api/auth/login", loginReqObjBody);
    console.log(response);

    if (response.message === "Login successful") {
      const newLoggedInUserObj = {
        id: response.userId,
        username: response.username,
        email: response.email,
      };
      props.setLoggedInUser(newLoggedInUserObj);
      props.setPage("homepage");
    }
  };

  return (
    <>
      <main className="w-full h-dvh flex justify-center items-center">
        <div className="bg-secondary-monochrome flex items-center w-2/3 h-2/3 ">
          <div className="flex flex-col justify-around items-center w-1/2 h-full border-black border-solid border-1">
            <h1 className="text-5xl">GoRaku</h1>
            <h1>(Logo goes here)</h1>
          </div>
          <div className="w-1/2 h-full flex flex-col items-center border-black border-solid border-1 p-5">
            <h1 className="text-4xl">Login</h1>
            <form
              onSubmit={handleLogin}
              className="flex flex-col p-3"
              action=""
            >
              <label htmlFor="">Username: </label>
              <input id="username" className="bg-white m-2 p-1" type="text" />
              <label htmlFor="">Password</label>
              <input
                id="password"
                className="bg-white m-2 p-1"
                type="password"
              />
              <button
                className="bg-neutral-300 m-2 p-1 cursor-pointer hover:bg-secondary-accent"
                type="submit"
              >
                Submit
              </button>
            </form>
            <a
              className="hover:text-secondary-accent cursor-pointer"
              onClick={() => {
                props.setPage("signup");
              }}
            >
              No account? Sign up today!
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
