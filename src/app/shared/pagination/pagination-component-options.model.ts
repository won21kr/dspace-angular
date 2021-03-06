import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

export class PaginationComponentOptions extends NgbPaginationConfig {
  /**
   * ID for the pagination instance. Only useful if you wish to
   * have more than once instance at a time in a given component.
   */
  id: string;

  /**
   * The active page.
   */
  currentPage: number = 1;

  /**
   * A number array that represents options for a context pagination limit.
   */
  pageSizeOptions: Array<number> = [ 5, 10, 20, 40, 60, 80, 100 ];

}
