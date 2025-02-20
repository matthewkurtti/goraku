import { getData } from "../helpers/fetchHelper";
import { User } from "../globalTypes";

type NavBarProps = {
  setPage: Function;
  setLoggedInUser: Function;
  loggedInUser: User | null;
};

const NavBar: React.FC<NavBarProps> = (props) => {
  // variable
  const url: string =
    import.meta.env.MODE === "development" ? "http://localhost:8080/" : "/";

  // handler

  const handleLogOut = async () => {
    const response = await getData(url, "api/auth/logout");
    if (response.message === "Logout  successful") {
      props.setLoggedInUser(null);
      props.setPage("login");
    }
  };

  return (
    <>
      <nav className="bg-secondary-accent h-15 flex justify-between items-center px-3">
        <h1
          className="text-3xl font-bold cursor-pointer"
          onClick={() => props.setPage("homepage")}
        >
          GoRaku
        </h1>
        <h1 className="text-4xl">Welcome {props.loggedInUser?.username}</h1>
        <h1 onClick={handleLogOut} className="text-3xl cursor-pointer">
          Logout
        </h1>
      </nav>
    </>
  );
};

export default NavBar;
