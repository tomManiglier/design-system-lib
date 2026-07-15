import { defineCustomElement } from 'vue';
import { elementDefinitions } from './registry';

export type {
  AccordionItem,
  BreadcrumbItem,
  IconName,
  MenuEntry,
  NavigationMenuItem,
  NavigationMenuLink,
  RadioOption,
  SelectOption,
  SidebarGroup,
  TabItem,
  TableColumn,
} from '../components/ui/types';

export interface RegisterDesignSystemOptions {
  prefix?: string;
}

export const defaultElementPrefix = 'ds';

export const designSystemElements = elementDefinitions.map(
  ({ elementName }) => `${defaultElementPrefix}-${elementName}`,
);

export function registerDesignSystem(options: RegisterDesignSystemOptions = {}) {
  if (typeof customElements === 'undefined') {
    return [];
  }

  const prefix = options.prefix ?? defaultElementPrefix;
  const registered: string[] = [];

  for (const definition of elementDefinitions) {
    const tagName = `${prefix}-${definition.elementName}`;

    if (!customElements.get(tagName)) {
      customElements.define(
        tagName,
        defineCustomElement(definition.component as never, { shadowRoot: false }),
      );
    }

    registered.push(tagName);
  }

  return registered;
}
