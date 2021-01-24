import { ChipPrefix, Color } from './controls.enum';

export interface Chip {
  name: string | number;
  color?: Color;
  removable?: Boolean;
  selectable?: Boolean;
  selected?: Boolean;
  prefix?: ChipPrefix;
}

export interface TabInput {
  name: string;
  link: string;
}

export interface ExpandItem {
  title: string;
  description?: string;
  img?: string;
  icon?: string;
  content?: AnyPayload;
  disabled?: boolean;
  expanded?: boolean;
}

export interface BtnToggle {
  name?: string;
  icon?: string;
  disabled?: boolean;
  value: string;
}

export interface ListItem {
  title?: string;
  description?: string;
  content?: AnyPayload;
  icon?: string;
  img?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  color?: Color;
  heroBg?: string;
  mainBg?: string;
  reverse?: boolean;
  align?: 'left' | 'right' | 'center';
  primaryAction?: ActionBtn;
  secondaryAction?: ActionBtn;
}

export interface ActionBtn {
  icon: string;
  color?: Color;
}

export interface Button {
  name: string;
  color?: Color;
}

export interface Card {
  title: string;
  subTitle?: string;
  img?: string;
  class?: string;
  tag?: string;
  buttons?: Button[];
  content?: AnyPayload;
}

export interface AnyPayload {
  [x: string]: any;
}
