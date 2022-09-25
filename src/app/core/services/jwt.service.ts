import CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private key = 'jwtToken';

  getToken(): string {
    const data = window.localStorage.getItem(this.key) || '';
    return this.decrypt(data);
  }

  saveToken(token: string) {
    window.localStorage.setItem(this.key, this.encrypt(token));
  }

  destroyToken() {
    window.localStorage.removeItem(this.key);
  }

  // ==========================================================================
  // For security
  // ==========================================================================

  private encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, environment.storageKey).toString();
  }
  private decrypt(text: string): string {
    return CryptoJS.AES.decrypt(text, environment.storageKey).toString();
  }
}
