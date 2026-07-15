import type { Component } from 'vue';
import BaseAccordion from '../components/ui/BaseAccordion.vue';
import BaseAlert from '../components/ui/BaseAlert.vue';
import BaseAvatar from '../components/ui/BaseAvatar.vue';
import BaseBadge from '../components/ui/BaseBadge.vue';
import BaseBreadcrumb from '../components/ui/BaseBreadcrumb.vue';
import BaseButton from '../components/ui/BaseButton.vue';
import BaseCalendar from '../components/ui/BaseCalendar.vue';
import BaseCard from '../components/ui/BaseCard.vue';
import BaseCarousel from '../components/ui/BaseCarousel.vue';
import BaseChart from '../components/ui/BaseChart.vue';
import BaseCheckbox from '../components/ui/BaseCheckbox.vue';
import BaseDatetimePicker from '../components/ui/BaseDatetimePicker.vue';
import BaseDialog from '../components/ui/BaseDialog.vue';
import BaseDrawer from '../components/ui/BaseDrawer.vue';
import BaseField from '../components/ui/BaseField.vue';
import BaseFieldset from '../components/ui/BaseFieldset.vue';
import BaseForm from '../components/ui/BaseForm.vue';
import BaseIcon from '../components/ui/BaseIcon.vue';
import BaseInput from '../components/ui/BaseInput.vue';
import BaseItem from '../components/ui/BaseItem.vue';
import BaseKbd from '../components/ui/BaseKbd.vue';
import BaseMenu from '../components/ui/BaseMenu.vue';
import BaseMeter from '../components/ui/BaseMeter.vue';
import BaseMultiselect from '../components/ui/BaseMultiselect.vue';
import BaseNavigationMenu from '../components/ui/BaseNavigationMenu.vue';
import BasePagination from '../components/ui/BasePagination.vue';
import BaseProgress from '../components/ui/BaseProgress.vue';
import BaseRadioGroup from '../components/ui/BaseRadioGroup.vue';
import BaseScrollArea from '../components/ui/BaseScrollArea.vue';
import BaseSelect from '../components/ui/BaseSelect.vue';
import BaseSeparator from '../components/ui/BaseSeparator.vue';
import BaseSidebar from '../components/ui/BaseSidebar.vue';
import BaseSkeleton from '../components/ui/BaseSkeleton.vue';
import BaseSlider from '../components/ui/BaseSlider.vue';
import BaseSpinner from '../components/ui/BaseSpinner.vue';
import BaseSwitch from '../components/ui/BaseSwitch.vue';
import BaseTable from '../components/ui/BaseTable.vue';
import BaseTabs from '../components/ui/BaseTabs.vue';
import BaseTextarea from '../components/ui/BaseTextarea.vue';
import BaseTooltip from '../components/ui/BaseTooltip.vue';

export interface DesignSystemElementDefinition {
  elementName: string;
  component: Component;
}

export const elementDefinitions: DesignSystemElementDefinition[] = [
  { elementName: 'accordion', component: BaseAccordion },
  { elementName: 'alert', component: BaseAlert },
  { elementName: 'avatar', component: BaseAvatar },
  { elementName: 'badge', component: BaseBadge },
  { elementName: 'breadcrumb', component: BaseBreadcrumb },
  { elementName: 'button', component: BaseButton },
  { elementName: 'calendar', component: BaseCalendar },
  { elementName: 'card', component: BaseCard },
  { elementName: 'carousel', component: BaseCarousel },
  { elementName: 'chart', component: BaseChart },
  { elementName: 'checkbox', component: BaseCheckbox },
  { elementName: 'datetime-picker', component: BaseDatetimePicker },
  { elementName: 'dialog', component: BaseDialog },
  { elementName: 'drawer', component: BaseDrawer },
  { elementName: 'field', component: BaseField },
  { elementName: 'fieldset', component: BaseFieldset },
  { elementName: 'form', component: BaseForm },
  { elementName: 'icon', component: BaseIcon },
  { elementName: 'input', component: BaseInput },
  { elementName: 'item', component: BaseItem },
  { elementName: 'kbd', component: BaseKbd },
  { elementName: 'menu', component: BaseMenu },
  { elementName: 'meter', component: BaseMeter },
  { elementName: 'multiselect', component: BaseMultiselect },
  { elementName: 'navigation-menu', component: BaseNavigationMenu },
  { elementName: 'pagination', component: BasePagination },
  { elementName: 'progress', component: BaseProgress },
  { elementName: 'radio-group', component: BaseRadioGroup },
  { elementName: 'scroll-area', component: BaseScrollArea },
  { elementName: 'select', component: BaseSelect },
  { elementName: 'separator', component: BaseSeparator },
  { elementName: 'sidebar', component: BaseSidebar },
  { elementName: 'skeleton', component: BaseSkeleton },
  { elementName: 'slider', component: BaseSlider },
  { elementName: 'spinner', component: BaseSpinner },
  { elementName: 'switch', component: BaseSwitch },
  { elementName: 'table', component: BaseTable },
  { elementName: 'tabs', component: BaseTabs },
  { elementName: 'textarea', component: BaseTextarea },
  { elementName: 'tooltip', component: BaseTooltip },
];
