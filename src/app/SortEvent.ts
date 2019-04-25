import { SortDirection } from './ngbd-sortable-header.directive';

export interface SortEvent {
    column: string;
    direction: SortDirection;
  }