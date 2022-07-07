import { environment } from "@environments/environment";

/**
 * Provides global settings for data services.
 */
export class Config {

  /** Configuration service URL */
  public static BASE_URL = environment.urlBackend;

  // URLS: endpoints 
  // USERS
  public static USERS = 'users';

  // STATUSES
  public static STATUSES = 'statuses';


}