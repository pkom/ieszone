import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  constructor() {}

  /* Set Items From Localstorage */
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  /* Get Items From Localstorage */
  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  /* Remove Items From Localstorage */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error Removing to localStorage', e);
    }
  }

  /* Clear All Items */
  clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error Clear all from localStorage', e);
    }
  }
}
