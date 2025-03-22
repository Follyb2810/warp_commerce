
class AuthStore {
    static getAccessToken():string| null {
      return localStorage.getItem('auth');
    }
  
    static setAccessToken(token: string) {
      localStorage.setItem('auth', token);
    }
  
    static removeAccessToken(): void {
      localStorage.removeItem('auth');
    }
  
    static getRefreshToken():string| null {
      return localStorage.getItem('refreshToken');
    }
  
    static setRefreshToken(token: string) {
      localStorage.setItem('refreshToken', token);
    }
  
    static removeRefreshToken(): void {
      localStorage.removeItem('refreshToken');
    }
  }
  
  export default AuthStore;