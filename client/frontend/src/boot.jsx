import React, { useState, useEffect } from 'react';
import { BsArrowLeftShort, BsSearch } from 'react-icons/bs';
import { AiFillEnvironment } from 'react-icons/ai';
import { MenuList, MenuItem } from '@mui/material'; // Import MenuList and MenuItem
import { MdOutlineDashboard } from 'react-icons/md';

export default function Boot() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const Menus = [
    { title: 'Dashboard', icon: <MdOutlineDashboard /> },
    { title: 'Pages' },
    { title: 'Media', spacing: true },
    {
      title: 'Projects',
      submenu: true,
      submenuItems: [
        { title: 'Submenu 1' },
        { title: 'Submenu 2' },
        { title: 'Submenu 3' },
      ],
    },
    { title: 'Analytics' },
    { title: 'Inbox' },
    { title: 'Profile', spacing: true },
    { title: 'Logout' },
  ];

  return (
    <div className="flex gap-6 m-0">
      <div
        className={`fixed top-0 left-0 min-h-screen z-10 ${
          open ? 'w-72' : 'w-16'
        } duration-500 text-gray-800 bg-[#f1c7e9] p-5 pt-8`}
      >
        <BsArrowLeftShort
          className={`bg-white text-black text-3xl rounded-full absolute right-3 top-3 border border-black cursor-pointer ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen(!open)}
        />

        <div className="inline-flex">
          <AiFillEnvironment
            className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
              open && 'rotate-[360deg]'
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-2xl duration-300 ${
              !open && 'scale-0'
            }`}
          >
            Tailwind
          </h1>
        </div>

        <div
          className={`flex items-center rounded-md bg-light-white ${
            !open ? 'px-2.5' : 'px-4'
          } py-2`}
        >
          <BsSearch
            className={`text-black text-lg block float-left cursor-pointer ${
              open && 'mr-2'
            }`}
          />

          <input
            type="search"
            placeholder="Search"
            className={`text-base bg-transparent w-full text-white focus:outline-none ${
              !open && 'hidden'
            }`}
          />
        </div>

        <MenuList>
          {Menus.map((menu, index) => (
            <MenuItem key={index}>
              {open ? (
                <>
                  {menu.icon && <span className="mr-2">{React.cloneElement(menu.icon, { size: 20 })}</span>}
                  {menu.title && (
  <span className={`mr-2 text-2xl font-semibold ${open ? 'text-gray-900' : 'text-gray-400'}`}>
    {menu.title}
  </span>
)}

                </>
              ) : (
                <span className="mr-2 text-3xl ">{menu.icon}</span>
              )}
            </MenuItem>
          ))}
        </MenuList>
      </div>
      <div className='p-7'>
        <h1 className='text-2xl font-semibold'>Home Page</h1>
      </div>
    </div>
  );
}




