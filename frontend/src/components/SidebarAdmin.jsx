import React, { useState } from 'react';
import '../css/SidebarAdmin.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullhorn,
  faBell,
  faListAlt,
  faCog,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* ✅ Hamburger button */}
      <button
        className="fixed top-4 left-4 md:hidden z-[9999] bg-white p-2 rounded shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faBars} className="text-black text-2xl" />
      </button>

      {/* ✅ Sidebar */}
      <div
        className={`sidebar-admin fixed top-0 left-0 h-full transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:block`}
        style={{ width: '250px' }}
      >
        <h1 className="sidebar-title">
          <NavLink
            to="/admin/admin-dashboard"
            className={({ isActive }) =>
              isActive ? 'active-link' : 'inactive-link'
            }
          >
            <span>Dashboard</span>
          </NavLink>
        </h1>

        <div className="sidebar-section">
          <div className="sidebar-item">
            <FontAwesomeIcon icon={faBullhorn} className="icon" />
            <span>Announcements</span>
          </div>

          <div className="sub-items">
            <div className="sidebar-item">
              <FontAwesomeIcon icon={faBullhorn} className="icon" />
              <NavLink
                to="/admin/create-announcement"
                className={({ isActive }) =>
                  isActive ? 'active-link' : 'inactive-link'
                }
              >
                <span>Create Announcements</span>
              </NavLink>
            </div>

            <div className="sidebar-item">
              <FontAwesomeIcon icon={faBell} className="icon" />
              <NavLink
                to="/admin/send-notification"
                className={({ isActive }) =>
                  isActive ? 'active-link' : 'inactive-link'
                }
              >
                <span>Send Notifications</span>
              </NavLink>
            </div>

            <div className="sidebar-item">
              <FontAwesomeIcon icon={faListAlt} className="icon" />
              <NavLink
                to="/admin/announcements"
                className={({ isActive }) =>
                  isActive ? 'active-link' : 'inactive-link'
                }
              >
                <span>View all Announcements</span>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-item">
            <FontAwesomeIcon icon={faCog} className="icon" />
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                isActive ? 'active-link' : 'inactive-link'
              }
            >
              <span>Settings</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
