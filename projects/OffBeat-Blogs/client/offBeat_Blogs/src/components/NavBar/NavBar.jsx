import { Button } from "../ui/button";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center p-4 border-2 rounded-2xl">
      <p className="text-2xl font-bold">OffBeat Blogs</p>
      <Button className="ml-auto" variant={"outline"} >Sign-In</Button>
    </div>
  );
};

export default NavBar;
