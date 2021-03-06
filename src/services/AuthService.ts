import firebase from 'firebase/app';

export class AuthService {
  isAuth = false;
  user: firebase.User | null = null

  constructor(
    private auth: firebase.auth.Auth
  ) {}

  login (email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        console.debug(err);
        return err;
      })
  }

  onAuthChange (fn: (user: firebase.User | null) => void) {
    return this.auth.onAuthStateChanged(user => {
      this.isAuth = !!user;
      this.user = user;

      fn(user);
    });
  }
}
