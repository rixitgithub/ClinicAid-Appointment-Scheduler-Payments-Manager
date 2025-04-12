import React, { useState, useEffect } from 'react';
import logo from "../assets/nav.png"
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(null);

  // Load token on mount
  useEffect(() => {
    const userToken = localStorage.getItem('token');
    setToken(userToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={logo} alt="" />
      <ul className='hidden md:flex items-start gap-10 font-medium'>
        <NavLink to='/'>
            <li className='py-1'>HOME</li>
            <hr className='border-none outline-none h-0.5 bg-green-400 w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/doctors'>
            <li className='py-1'>ALL DOCTORS</li>
            <hr className='border-none outline-none h-0.5 bg-green-400 w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/about'>
            <li className='py-1'>ABOUT</li>
            <hr className='border-none outline-none h-0.5 bg-green-400 w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/contact'>
            <li className='py-1'>CONTACT</li>
            <hr className='border-none outline-none h-0.5 bg-green-400 w-3/5 m-auto hidden'/>
        </NavLink>
      </ul>

      {/* Right-side buttons */}
      <div className='flex items-center gap-4'>
        {
          token ? (
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={assets.profile_pic} alt="profile" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="dropdown" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-green-50 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={() => navigate('clinic')} className='hover:text-black cursor-pointer'>My Clinic</p>
                  <p onClick={handleLogout} className='hover:text-black cursor-pointer'>Log out</p>
                </div>
              </div>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className='bg-primary text-white px-6 py-3 rounded-full font-light hidden md:block'>
              Create Account
            </button>
          )
        }

        {/* Mobile menu icon */}
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="menu" />

        {/* ---Mobile Menu--- */}
        <div className={`fixed top-0 bottom-0 right-0 bg-white z-20 transition-all ${showMenu ? 'w-full' : 'w-0 overflow-hidden'}`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-38' src={assets.logo} alt="logo" />
            <img className='w-10' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="close" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>All Doctors</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>
            {
              token
                ? <p onClick={handleLogout} className='px-4 py-2 rounded inline-block text-red-600'>Logout</p>
                : <NavLink to='/login'><p onClick={() => setShowMenu(false)} className='px-4 py-2 rounded inline-block text-green-600'>Login</p></NavLink>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
