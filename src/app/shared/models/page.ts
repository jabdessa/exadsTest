/**
 * An object used to get page information from the server
 */
export class Page {
  // The total number of elements
  count: number = 0;

  // The number of elements in the page
  limit: string = "20";

  // The current page number
  offset: number = 0;
}
