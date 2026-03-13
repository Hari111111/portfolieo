"use client"
import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { HeaderItem } from '../../../../types/menu';
import { usePathname } from 'next/navigation';

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname()
  const handleMouseEnter = () => {
    if (item.submenu) {
      setSubmenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setSubmenuOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        href={item.href} 
        className={`text-[15px] flex items-center py-2 font-bold tracking-tight transition-all relative group
          ${path === item.href ? 'text-primary' : 'text-midnight_text/80 dark:text-white/80 hover:text-primary dark:hover:text-primary'}
          ${(path.startsWith("/blog") && item.href==="/blog") || (path.startsWith("/portfolio") && item.href==="/portfolio") ? "text-primary": null}`}
      >
        {item.label}
        {item.submenu && (
          <Icon icon="solar:alt-arrow-down-bold" className="ml-1 text-xs opacity-50 group-hover:rotate-180 transition-transform duration-300" />
        )}
        {/* Animated Underline */}
        <span className={`absolute bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 rounded-full ${path === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
      </Link>
      {submenuOpen && (
        <div
          className={`absolute py-2 left-0 mt-0.5 top-8 w-60 bg-white dark:bg-darklight shadow-lg dark:shadow-dark-md rounded-lg `}
          data-aos="fade-up"
          data-aos-duration="400"
        >
          {item.submenu?.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className={`block px-4 py-2 text-[15px]  ${
                path === subItem.href
                  ? "bg-primary text-white"
                  : "text-black hover:bg-gray-200 dark:hover:bg-midnight_text dark:text-white hover:text-dark dark:hover:text-white"
              }`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
