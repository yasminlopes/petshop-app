import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUsers, FaListAlt, FaClipboardList, FaThList, FaChartPie } from 'react-icons/fa';

interface SidebarItem {
  label: string;
  icon?: JSX.Element;
  link: string;
}

interface SidebarProps {
  isOwner: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOwner }) => {
  const [activeLink, setActiveLink] = useState('/'); 

  const items: SidebarItem[] = isOwner
    ? [  // Dono (Owner)
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
        {
          label: 'Clientes',
          icon: <FaUsers />,
          link: '/clientes',
        },
        {
          label: 'Dashboard',
          icon: <FaChartPie />,
          link: '/dashboard',
        },
      ]
    : [  // Cliente
        {
          label: 'Pedidos',
          icon: <FaClipboardList />,
          link: '/pedidos',
        },
      ];

  const handleLinkClick = (link: string) => setActiveLink(link)

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-gray-300 shadow-lg transition-all">
      <div className="flex items-center justify-center p-6 text-gray-100">
        <img
          src="/assets/brand/logo.svg"
          alt="Logo"
          className="w-32 h-32"
        />
      </div>
      <ul className="menu p-4">
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            <NavLink
              to={item.link}
              end
              onClick={() => handleLinkClick(item.link)}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${activeLink === item.link ? 'bg-yellow-500 text-gray-900' : 'text-gray-300 hover:bg-yellow-500 hover:text-gray-900'
              }`}
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
