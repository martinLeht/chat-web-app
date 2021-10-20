import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  constructor() { }

  /**
   * Get username stored in session
   */
  public getStoredUser(): User {
    const userId: string = sessionStorage.getItem("userId")
    const username: string = sessionStorage.getItem("username")
    if (!userId || !username) return undefined;
    const user: User = {
      userId: userId,
      username: username
    };
    return user;
  }

  /**
   * Store username in session
   */
  public storeUser(user: User): void {
    sessionStorage.setItem("username", user.username);
    sessionStorage.setItem("userId", user.userId);
  }

  /**
   * Clear session
   */
  public clearSession(): void {
    sessionStorage.clear();
  }
}
