function SignUpPage() {
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
            <form className="flex flex-col p-3" action="">
              <label htmlFor="">Username: </label>
              <input className="bg-white" type="text" />
              <label htmlFor="">Email: </label>
              <input className="bg-white" type="text" />
              <label htmlFor="">Password: </label>
              <input className="bg-white" type="text" />
              <label htmlFor="">Confirm Password: </label>
              <input className="bg-white" type="text" />
              <button className="bg-secondary-accent m-2">Submit</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default SignUpPage;
