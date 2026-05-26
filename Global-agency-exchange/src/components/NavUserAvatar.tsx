'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCircleUser, FaPowerOff } from 'react-icons/fa6';
import { RxDashboard } from 'react-icons/rx';
import { IoHelpCircleOutline, IoSettings } from 'react-icons/io5';

interface User {
  fullName?: string;
  name?: string;
  email?: string;
  avatar?: string | null;
}

interface NavUserAvatarProps {
  user: User;
  onLogout: () => void;
}

export default function NavUserAvatar({ user, onLogout }: NavUserAvatarProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const displayName = user.fullName || user.name || user.email || 'User';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div ref={wrapperRef} style={{ position: 'relative', zIndex: 9999 }}>
        {/* Avatar Button */}
        <button
          onClick={() => setOpen(prev => !prev)}
          aria-label="User menu"
          className="avatar-btn"
        >
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={displayName}
              width={42}
              height={42}
              className="avatar-img"
            />
          ) : (
            <span className="avatar-initials">{initials}</span>
          )}
        </button>

        {/* Dropdown */}
        <div className={`ua-dropdown ${open ? 'ua-dropdown--open' : ''}`}>
          {/* Arrow */}
          <div className="ua-arrow" />

          {/* User info */}
          <div className="ua-user-info">
            <div className="ua-avatar-sm">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={displayName}
                  width={38}
                  height={38}
                  className="ua-avatar-img"
                />
              ) : (
                <span className="ua-initials-sm">{initials}</span>
              )}
            </div>
            <div className="ua-user-text">
              <span className="ua-username">{displayName}</span>
              {user.email && <span className="ua-email">{user.email}</span>}
            </div>
          </div>

          <div className="ua-divider" />

          {/* Menu items */}
          <div className="ua-menu">
            <Link
              href="/profile"
              className="ua-item"
              onClick={() => setOpen(false)}
            >
              <FaCircleUser className="ua-icon" />
              Profile
            </Link>

            <Link
              href="/dashboard"
              className="ua-item"
              onClick={() => setOpen(false)}
            >
              <RxDashboard className="ua-icon" />
              Dashboard
            </Link>

            <Link
              href="/settings"
              className="ua-item"
              onClick={() => setOpen(false)}
            >
              <IoSettings className="ua-icon" />
              Settings
            </Link>

            <Link
              href="/help"
              className="ua-item"
              onClick={() => setOpen(false)}
            >
              <IoHelpCircleOutline className="ua-icon" />
              Help
            </Link>

            <div className="ua-divider" style={{ margin: '4px 0' }} />

            <button
              className="ua-item ua-logout"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
            >
              <FaPowerOff className="ua-icon" />
              Log Out
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ── Avatar button ─────────────────────── */
        .avatar-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.18);
          background: linear-gradient(135deg, #00c853 0%, #009688 100%);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          overflow: hidden;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
          outline: none;
        }
        .avatar-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
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

        /* ── Dropdown shell ────────────────────── */
        .ua-dropdown {
          position: absolute;
          top: calc(100% + 14px);
          right: 0;
          width: 230px;
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #edf0f7;
          box-shadow:
            0 16px 48px rgba(15, 23, 42, 0.12),
            0 2px 8px rgba(15, 23, 42, 0.06);
          z-index: 99999;
          overflow: hidden;

          /* animation */
          opacity: 0;
          transform: translateY(-10px);
          pointer-events: none;
          transition:
            opacity 0.22s ease,
            transform 0.22s ease;
        }
        .ua-dropdown--open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        /* ── Top arrow ─────────────────────────── */
        .ua-arrow {
          position: absolute;
          top: -6px;
          right: 18px;
          width: 12px;
          height: 12px;
          background: #ffffff;
          border-left: 1px solid #edf0f7;
          border-top: 1px solid #edf0f7;
          transform: rotate(45deg);
          z-index: 1;
        }

        /* ── User info section ─────────────────── */
        .ua-user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 16px 12px;
          position: relative;
          z-index: 2;
          background: #ffffff;
        }
        .ua-avatar-sm {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00c853 0%, #009688 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        .ua-avatar-img {
          border-radius: 50%;
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
        .ua-initials-sm {
          color: #fff;
          font-size: 13px;
          font-weight: 600;
        }
        .ua-user-text {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .ua-username {
          font-size: 14px;
          font-weight: 700;
          color: #1f2937;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.3;
        }
        .ua-email {
          font-size: 11.5px;
          color: #94a3b8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 1px;
        }

        /* ── Divider ───────────────────────────── */
        .ua-divider {
          height: 1px;
          background: #eef2f7;
        }

        /* ── Menu ──────────────────────────────── */
        .ua-menu {
          padding: 6px 8px 8px;
          display: flex;
          flex-direction: column;
        }

        /* ── Menu item (shared) ────────────────── */
        :global(.ua-item) {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          border: none;
          background: transparent;
          text-decoration: none !important;
          padding: 10px 12px;
          border-radius: 10px;
          color: #334155;
          font-size: 14px;
          font-weight: 600;
          transition:
            background 0.16s ease,
            color 0.16s ease,
            transform 0.16s ease;
          cursor: pointer;
          text-align: left;
        }
        :global(.ua-item:hover) {
          background: #f8fafc;
          color: #00a76f;
          transform: translateX(2px);
          text-decoration: none !important;
        }
        :global(.ua-icon) {
          font-size: 16px;
          opacity: 0.65;
          flex-shrink: 0;
        }

        /* ── Logout ────────────────────────────── */
        :global(.ua-logout) {
          color: #ef4444 !important;
        }
        :global(.ua-logout:hover) {
          background: #fff5f5 !important;
          color: #dc2626 !important;
        }
      `}</style>
    </>
  );
}
