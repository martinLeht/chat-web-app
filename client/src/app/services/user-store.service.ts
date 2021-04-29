import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  constructor() { }

  /**
   * Get username stored in session
   */
  public getStoredUser(): string {
    let storedUser: string = sessionStorage.getItem("username");
    return storedUser ? storedUser : "";
  }

  /**
   * Store username in session
   */
  public storeUser(username: string): void {
    sessionStorage.setItem("username", username);
  }

  /**
   * Clear session
   */
  public clearSession(): void {
    sessionStorage.clear();
  }
}
