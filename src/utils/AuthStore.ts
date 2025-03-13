
class AuthClientStore {
    static getAccessToken(token:string) {
      return localStorage.getItem(token);
    }
  
    static setAccessToken(token: string) {
      localStorage.setItem('auth', token);
    }
  
    static removeAccessToken(): void {
      localStorage.removeItem('auth');
    }
  
    static getRefreshToken() {
      return localStorage.getItem('refreshToken');
    }
  
    static setRefreshToken(token: string) {
      localStorage.setItem('refreshToken', token);
    }
  
    static removeRefreshToken(): void {
      localStorage.removeItem('refreshToken');
    }
  }
  
  export default AuthClientStore;