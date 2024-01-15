import React from 'react';
import './SideNav.scss';

const SideNav = ({ isOpen, onClose }) => {
  return (
    <div className={`sidenav ${isOpen ? 'open' : ''}`}>
      <a href="javascript:void(0)" className="closebtn" onClick={onClose}>&times;</a>
      <ul className="links">
        <li>
              <a href="#">Collections</a>
            </li>
            <li>
              <a href="#">Men</a>
            </li>
            <li>
              <a href="#">Women</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
      </ul>
    </div>
  );
}

export default SideNav;