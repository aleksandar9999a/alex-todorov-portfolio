import firebase from 'firebase/app';

export class AuthService {
  isAuth = false;
  user: firebase.User | null = null

  constructor(
    private auth: firebase.auth.Auth
  ) {}

  onAuthChange (fn: (user: firebase.User | null) => void) {
    return this.auth.onAuthStateChanged(user => {
      this.isAuth = !!user;
      this.user = user;

      fn(user);
    });
  }
}
