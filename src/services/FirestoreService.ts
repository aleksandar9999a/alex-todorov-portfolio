// Interfaces
import { IEntity, ISocialLink } from '@/interfaces';
import firebase from 'firebase/app';

// RXJS
import { BehaviorSubject } from 'rxjs';

export class FirestoreService {
  loadingCounter: BehaviorSubject<number>;

  constructor (
    private fs: firebase.firestore.Firestore
  ) {
    this.loadingCounter = new BehaviorSubject<number>(0);
  }

  private submitError (err: Error) {
    console.debug(err)
    return err;
  }

  private startLoading () {
    this.loadingCounter.next(this.loadingCounter.value + 1);
    return this.loadingCounter.value;
  }

  private stopLoading () {
    this.loadingCounter.next(this.loadingCounter.value - 1);
    return this.loadingCounter.value;
  }

  private getDefaultPortfolio () {
    this.startLoading();

    return this.fs
      .collection('portfolio')
      .doc('defaultPortfolio')
  }

  updatePortfolio (update: { [key: string]: any }) {
    return this.getDefaultPortfolio()
      .set(update, { merge: true })
      .catch(err => {
        this.submitError(err);
        return err
      })
      .finally(() => {
        this.stopLoading();
      })
  }

  getSocials () {
    return this.getDefaultPortfolio()
      .collection('socials')
      .get()
      .then(shot => {
        return shot.docs.map(doc => {
          return doc.data();
        }) as ISocialLink[];
      })
      .catch(err => {
        this.submitError(err);
        return err
      })
      .finally(() => {
        this.stopLoading();
      })
  }

  getProjects () {
    return this.getDefaultPortfolio()
      .collection('projects')
      .get()
      .then(shot => {
        return shot.docs.map(doc => {
          return doc.data();
        }) as IEntity[];
      })
      .catch(err => {
        this.submitError(err);
        return err
      })
      .finally(() => {
        this.stopLoading();
      })
  }

  getExperience () {
    return this.getDefaultPortfolio()
      .collection('experience')
      .get()
      .then(shot => {
        return shot.docs.map(doc => {
          return doc.data();
        }) as IEntity[];
      })
      .catch(err => {
        this.submitError(err);
        return err
      })
      .finally(() => {
        this.stopLoading();
      })
  }

  getCertificates () {
    return this.getDefaultPortfolio()
      .collection('certificates')
      .get()
      .then(shot => {
        return shot.docs.map(doc => {
          return doc.data();
        }) as IEntity[];
      })
      .catch(err => {
        this.submitError(err);
        return err
      })
      .finally(() => {
        this.stopLoading();
      })
  }

  getPortfolio () {
    return this.getDefaultPortfolio()
      .get()
      .then(shot => {
        return shot.data()
      })
      .then(data => {
        if (!data) {
          return Promise.reject(new Error('Default data is not founded!'))
        }

        return data
      })
      .catch(err => {
        this.submitError(err);
        return err
      })
      .finally(() => {
        this.stopLoading();
      })
  }
}