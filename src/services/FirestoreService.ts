// Interfaces
import { IEntity, ISocialLink } from '@/interfaces';
import firebase from 'firebase/app';

// RXJS
import { BehaviorSubject } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';

export class FirestoreService {
  loadingCounter: BehaviorSubject<number>;

  constructor (private fs: firebase.firestore.Firestore) {
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

  private updateDB (ref: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>, update: { [key: string]: any }) {
    return ref
      .set(update, { merge: true })
      .catch(err => {
        this.submitError(err);
        return err
      })
      .finally(() => {
        this.stopLoading();
      })
  }

  private deleteDB (ref: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>) {
    return ref
      .delete()
      .catch(err => {
        this.submitError(err);
        return err
      })
      .finally(() => {
        this.stopLoading();
      })
  }

  private generateNewData (data: IEntity) {
    return {
      ...data,
      id: uuidv4(),
      created: new Date()
    };
  }

  private getProjectsRef () {
    return this.getDefaultPortfolio().collection('projects');
  }

  private getProjectRef (id: string) {
    return this.getProjectsRef().doc(id);
  }

  private getCertificatesRef () {
    return this.getDefaultPortfolio().collection('certificates');
  }

  private getCertificateRef (id: string) {
    return this.getCertificatesRef().doc(id);
  }

  private getExperiencesRef () {
    return this.getDefaultPortfolio().collection('experience');
  }

  private getExperienceRef (id: string) {
    return this.getExperiencesRef().doc(id);
  }

  deleteProject (id: string) {
    return this.deleteDB(this.getProjectRef(id));
  }

  deleteCertificate (id: string) {
    return this.deleteDB(this.getCertificateRef(id));
  }

  deleteExperience (id: string) {
    return this.deleteDB(this.getExperienceRef(id));
  }

  updatePortfolio (update: { [key: string]: any }) {
    return this.updateDB(this.getDefaultPortfolio(), update);
  }

  updateProject (id: string, update: { [key: string]: any }) {
    return this.updateDB(this.getProjectRef(id), update)
  }

  updateCertificate (id: string, update: { [key: string]: any }) {
    return this.updateDB(this.getCertificateRef(id), update)
  }

  updateExperience (id: string, update: { [key: string]: any }) {
    return this.updateDB(this.getExperienceRef(id), update)
  }

  saveExperience (data: IEntity) {
    const newData = this.generateNewData(data);
    return this.updateExperience(newData.id, newData)
      .then(_ => {
        return newData;
      })
  }

  saveProject (data: IEntity) {
    const newData = this.generateNewData(data);
    return this.updateProject(newData.id, newData)
      .then(_ => {
        return newData;
      })
  }

  saveCertificate (data: IEntity) {
    const newData = this.generateNewData(data);
    return this.updateCertificate(newData.id, newData)
      .then(_ => {
        return newData;
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
    return this.getProjectsRef()
      .orderBy('created', 'desc')
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
    return this.getExperiencesRef()
      .orderBy('created', 'desc')
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
    return this.getCertificatesRef()
      .orderBy('created', 'desc')
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