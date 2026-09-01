import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import firebaseConfig from '../../firebase-applet-config.json';
import { TodoTask, UserPreferences, AIConfig } from '../types';

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const db = getFirestore(app);

export class DBService {
  private static getUserId(): string | null {
    const auth = getAuth(app);
    return auth.currentUser?.uid || null;
  }

  static async saveUserData(
    tasks: TodoTask[],
    preferences: UserPreferences | null,
    aiConfig: AIConfig | null
  ): Promise<void> {
    const uid = this.getUserId();
    if (!uid) return; // Only save to cloud if logged in

    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, {
        tasks,
        preferences,
        aiConfig,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving user data to Firestore:', error);
    }
  }

  static async loadUserData(): Promise<{
    tasks: TodoTask[];
    preferences: UserPreferences | null;
    aiConfig: AIConfig | null;
  } | null> {
    const uid = this.getUserId();
    if (!uid) return null;

    try {
      const userRef = doc(db, 'users', uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const data = snap.data();
        return {
          tasks: data.tasks || [],
          preferences: data.preferences || null,
          aiConfig: data.aiConfig || null,
        };
      }
    } catch (error) {
      console.error('Error loading user data from Firestore:', error);
    }
    return null;
  }
}
