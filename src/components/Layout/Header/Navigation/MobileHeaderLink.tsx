import { useState } from 'react';
import Link from 'next/link';
import { HeaderItem } from '../../../../types/menu';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

const MobileHeaderLink: React.FC<{ item: HeaderItem; onClick?: () => void }> = ({ item, onClick }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname();

  const handleToggle = (e: React.MouseEvent) => {
    if (item.submenu) {
      e.preventDefault();
      setSubmenuOpen(!submenuOpen);
    } else {
      onClick?.();
    }
  };

  const isActive = path === item.href || (item.submenu?.some(sub => path === sub.href));

  return (
    <div className="w-full mb-2">
      <Link 
        href={item.href} 
        onClick={handleToggle}
        className={`flex items-center justify-between w-full p-4 rounded-2xl transition-all duration-300 ${
          isActive 
            ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' 
            : 'text-midnight_text dark:text-white/70 hover:bg-slate-50 dark:hover:bg-white/5'
        }`}
      >
        <span className="text-xs font-black uppercase tracking-[0.2em] italic">
          {item.label}
        </span>
        {item.submenu && (
          <Icon 
            icon="solar:alt-arrow-down-bold-duotone" 
            className={`text-xl transition-transform duration-300 ${submenuOpen ? 'rotate-180' : ''}`} 
          />
        )}
      </Link>
      
      {submenuOpen && item.submenu && (
        <div className="mt-2 ml-4 pl-4 border-l-2 border-primary/20 space-y-1 animate-fadeIn">
          {item.submenu.map((subItem, index) => (
            <Link 
              key={index} 
              href={subItem.href} 
              onClick={onClick}
              className={`block p-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-colors ${
                path === subItem.href 
                  ? 'text-primary bg-primary/5' 
                  : 'text-slate-400 hover:text-primary dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
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

export default MobileHeaderLink;
