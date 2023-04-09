export interface TimesheetItem {
  id: number;
  start: string;
  startLunch: string;
  endLunch: string;
  end: string;
}

export interface Timesheet {
  items: TimesheetItem[];
  count: number;
  currentPage: number;
  pageSize: number;
  toalPages: number;
  nextPages?: string;
  previousPage: string;
}
