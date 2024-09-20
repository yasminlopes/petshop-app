import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUsers, FaSignOutAlt } from 'react-icons/fa';

interface SidebarItem {
  label: string;
  icon?: JSX.Element;
  link: string;
}

const Sidebar: React.FC = () => {
  const items: SidebarItem[] = [
    {
      label: 'Produtos',
      icon: <FaShoppingCart className="text-primary" />,
      link: '/produtos',
    },
    {
      label: 'Clientes',
      icon: <FaUsers className="text-primary" />,
      link: '/clientes',
    },
    {
      label: 'Logout',
      icon: <FaSignOutAlt className="text-primary" />,
      link: '/logout',
    },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white text-gray-800 shadow-md">
      <div className="flex items-center p-4 text-gray-800">
        <img
          src="/assets/brand/petstation.svg"
          alt="PetStation Logo"
          className="w-32 h-32"
        />
      </div>
      <ul className="menu p-4">
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            <Link
              to={item.link}
              className="flex items-center gap-2 p-2 rounded-lg transition-colors hover:bg-primary hover:text-white"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
