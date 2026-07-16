export interface SelectOption {
  label: string;
  value: string | number;
}

export interface RadioOption {
  label: string;
  value: string | number;
}

export interface TabItem {
  label: string;
  value: string;
}

export interface AccordionItem {
  title: string;
  content: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  to?: string;
}

export interface NavigationMenuLink {
  label: string;
  description?: string;
  to?: string;
  href?: string;
}

export interface NavigationMenuItem {
  label: string;
  links?: NavigationMenuLink[];
  to?: string;
  href?: string;
}

export interface MenuEntry {
  label?: string;
  value?: string;
  icon?: IconName;
  danger?: boolean;
  separator?: boolean;
}

export interface SidebarGroup {
  title: string;
  items: { label: string; value: string }[];
}

export interface TableColumn {
  key: string;
  label: string;
}

export type IconName =
  | 'search'
  | 'plus'
  | 'check'
  | 'close'
  | 'chevron-down'
  | 'chevron-right'
  | 'arrow-right'
  | 'bell'
  | 'user'
  | 'users'
  | 'mail'
  | 'trash'
  | 'heart'
  | 'settings'
  | 'file'
  | 'folder'
  | 'download'
  | 'upload'
  | 'calendar'
  | 'clock'
  | 'phone'
  | 'globe'
  | 'building'
  | 'truck'
  | 'wrench'
  | 'chart'
  | 'filter'
  | 'edit'
  | 'lock'
  | 'info'
  | 'warning'
  | 'star'
  | 'briefcase'
  | 'print'
  | 'share'
  | 'logout'
  | 'copy'
  | 'sun'
  | 'moon';
