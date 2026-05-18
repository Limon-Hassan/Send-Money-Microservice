"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Offcanvas from "react-bootstrap/Offcanvas";
// Menus data
import { menusData } from "@/components/Layout/MenusData";

type MobileMenuModalProps = {
  showMobileMenu: boolean;
  onClose: () => void;
};

// Define proper types for menu items
interface MenuItem {
  title: string;
  href?: string;
  dropdown?: MenuItem[];
}

// Helper function to check if current pathname is in a menu item or its children
const isPathInMenu = (item: MenuItem, pathname: string): boolean => {
  // Check if the current item's href matches the pathname
  if (item.href === pathname) {
    return true;
  }

  // If it has children, check each child recursively
  if (item.dropdown && item.dropdown.length > 0) {
    for (const child of item.dropdown) {
      if (isPathInMenu(child, pathname)) {
        return true;
      }
    }
  }

  return false;
};

// Recursive component for rendering menu items with custom dropdown
const MobileMenuItem = ({
  item,
  pathname,
  level = 0,
  isOpen = false,
  onToggle,
  onCloseOthers,
}: {
  item: MenuItem;
  pathname: string;
  level?: number;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  onCloseOthers?: () => void;
}) => {
  const hasDropdown = item.dropdown && item.dropdown.length > 0;
  const isActive = pathname === item.href;

  // Toggle dropdown open/close
  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();

    // Close other dropdowns at the same level when opening this one
    if (!isOpen && onCloseOthers) {
      onCloseOthers();
    }

    // Toggle this dropdown
    if (onToggle) {
      onToggle(!isOpen);
    }
  };

  return (
    <li
      className={`mobile-menu-list ${!hasDropdown ? "without-icon" : ""} ${
        isActive ? "active" : ""
      }`}
    >
      {hasDropdown ? (
        <>
          <Link
            href="#"
            onClick={toggleDropdown}
            className="d-flex justify-content-between align-items-center"
          >
            <span>{item.title}</span>
            <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
              <i className="fas fa-chevron-down"></i>
            </span>
          </Link>
          <ul
            className={`mobile-menu-items ${level > 0 ? "sub-dropdown" : ""} ${
              isOpen ? "show" : ""
            }`}
          >
            {item.dropdown!.map((subItem: MenuItem, index: number) => (
              <MobileMenuItem
                key={index}
                item={subItem}
                pathname={pathname}
                level={level + 1}
                isOpen={isPathInMenu(subItem, pathname)}
              />
            ))}
          </ul>
        </>
      ) : (
        <Link
          href={item.href || "#"}
          className={`${level > 0 ? "dropdown-item" : "nav-link"} ${
            isActive ? "active" : ""
          }`}
        >
          {item.title}
        </Link>
      )}
    </li>
  );
};

function MobileMenuModal({ showMobileMenu, onClose }: MobileMenuModalProps) {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  // Initialize open dropdowns based on pathname
  useEffect(() => {
    const initialOpenState: { [key: string]: boolean } = {};

    menusData.forEach((item: MenuItem, index: number) => {
      const key = `top-${index}`;
      initialOpenState[key] = isPathInMenu(item, pathname);

      // Check for nested dropdowns that should be open
      if (item.dropdown) {
        item.dropdown.forEach((subItem: MenuItem, subIndex: number) => {
          if (subItem.dropdown) {
            const subKey = `sub-${index}-${subIndex}`;
            initialOpenState[subKey] = isPathInMenu(subItem, pathname);
          }
        });
      }
    });

    setOpenDropdowns(initialOpenState);
  }, [pathname]);

  // Handle dropdown toggle
  const handleDropdownToggle = (key: string, isOpen: boolean) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: isOpen,
    }));
  };

  // Close all dropdowns at the same level
  const closeOtherDropdowns = (level: number, currentIndex: number) => {
    if (level === 0) {
      // For top-level items, close all other top-level dropdowns
      const newState: { [key: string]: boolean } = {};
      Object.keys(openDropdowns).forEach((key) => {
        if (key.startsWith("top-")) {
          const index = parseInt(key.split("-")[1]);
          newState[key] = index === currentIndex;
        } else {
          newState[key] = openDropdowns[key];
        }
      });
      setOpenDropdowns(newState);
    }
  };

  return (
    <>
      <Offcanvas
        className="mobile-navbar offcanvas offcanvas-end border-0"
        placement="end"
        show={showMobileMenu}
        onHide={onClose}
      >
        <div className="offcanvas-header">
          <Link href="/" className="logo d-inline-block">
            <Image src="/images/logo.svg" alt="logo" width={100} height={39} />
          </Link>
          <Link href="/" className="logo d-none">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={100}
              height={39}
            />
          </Link>

          <button
            type="button"
            className="btn-close bg-transparent position-relative lh-1 p-0 border-0"
            onClick={onClose}
          >
            <i className="ri-close-large-line"></i>
          </button>
        </div>

        <Offcanvas.Body>
          <ul className="mobile-menu">
            {menusData.map((item: MenuItem, index: number) => {
              const key = `top-${index}`;
              return (
                <MobileMenuItem
                  key={index}
                  item={item}
                  pathname={pathname}
                  isOpen={openDropdowns[key] || false}
                  onToggle={(isOpen) => handleDropdownToggle(key, isOpen)}
                  onCloseOthers={() => closeOtherDropdowns(0, index)}
                />
              );
            })}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MobileMenuModal;
