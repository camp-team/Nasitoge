import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

admin.initializeApp()

const db = admin.firestore();

export const createUser = functions.region("asia-northeast1").auth.user().onCreate((afuser) =>{
  return db.doc(`users/${afuser.uid}`).set({
    authorUid: afuser.uid,
    name: afuser.displayName,
    avatarURl: afuser.photoURL,
    email: afuser.email,
    createdAt: new Date(),
  });
});

export const deleteUser = functions.auth.user().onDelete((afuser) =>{
  return db.doc(`users/${afuser.uid}`).delete();
});
