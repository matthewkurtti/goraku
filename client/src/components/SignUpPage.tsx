import { postData } from "../helpers/fetchHelper";
import { User } from "../globalTypes";

type SignUpPageProps = {
  setPage: Function;
  setLoggedInUser: Function;
  loggedInUser: User | null;
};

const SignUpPage: React.FC<SignUpPageProps> = (props) => {
  // variables
  const url: string =
    process.env.NODE_ENV === "production" ? "/" : "http://localhost:8080/";

  // handler functions

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const usernameInput = document.getElementById(
      "username"
    ) as HTMLInputElement;
    const givenUsername = usernameInput.value;

    const emailInput = document.getElementById("email") as HTMLInputElement;
    const givenEmail = emailInput.value;

    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const givenPassword = passwordInput.value;

    const confirmPasswordInput = document.getElementById(
      "confirmpassword"
    ) as HTMLInputElement;
    const givenConfirmPassword = confirmPasswordInput.value;

    if (givenPassword != givenConfirmPassword) {
      throw Error("The two passwords do not match");
    }

    const signUpReqObjBody = {
      username: givenUsername,
      password: givenPassword,
      email: givenEmail,
    };

    const response = await postData(url, "api/auth/register", signUpReqObjBody);
    if (response.message === "User registered successfully") {
      // const newRegisteredUserObj = {
      //   id: response.id,
      //   username: response.username,
      //   email: response.email,
      // };
      props.setPage("login");
    }
  };

  return (
    <>
      <main className="w-full h-dvh flex justify-center items-center">
        <div className="bg-secondary-monochrome flex items-center w-2/3 h-2/3 ">
          <div className="flex flex-col justify-around items-center w-1/2 h-full border-primary-accent border-solid border-1">
            <h1 className="text-5xl">GoRaku</h1>
            <h1>(Logo goes here)</h1>
          </div>
          <div className="w-1/2 h-full flex flex-col items-center border-black border-solid border-1 p-5">
            <h1 className="text-4xl">Sign Up</h1>
            <form
              className="flex flex-col p-3"
              action=""
              onSubmit={handleSignUp}
            >
              <label htmlFor="">Username: </label>
              <input className="bg-white" type="text" id="username" />
              <label htmlFor="">Email: </label>
              <input className="bg-white" type="text" id="email" />
              <label htmlFor="">Password: </label>
              <input className="bg-white" type="text" id="password" />
              <label htmlFor="">Confirm Password: </label>
              <input className="bg-white" type="text" id="confirmpassword" />
              <button className="bg-secondary-accent m-2" type="submit">
                Submit
              </button>
            </form>
            <a
              href=""
              className="hover:text-secondary-accent cursor-pointer"
              onClick={() => {
                props.setPage("login");
              }}
            >
              Have an account? Sign in here!
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUpPage;
