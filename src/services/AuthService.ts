import firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

export class AuthService {
  isAuth = false;
  user: firebase.User | null = null
  loadingCounter: BehaviorSubject<number>;

  constructor(
    private auth: firebase.auth.Auth
  ) {
    this.loadingCounter = new BehaviorSubject<number>(0);
  }

  private startLoading () {
    this.loadingCounter.next(this.loadingCounter.value + 1);
    return this.loadingCounter.value;
  }

  private stopLoading () {
    this.loadingCounter.next(this.loadingCounter.value - 1);
    return this.loadingCounter.value;
  }

  logout () {
    this.startLoading();

    return this.auth
      .signOut()
      .catch(err => {
        console.debug(err);
        return err;
      })
      .finally(() => {
        this.stopLoading();
      })
  }

  login (email: string, password: string) {
    this.startLoading();

    return this.auth
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        console.debug(err);
        return err;
      })
      .finally(() => {
        this.stopLoading();
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
