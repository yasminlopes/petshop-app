import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUsers, FaSignOutAlt, FaListAlt, FaClipboardList, FaThList } from 'react-icons/fa';

interface SidebarItem {
  label: string;
  icon?: JSX.Element;
  link: string;
}

const Sidebar: React.FC = () => {
  const items: SidebarItem[] = [
    {
      label: 'Produtos',
      icon: <FaShoppingCart />,
      link: '/produtos',
    },
    {
      label: 'Categorias',
      icon: <FaListAlt />,
      link: '/categorias',
    },
    {
      label: 'Subcategorias',
      icon: <FaThList />,
      link: '/subcategorias',
    },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-gray-300 shadow-lg transition-all">
      <div className="flex items-center justify-center p-6 text-gray-100">
        <img
          src="/assets/brand/logo.svg"
          alt="PetStation Logo"
          className="w-32 h-32"
        />
      </div>
      <ul className="menu p-4">
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
