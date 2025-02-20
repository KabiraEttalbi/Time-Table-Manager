'use client';

import { useEffect, useState } from "react";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userNom, setUserNom] = useState("");
  const [userPrenom, setUserPrenom] = useState("");
  const [userRole, setUserRole] = useState("");
  const router = useRouter();

  // Fetch user info from cookies on component mount
  useEffect(() => {
    const nom = document.cookie
      .split('; ')
      .find(row => row.startsWith('user_nom='))
      ?.split('=')[1];

    const prenom = document.cookie
      .split('; ')
      .find(row => row.startsWith('user_prenom='))
      ?.split('=')[1];

    const role = document.cookie
      .split('; ')
      .find(row => row.startsWith('user_role='))
      ?.split('=')[1];

    if (nom) setUserNom(nom);
    if (prenom) setUserPrenom(prenom);
    if (role) setUserRole(role);
  }, []);

  const handleLogout = async () => {
    try {
      // Call the logout endpoint in your NestJS backend
      await fetch('http://localhost:3001/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }

    // Clear cookies
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'user_nom=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'user_prenom=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    // Redirect to login page
    router.push('/sign-in');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='flex items-center justify-between p-4'>
      {/* SEARCH BAR */}
      <div className='hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
        <Image src="/search.png" alt="" width={14} height={14} />
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-[200px] p-2 bg-transparent outline-none"
          name="search"
        />
      </div>

      {/* ICONS AND USER */}
      <div className='flex items-center gap-6 justify-end w-full'>
        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
          <Image src="/announcement.png" alt="" width={20} height={20} />
          <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs'>
            1
          </div>
        </div>

        {/* USER DROPDOWN */}
        <div className='relative'>
          <div
            className='flex items-center gap-2 cursor-pointer'
            onClick={toggleDropdown}
          >
            <div className='flex flex-col'>
              <span className='text-xs leading-3 font-medium'>{userNom.toUpperCase()} {userPrenom.toUpperCase()}</span>
              <span className='text-[10px] text-gray-500 text-right'>
                {userRole.toUpperCase()}
              </span>
            </div>
            <Image
              src='/avatar.png'
              alt=''
              width={36}
              height={36}
              className='rounded-full'
            />
          </div>

          {/* DROPDOWN MENU */}
          {isDropdownOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10'>
              <ul className='py-2'>
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2'>
                  <FaUser className='text-gray-500' /> Profil
                </li>
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2'>
                  <FaCog className='text-gray-500' /> Paramètres
                </li>
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2'>
                  <FaSignOutAlt className='text-gray-500' /> <button onClick={handleLogout}>Déconnexion</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;