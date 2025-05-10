import { Home, Menu, PenLine, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const username = "Ansh Jadhav";
  const getInitials = (name) => {
    const names = name.split(" ");
    return names.length > 1
      ? names[0][0].toUpperCase() + names[1][0].toUpperCase()
      : names[0][0].toUpperCase();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/Offbeat Pravasi logo.png" alt="Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold text-black">
            OffBeat<span className="text-blue-500">Blogs</span>
          </span>
        </Link>

        <div className="hidden md:flex md:items-center space-x-4">
          <Link to="/" className={`px-3 py-2 text-sm font-medium rounded-md transition ${location.pathname === '/' ? 'text-blue-500 bg-blue-100' : 'text-gray-700 hover:text-blue-500 hover:bg-blue-100'}`}>Home</Link>
          <Link to="/create" className={`px-3 py-2 text-sm font-medium rounded-md transition ${location.pathname === '/create' ? 'text-blue-500 bg-blue-100' : 'text-gray-700 hover:text-blue-500 hover:bg-blue-100'}`}>Create Blog</Link>
          <Link to="/profile" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-semibold">
            {getInitials(username)}
          </div>
            <span className="text-sm font-medium text-gray-700">{username}</span>
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
            {isOpen ? <X className="h-6 w-6 text-blue-500" /> : <Menu className="h-6 w-6 text-blue-500" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white border-t mt-2 px-4 py-3 rounded-md shadow-md space-y-2`}>
        <Link to="/" className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition ${location.pathname === '/' ? 'text-blue-500 bg-blue-100' : 'text-gray-700 hover:text-blue-500 hover:bg-blue-100'}`}>
          <Home className="h-5 w-5" />
          <span>Home</span>
        </Link>
        <Link to="/create" className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition ${location.pathname === '/create' ? 'text-blue-500 bg-blue-100' : 'text-gray-700 hover:text-blue-500 hover:bg-blue-100'}`}>
          <PenLine className="h-5 w-5" />
          <span>Create Blog</span>
        </Link>
        <Link to="/profile" className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition ${location.pathname === '/profile' ? 'text-blue-500 bg-blue-100' : 'text-gray-700 hover:text-blue-500 hover:bg-blue-100'}`}>
          <User className="h-5 w-5" />
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
