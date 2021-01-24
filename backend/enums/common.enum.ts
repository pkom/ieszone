export enum Actions {
  CREATE = 'create',
  EDIT = 'edit',
  VIEW = 'view',
  VOID = 'void',
  ASSIGN = 'assign',
  UNASSIGN = 'unassign',
  REVIEW = 'review',
  APPROVE = 'approve',
}

export enum STATUS {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending',
  VOIDED = 'voided',
  REVIEWED = 'reviewed',
  ASSIGNED = 'assigned',
  UNASSIGNED = 'unassigned',
}

export enum ErrorCode {
  A001 = 'Invalid Jwt',
  A002 = 'Password Mismatch',
}

export enum Controls {
  Common = 'common',
  Auth = 'auth',
  Users = 'users',
  Logs = 'logs',
  Todos = 'todos',
  Notification = 'notification',
  Reminders = 'reminders',
  Timetables = 'timetables',
  Syllabus = 'syllabus',
  Schedules = 'schedules',
  Results = 'results',
  Buses = 'buses',
  Trips = 'trips',
  Events = 'events',
  Leaves = 'leaves',
  Awards = 'awards',
  Activities = 'activities',
  Fees = 'fees',
  Forums = 'forums',
  Messages = 'messages',
  Details = 'details',
}

export enum CRUD {
  LOGIN = 'LOGIN',
  HEALTH = 'HEALTH',
  CONFIG = 'CONFIG',
  CREATEALL = 'CREATEALL',
  CREATEONE = 'CREATEONE',
  READALL = 'READALL',
  READONE = 'READONE',
  UPDATEALL = 'UPDATEALL',
  UPDATEONE = 'UPDATEONE',
  DELETEALL = 'DELETEALL',
  DELETEONE = 'DELETEONE',
}

export enum DESCRIPTION {
  LOGIN = 'Login as a user',
  HEALTH = 'Health check',
  CONFIG = 'Configure the {{key}}',
  CREATEALL = 'Create list of all {{key}}',
  CREATEONE = 'Create requested {{key}}',
  READALL = 'Get list of all {{key}}',
  READONE = 'Get requested {{key}}',
  UPDATEALL = 'Update list of all {{key}}',
  UPDATEONE = 'Update requested {{key}}',
  DELETEALL = 'Delete list of all {{key}}',
  DELETEONE = 'Delete requested {{key}}',
}

export enum LogLevel {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

// GCP log Enums
// DEFAULT	(0) The log entry has no assigned severity level.
// DEBUG	(100) Debug or trace information.
// INFO	(200) Routine information, such as ongoing status or performance.
// NOTICE	(300) Normal but significant events, such as start up, shut down, or a configuration change.
// WARNING	(400) Warning events might cause problems.
// ERROR	(500) Error events are likely to cause problems.
// CRITICAL	(600) Critical events cause more severe problems or outages.
// ALERT	(700) A person must take an action immediately.
// EMERGENCY	(800) One or more systems are unusable.

export enum GcpLogLevel {
  DEFAULT = 'default',
  DEBUG = 'debug',
  INFO = 'info',
  NOTICE = 'notice',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
  ALERT = 'alert',
  EMERGENCY = 'emergency',
}

export enum Color {
  PRIMARY = '#1976d2',
  SECONDARY = '#616161',
  ERROR = '#b92d00',
  ACCENT = '#7f6196',
  WARN = '#c2b678',
  GENTLE = '#78c2a4',
}
