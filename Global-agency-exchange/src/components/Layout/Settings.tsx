"use client";

import React, { useState, useEffect } from "react";

const Settings = () => {
  // State to track if the button is active
  const [isActive, setIsActive] = useState(false);

  // State to track RTL mode
  const [rtlMode, setRtlMode] = useState(false);

  // Function to toggle the active state
  const toggleActive = () => {
    setIsActive(!isActive);
  };

  // Function to toggle RTL mode
  const toggleRtlMode = () => {
    const newRtlMode = !rtlMode;
    setRtlMode(newRtlMode);

    // Update localStorage
    localStorage.setItem("rtlMode", JSON.stringify(newRtlMode));

    // Update body class
    if (newRtlMode) {
      document.body.classList.add("rtl");
    } else {
      document.body.classList.remove("rtl");
    }
  };

  // Initialize RTL mode from localStorage on component mount
  useEffect(() => {
    const savedRtlMode = localStorage.getItem("rtlMode");
    if (savedRtlMode) {
      const isRtl = JSON.parse(savedRtlMode);
      setRtlMode(isRtl);

      // Apply RTL class to body if needed
      if (isRtl) {
        document.body.classList.add("rtl");
      }
    }
  }, []);

  // State to track dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    // Update localStorage
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));

    // Update body class
    if (newDarkMode) {
      document.body.classList.add("expa-dark");
    } else {
      document.body.classList.remove("expa-dark");
    }
  };

  // Initialize dark mode from localStorage on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      const isDark = JSON.parse(savedDarkMode);
      setDarkMode(isDark);

      // Apply dark mode class to body if needed
      if (isDark) {
        document.body.classList.add("expa-dark");
      }
    }
  }, []);

  return (
    <>
      <div className="overflow-hidden">
        <div className={`settings-btn-wrap ${isActive ? "active" : ""}`}>
          <div className="d-flex align-items-center">
            <button className="settings-button" onClick={toggleActive}>
              <i className="ri-settings-3-line"></i>
            </button>

            <div className="settings-box">
              <button
                type="button"
                className="settings-btn rtl-btn d-block"
                onClick={toggleRtlMode}
              >
                Switch To {rtlMode ? "LTR" : "RTL"}
              </button>

              <button
                type="button"
                className="expa-light-dark settings-btn mt-2 d-block"
                onClick={toggleDarkMode}
              >
                Switch To {darkMode ? "Light" : "Dark"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
