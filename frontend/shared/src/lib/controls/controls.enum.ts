export const ControlError = {
  email: '<strong>Invalid</strong> email id',
  required: 'This is a <strong>required</strong> field',
  default: 'Default Error',
};

export type ButtonType =
  | 'basic'
  | 'raised'
  | 'stroked'
  | 'flat'
  | 'icon'
  | 'fab'
  | 'mini';

export type InputType =
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'textarea'
  | 'time'
  | 'url'
  | 'week';

export enum MatAppearance {
  LEGACY = 'legacy',
  STANDARD = 'standard',
  FILL = 'fill',
  OUTLINE = 'outline',
}

export enum MatColor {
  NONE = 'none',
  PRIMARY = 'primary',
  WARN = 'warn',
  ACCENT = 'accent',
}

export enum ChipPrefix {
  ACCOUNT_INFO = 'account_circle',
  DOWN_TREND = 'arrow_circle_down',
  UP_TREND = 'arrow_circle_up',
  SELECTED = 'check_circle',
  REJECTED = 'cancel',
  IMMEDIATE = 'offline_bolt',
  STAR = 'stars',
  USERS = 'supervised_user_circle',
  NOTICE = 'error',
  DEFAULT = 'fiber_manual_record',
  DENIED = 'not_interested',
  ADD = 'add_circle',
  REMOVE = 'remove_circle',
  MONEY = 'monetization_on',
  TARGET = 'adjust',
  SCATTER = 'blur_circular',
  FOCUSED = 'motion_photos_on',
  SPORT = 'run_circle',
  ORIGIN = 'trip_origin',
  MARKED = 'radio_button_checked',
  UNMARKED = 'radio_button_unchecked',
}

export enum Color {
  PRIMARY = '#1976d2',
  SECONDARY = '#616161',
  ERROR = '#b92d00',
  ACCENT = '#7f6196',
  WARN = '#c2b678',
  GENTLE = '#78c2a4',
}
