"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import MobileMenuModal from "@/components/Layout/MobileMenuModal";
// Menus data
import { menusData } from "@/components/Layout/MenusData";

// Define menu item types
type MenuItem = {
  title: string;
  href?: string;
  dropdown?: MenuItem[];
};

// Define props for MenuItems
interface MenuItemsProps {
  items: MenuItem[];
  pathname: string;
  level?: number;
}

// Recursive menu component (modern typing)
function MenuItems({ items, pathname, level = 0 }: MenuItemsProps) {
  return (
    <ul className={level === 0 ? "navbar-nav m-auto" : "dropdown-menu"}>
      {items.map((item, index) => {
        const isActive = item.href === pathname;

        if (item.dropdown) {
          return (
            <li
              key={index}
              className={level === 0 ? "nav-item dropdown" : undefined}
            >
              <Link
                className={`${
                  level === 0 ? "nav-link" : "dropdown-item"
                } dropdown-toggle`}
                href="#"
                onClick={(e) => e.preventDefault()}
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
            <li key={index} className={level === 0 ? "nav-item" : undefined}>
              <Link
                href={item.href ?? "#"}
                className={`${level === 0 ? "nav-link" : "dropdown-item"} ${
                  isActive ? "active" : ""
                }`}
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

  // Sticky navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  const mobileMenuHandleClose = () => setShowMobileMenu(false);
  const mobileMenuHandleShow = () => setShowMobileMenu(true);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg position-sticky top-0 ptb-20 bg-secondary ${
          isSticky ? "sticky" : ""
        }`}
        id="navbar"
      >
        <div className="container mw-1680">
          <Link className="navbar-brand" href="/">
            <Image src="/images/logo.svg" alt="logo" width={127} height={50} />
          </Link>

          <div className="collapse navbar-collapse">
            <MenuItems items={menusData} pathname={pathname} />
          </div>

          {/* Others Options */}
          <div className="others-options d-flex align-items-center">
            <div className="d-flex align-items-center info">
              <Link href="/faqs">Help</Link>
              <Link href="/login">Log In</Link>
            </div>
            <Link href="/register" className="btn d-none d-sm-inline-block">
              Register
            </Link>
            <button
              type="button"
              className="navbar-toggler p-0"
              onClick={mobileMenuHandleShow}
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

      {/* Mobile Menu */}
      <MobileMenuModal
        onClose={mobileMenuHandleClose}
        showMobileMenu={showMobileMenu}
      />
    </>
  );
}

export default Navbar;
