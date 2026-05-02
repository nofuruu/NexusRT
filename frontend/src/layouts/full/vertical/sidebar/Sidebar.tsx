import SidebarContent from './sidebaritems';
import SimpleBar from 'simplebar-react';
import { Icon } from '@iconify/react';
import FullLogo from '../../shared/logo/FullLogo';
import { Link, useLocation } from 'react-router-dom'; // Pastikan menggunakan react-router-dom
import { useTheme } from 'src/components/provider/theme-provider';
import { AMLogo, AMMenu, AMMenuItem, AMSidebar, AMSubmenu } from 'tailwind-sidebar';
import 'tailwind-sidebar/styles.css';

interface SidebarItemType {
  heading?: string;
  id?: number | string;
  name?: string;
  title?: string;
  icon?: string;
  url?: string;
  children?: SidebarItemType[];
  disabled?: boolean;
}

const renderSidebarItems = (
  items: SidebarItemType[],
  currentPath: string,
  onClose?: () => void,
  isSubItem: boolean = false,
) => {
  return items.map((item) => {
    // Memberikan key yang lebih aman
    const key = item.id || item.heading || item.name;
    const isSelected = currentPath === item?.url;
    const IconComp = item.icon || null;

    const iconElement = IconComp ? (
      <Icon icon={IconComp} height={22} width={22} />
    ) : (
      <Icon icon={'ri:checkbox-blank-circle-line'} height={10} width={10} />
    );

    // Heading
    if (item.heading) {
      return (
        <div className="mt-4 mb-2" key={`heading-${key}`}>
          <AMMenu
            subHeading={item.heading}
            ClassName="hide-menu leading-21 text-sidebar-foreground font-bold uppercase text-xs dark:text-sidebar-foreground opacity-80"
          />
        </div>
      );
    }

    // Submenu
    if (item.children?.length) {
      return (
        <AMSubmenu
          key={`submenu-${key}`}
          icon={iconElement}
          title={item.name}
          ClassName="mt-0.5 text-sm text-sidebar-foreground dark:text-sidebar-foreground"
        >
          {renderSidebarItems(item.children, currentPath, onClose, true)}
        </AMSubmenu>
      );
    }

    // Regular menu item
    const linkTarget = item.url?.startsWith('https') ? '_blank' : '_self';

    const itemClassNames = isSubItem
      ? `mt-0.5 text-sm text-sidebar-foreground dark:text-sidebar-foreground !hover:bg-transparent ${
          isSelected ? '!bg-transparent !text-primary font-medium' : ''
        }`
      : `mt-0.5 text-sm text-sidebar-foreground dark:text-sidebar-foreground ${
          isSelected ? 'font-medium' : ''
        }`;

    return (
      <div onClick={onClose} key={`item-${key}`}>
        <AMMenuItem
          icon={iconElement}
          isSelected={isSelected}
          link={item.url || undefined}
          target={linkTarget}
          disabled={item.disabled}
          component={Link}
          className={`${itemClassNames}`}
        >
          <span className="truncate flex-1">{item.title || item.name}</span>
        </AMMenuItem>
      </div>
    );
  });
};

const SidebarLayout = ({ onClose }: { onClose?: () => void }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { theme } = useTheme();

  const sidebarMode = theme === 'light' || theme === 'dark' ? theme : undefined;

  return (
    <AMSidebar
      collapsible="none"
      animation={true}
      showProfile={false}
      width={'260px'}
      showTrigger={false}
      mode={sidebarMode}
      // Ubah 'border border-border' menjadi 'border-r border-border' untuk mencegah garis bawah
      className="fixed left-0 top-0 border-r border-border dark:border-border bg-sidebar dark:bg-sidebar z-10 h-screen"
    >
      {/* Menggunakan Flexbox column agar tinggi layout dinamis menyesuaikan zoom 80% */}
      <div className="flex flex-col h-full">
        
        {/* Logo - shrink-0 agar tidak mengecil saat menu penuh */}
        <div className="shrink-0 items-center brand-logo overflow-hidden flex gap-3 px-6 py-4">
          <AMLogo component={Link} href="/dashboard" img="">
            <div className="flex items-center gap-3">
              <FullLogo />
              <span className="text-2xl font-bold dark:text-sidebar-foreground text-sidebar-foreground">
                Nexus<span className="text-primary dark:text-primary">RT</span>
              </span>
            </div>
          </AMLogo>
        </div>

        {/* Sidebar items - flex-1 min-h-0 menggantikan calc(100vh-100px) untuk menghindari bug sub-pixel */}
        <SimpleBar className="flex-1 min-h-0">
          <div className="px-5 py-2">
            {SidebarContent.map((section, index) => (
              <div key={`section-${index}`}>
                {renderSidebarItems(
                  [
                    ...(section.heading ? [{ heading: section.heading }] : []),
                    ...(section.children || []),
                  ],
                  pathname,
                  onClose,
                )}
              </div>
            ))}
          </div>
        </SimpleBar>
        
      </div>
    </AMSidebar>
  );
};

export default SidebarLayout;