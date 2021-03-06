import { IEntity } from '@/interfaces';
import firebase from 'firebase/app';

export class FirestoreService {
  constructor (
    private fs: firebase.firestore.Firestore
  ) {}

  private submitError (err: Error) {
    console.debug(err)
  }

  getProjects () {
    return this.fs
      .collection('portfolio')
      .doc('defaultPortfolio')
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
  }

  getExperience () {
    return this.fs
      .collection('portfolio')
      .doc('defaultPortfolio')
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
  }

  getCertificates () {
    return this.fs
      .collection('portfolio')
      .doc('defaultPortfolio')
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
  }

  getPortfolio () {
    return this.fs
      .collection('portfolio')
      .doc('defaultPortfolio')
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
  }
}