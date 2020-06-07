import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Target } from '../interfaces/target';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TargetService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  getTargetByAuthorId(authorUid: string): Observable<Target> {
    return this.db
      .collection<Target>('targets', (ref) =>
        ref.where('authorUid', '==', authorUid)
      )
      .valueChanges()
      .pipe(
        map((targets) => {
          if (targets.length) {
            return targets[0];
          } else {
            return null;
          }
        })
      );
  }

  updateTarget(targeId: string, data: Target): Promise<void> {
    return this.db.doc('targets/${targetId}').update(data);
  }

  deleteTarget(targeId: string): Promise<void> {
    return this.db.doc('targets/${targetId}').delete();
  }

  createTarget(data: Omit<Target, 'targetId' | 'createdAt'>): Promise<void> {
    const id = this.db.createId();
    const target: Target = {
      targetId: id,
      authorUid: data.authorUid,
      target: data.target,
      targetDate: data.targetDate,
      createdAt: new Date(),
    };
    return this.db
      .doc(`targets/${id}`)
      .set(target)
      .then(() => {
        this.snackBar.open('目標を作成しました！', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('target');
      });
  }
}
