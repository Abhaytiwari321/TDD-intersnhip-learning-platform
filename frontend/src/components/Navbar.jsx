import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Hide navbar on login and register pages
    if (['/login', '/register'].includes(location.pathname)) {
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold tracking-wider hover:text-indigo-400 transition-colors" onClick={closeMenu}>
                        LMS Portal
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        {!user ? (
                            <>
                                <Link to="/login" className="hover:text-indigo-400 transition-colors font-medium">Login</Link>
                                <Link to="/register" className="px-5 py-2 bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all font-medium shadow-md hover:shadow-lg">
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                {user.role === 'admin' && <Link to="/admin" className="hover:text-indigo-400 transition-colors font-medium">Admin</Link>}
                                {user.role === 'mentor' && <Link to="/mentor" className="hover:text-indigo-400 transition-colors font-medium">Mentor</Link>}
                                {user.role === 'student' && <Link to="/student" className="hover:text-indigo-400 transition-colors font-medium">Dashboard</Link>}
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 px-5 py-2 rounded-full hover:bg-red-600 transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2"
                                >
                                    <span>Logout</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="focus:outline-none text-white">
                            {isMenuOpen ? (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            ) : (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col space-y-4 pb-4 border-t border-gray-700 pt-4">
                        {!user ? (
                            <>
                                <Link to="/login" className="block text-center hover:text-indigo-400 transition-colors py-2" onClick={closeMenu}>Login</Link>
                                <Link to="/register" className="block text-center bg-indigo-600 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md mx-4" onClick={closeMenu}>
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                {user.role === 'admin' && <Link to="/admin" className="block text-center hover:text-indigo-400 transition-colors py-2" onClick={closeMenu}>Admin Dashboard</Link>}
                                {user.role === 'mentor' && <Link to="/mentor" className="block text-center hover:text-indigo-400 transition-colors py-2" onClick={closeMenu}>Mentor Dashboard</Link>}
                                {user.role === 'student' && <Link to="/student" className="block text-center hover:text-indigo-400 transition-colors py-2" onClick={closeMenu}>My Dashboard</Link>}
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-center bg-red-500 py-3 rounded-lg hover:bg-red-600 transition-colors shadow-md mx-auto block max-w-xs"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
