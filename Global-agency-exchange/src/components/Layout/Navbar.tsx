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
import { IoSettings } from 'react-icons/io5';

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
            width={38}
            height={38}
            className="avatar-img"
          />
        ) : (
          <span className="avatar-initials">{initials}</span>
        )}
      </button>

      {dropdownOpen && (
        <div className="user-dropdown">
          <div className="dropdown-user-info">
            <span className="dropdown-username">{displayName}</span>
          </div>
          <div className="dropdown-divider" />
          <div className="d-flex flex-column mb-3">
            <Link
              href="/profile"
              className="dropdown-link"
              onClick={() => setDropdownOpen(false)}
            >
              <FaCircleUser />
              Profile
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
            <div className="dropdown-divider" />
            <button
              className="dropdown-link dropdown-logout d-flex align-items-center gap-2"
              onClick={onLogout}
            >
              <FaPowerOff />
              Log Out
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .user-avatar-wrapper {
          position: relative;
          z-index: 9999;
        }

        .avatar-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.4);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          overflow: hidden;
          transition:
            border-color 0.2s,
            box-shadow 0.2s;
        }

        .avatar-btn:hover {
          border-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
        }

        .avatar-img {
          border-radius: 50%;
          object-fit: cover;
        }

        .avatar-initials {
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          line-height: 1;
        }

        .user-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          min-width: 200px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.15),
            0 2px 8px rgba(0, 0, 0, 0.08);
          padding: 8px 0;
          z-index: 9999;
          animation: dropdownFadeIn 0.18s ease;
        }

        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-user-info {
          padding: 12px 16px 10px;
        }

        .dropdown-username {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a2e;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 168px;
        }

        .dropdown-divider {
          height: 1px;
          background: #f0f0f0;
          margin: 4px 0;
        }

        .dropdown-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          font-size: 14px;
          color: #444;
          text-decoration: none;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition:
            background 0.15s,
            color 0.15s;
        }

        .dropdown-link:hover {
          background: #f5f5ff;
          color: #667eea;
        }

        .dropdown-link i {
          font-size: 16px;
          opacity: 0.8;
        }

        .dropdown-logout {
          color: #e53e3e;
        }

        .dropdown-logout:hover {
          background: #fff5f5;
          color: #c53030;
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
