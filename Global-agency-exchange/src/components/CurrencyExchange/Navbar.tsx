// 'use client';

// import React, { useEffect, useState } from 'react';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import MobileMenuModal from '@/components/Layout/MobileMenuModal';
// import { menusData } from '@/components/Layout/MenusData';

// type MenuItem = {
//   title: string;
//   href?: string;
//   dropdown?: MenuItem[];
// };

// interface MenuItemsProps {
//   items: MenuItem[];
//   pathname: string;
//   level?: number;
// }

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

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsSticky(window.scrollY > 100);
//     };

//     handleScroll();

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     setShowMobileMenu(false);
//   }, [pathname]);

//   const mobileMenuHandleClose = () => setShowMobileMenu(false);
//   const mobileMenuHandleShow = () => setShowMobileMenu(true);

//   return (
//     <>
//       <nav
//         className={`navbar navbar-expand-lg fixed-top top-0 bg-transparent ${
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
import NavUserAvatar from '../NavUserAvatar';

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
     await api.logout();
    setUser(null);
    window.location.href = '/login';
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
                    <NavUserAvatar user={user} onLogout={handleLogout} />
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
