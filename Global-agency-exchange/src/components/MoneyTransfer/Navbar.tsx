// 'use client';

// import React, { useEffect, useState } from 'react';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import MobileMenuModal from '@/components/Layout/MobileMenuModal';
// // Menus data
// import { menusData } from '@/components/Layout/MenusData';

// // Define menu item types
// type MenuItem = {
//   title: string;
//   href?: string;
//   dropdown?: MenuItem[];
// };

// // Define props for MenuItems
// interface MenuItemsProps {
//   items: MenuItem[];
//   pathname: string;
//   level?: number;
// }

// // Recursive menu component (modern typing)
// function MenuItems({ items, pathname, level = 0 }: MenuItemsProps) {
//   return (
//     <ul className={level === 0 ? 'navbar-nav m-auto' : 'dropdown-menu'}>
//       {items.map((item, index) => {
//         const isActive = item.href === pathname;

//         if (item.dropdown) {
//           return (
//             <li
//               key={index}
//               className={level === 0 ? 'nav-item dropdown' : undefined}
//             >
//               <Link
//                 className={`${
//                   level === 0 ? 'nav-link' : 'dropdown-item'
//                 } dropdown-toggle`}
//                 href="#"
//                 onClick={e => e.preventDefault()}
//               >
//                 {item.title}
//               </Link>
//               <MenuItems
//                 items={item.dropdown}
//                 pathname={pathname}
//                 level={level + 1}
//               />
//             </li>
//           );
//         } else {
//           return (
//             <li key={index} className={level === 0 ? 'nav-item' : undefined}>
//               <Link
//                 href={item.href ?? '#'}
//                 className={`${level === 0 ? 'nav-link' : 'dropdown-item'} ${
//                   isActive ? 'active' : ''
//                 }`}
//               >
//                 {item.title}
//               </Link>
//             </li>
//           );
//         }
//       })}
//     </ul>
//   );
// }

// function Navbar() {
//   const pathname = usePathname();
//   const [isSticky, setIsSticky] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);

//   // Sticky navbar effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsSticky(window.scrollY > 100);
//     };

//     // Set initial state
//     handleScroll();

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setShowMobileMenu(false);
//   }, [pathname]);

//   const mobileMenuHandleClose = () => setShowMobileMenu(false);
//   const mobileMenuHandleShow = () => setShowMobileMenu(true);

//   return (
//     <>
//       <nav
//         className={`navbar navbar-expand-lg position-sticky top-0 ptb-20 bg-secondary ${
//           isSticky ? 'sticky' : ''
//         }`}
//         id="navbar"
//       >
//         <div className="container mw-1680">
//           <Link className="navbar-brand" href="/">
//             <Image src="/images/Logo.png" width={180} height={60} alt="logo" />
//           </Link>

//           <div className="collapse navbar-collapse">
//             <MenuItems items={menusData} pathname={pathname} />
//           </div>

//           {/* Others Options */}
//           <div className="others-options d-flex align-items-center">
//             <div className="d-flex align-items-center info">
//               <Link href="/faqs">Help</Link>
//               <Link href="/login">Log In</Link>
//             </div>
//             <Link href="/register" className="btn d-none d-sm-inline-block">
//               Register
//             </Link>
//             <button
//               type="button"
//               className="navbar-toggler p-0"
//               onClick={mobileMenuHandleShow}
//             >
//               <span className="burger-menu">
//                 <span className="top-bar"></span>
//                 <span className="middle-bar"></span>
//                 <span className="bottom-bar"></span>
//               </span>
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <MobileMenuModal
//         onClose={mobileMenuHandleClose}
//         showMobileMenu={showMobileMenu}
//       />
//     </>
//   );
// }

// export default Navbar;



'use client';
import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenuModal from '@/components/Layout/MobileMenuModal';
import { menusData } from '@/components/Layout/MenusData';
import { api } from '@/lib/api';
import { FaCircleUser, FaPowerOff } from 'react-icons/fa6';
import { RxDashboard } from 'react-icons/rx';
import { IoHelpCircleOutline, IoSettings } from 'react-icons/io5';

type MenuItem = {
  title: string;
  href?: string;
  dropdown?: MenuItem[];
};

interface MenuItemsProps {
  items: MenuItem[];
  pathname: string;
  level?: number;
}

type User = {
  fullName?: string;
  name?: string;
  email?: string;
  avatar?: string;
};

function MenuItems({ items, pathname, level = 0 }: MenuItemsProps) {
  return (
    <ul className={level === 0 ? 'navbar-nav m-auto' : 'dropdown-menu'}>
      {items.map((item, index) => {
        const isActive = item.href === pathname;
        if (item.dropdown) {
          return (
            <li
              key={index}
              className={level === 0 ? 'nav-item dropdown' : undefined}
            >
              <Link
                className={`${level === 0 ? 'nav-link' : 'dropdown-item'} dropdown-toggle`}
                href="#"
                onClick={e => e.preventDefault()}
              >
                {item.title}
              </Link>
              <MenuItems
                items={item.dropdown}
                pathname={pathname}
                level={level + 1}
              />
            </li>
          );
        } else {
          return (
            <li key={index} className={level === 0 ? 'nav-item' : undefined}>
              <Link
                href={item.href ?? '#'}
                className={`${level === 0 ? 'nav-link' : 'dropdown-item'} ${isActive ? 'active' : ''}`}
              >
                {item.title}
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
}

function UserAvatar({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = user.fullName || user.name || user.email || 'User';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="user-avatar-wrapper" ref={dropdownRef}>
      <button
        className="avatar-btn"
        onClick={() => setDropdownOpen(prev => !prev)}
        aria-label="User menu"
      >
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={displayName}
            width={50}
            height={50}
            className="avatar-img"
          />
        ) : (
          <span className="avatar-initials">{initials}</span>
        )}
      </button>

      {dropdownOpen && (
        <div className="user-dropdown">
          <div className="dropdown-links">
            <Link
              href="/profile"
              className="dropdown-link"
              onClick={() => setDropdownOpen(false)}
            >
              <FaCircleUser />
              My Profile
            </Link>

            <Link
              href="/dashboard"
              className="dropdown-link"
              onClick={() => setDropdownOpen(false)}
            >
              <RxDashboard />
              Dashboard
            </Link>

            <Link
              href="/settings"
              className="dropdown-link"
              onClick={() => setDropdownOpen(false)}
            >
              <IoSettings />
              Settings
            </Link>

            <Link
              href="/support"
              className="dropdown-link"
              onClick={() => setDropdownOpen(false)}
            >
              <IoHelpCircleOutline />
              Help Center
            </Link>

            <div className="dropdown-divider" />

            <button
              className="dropdown-link dropdown-logout"
              onClick={onLogout}
            >
              <FaPowerOff />
              Log Out
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .user-dropdown {
          position: absolute;
          top: calc(100% + 14px);
          right: 0;
          width: 240px;
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #eef2f7;
          box-shadow:
            0 20px 50px rgba(15, 23, 42, 0.12),
            0 2px 8px rgba(15, 23, 42, 0.06);
          z-index: 99999;
          overflow: hidden;
          animation: dropdownFade 0.22s ease;
        }

        .user-dropdown::before {
          content: '';
          position: absolute;
          top: -7px;
          right: 20px;
          width: 14px;
          height: 14px;
          background: #fff;
          border-left: 1px solid #eef2f7;
          border-top: 1px solid #eef2f7;
          transform: rotate(45deg);
        }

        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-links {
          padding: 10px;
        }

        .dropdown-link {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          text-decoration: none;
          border: none;
          background: transparent;
          padding: 13px 14px;
          border-radius: 12px;
          color: #334155;
          font-size: 15px;
          font-weight: 600;
          transition: all 0.18s ease;
          cursor: pointer;
        }

        .dropdown-link:hover {
          background: #f8fafc;
          color: #00a76f;
          transform: translateX(2px);
        }

        .dropdown-link svg {
          font-size: 18px;
          opacity: 0.8;
        }

        .dropdown-divider {
          height: 1px;
          background: #eef2f7;
          margin: 6px 0;
        }

        .dropdown-logout {
          color: #ef4444;
        }

        .dropdown-logout:hover {
          background: #fff5f5;
          color: #dc2626;
        }
      `}</style>
    </div>
  );
}

function Navbar() {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    api
      .getMe()
      .then(res => {
        console.log('User:', res);
        if (res && (res.fullName || res.name || res.email)) {
          setUser(res);
        } else if (res?.user) {
          setUser(res.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setAuthLoading(false));
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  const handleLogout = async () => {
    // তোমার logout API থাকলে এখানে call করো
    // await api.logout();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg fixed-top top-0 bg-transparent ${isSticky ? 'sticky' : ''}`}
        id="navbar"
      >
        <div className="container mw-1680">
          <Link className="navbar-brand" href="/">
            <Image src="/images/Logo.png" width={180} height={60} alt="logo" />
          </Link>
          <div className="collapse navbar-collapse">
            <MenuItems items={menusData} pathname={pathname} />
          </div>
          <div className="others-options d-flex align-items-center">
            {!authLoading && (
              <>
                {user ? (
                  <div className="d-flex align-items-center gap-3 z-1">
                    <Link href="/faqs" className="info-link">
                      Help
                    </Link>
                    <UserAvatar user={user} onLogout={handleLogout} />
                  </div>
                ) : (
                  <div className="d-flex align-items-center info">
                    <Link href="/faqs">Help</Link>
                    <Link href="/login">Log In</Link>
                  </div>
                )}
                {!user && (
                  <Link
                    href="/register"
                    className="btn d-none d-sm-inline-block"
                  >
                    Register
                  </Link>
                )}
              </>
            )}
            <button
              type="button"
              className="navbar-toggler p-0"
              onClick={() => setShowMobileMenu(true)}
            >
              <span className="burger-menu">
                <span className="top-bar"></span>
                <span className="middle-bar"></span>
                <span className="bottom-bar"></span>
              </span>
            </button>
          </div>
        </div>
      </nav>
      <MobileMenuModal
        onClose={() => setShowMobileMenu(false)}
        showMobileMenu={showMobileMenu}
      />
    </>
  );
}

export default Navbar;



