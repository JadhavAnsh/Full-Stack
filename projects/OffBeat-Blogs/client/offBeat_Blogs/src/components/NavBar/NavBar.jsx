import { Button } from "../ui/button";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center p-4 border-2 rounded-2xl">
      <img src="/Offbeat Pravasi logo.png" height='50' width='50' alt="logo" />
      <p className="text-2xl pl-4 font-bold">OffBeat Blogs</p>
      <Button className="ml-auto" variant={"outline"} >Sign-In</Button>
    </div>
  );
};

export default NavBar;
