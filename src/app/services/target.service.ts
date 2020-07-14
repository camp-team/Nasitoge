import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Target, TargetWithAuthor } from '../interfaces/target';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, combineLatest, of, from } from 'rxjs';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { firestore } from 'firebase';
import { User } from '../interfaces/user';
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

  // マイページで一覧として表示する
  // getTargetByAuthorId(authorUid: string): Observable<Target[]> {
  //   return this.db
  //     .collection<Target>('targetWithAuthor', (ref) =>
  //       ref.where('authorUid', '==', 'authorUid')
  //     ).valueChanges();

  ////    return this.db
  ////      .collection<Target>('targets', (ref) =>
  ////    ////    ref.where('authorUid', '==', authorUid)
  ////      )
  ////      .valueChanges()
  ////      .pipe(
  ////    ////    map((targets) => {
  ////    ////      if (targets.length) {
  ////    ////    ////    return targets[0];
  ////    ////      } else {
  ////    ////    ////    return null;
  ////    ////      }
  ////    ////    })
  ////      );
  // }

  updateTarget(targetId: string, data: Target): Promise<void> {
    return this.db.doc('targets/${targetId}').update(data);
  }

  deleteTarget(targetId: string): Promise<void> {
    return this.db.doc('targets/${targetId}').delete();
  }

  createTarget(data: Omit<Target, 'targetId' | 'createdAt'>): Promise<void> {
    const id = this.db.createId();
    const target: Target = {
      targetId: id,
      authorUid: data.authorUid,
      target: data.target,
      targetDate: data.targetDate,
      createdAt: firestore.Timestamp.now(),
    };
    return this.db
      .doc(`targets/${id}`)
      .set(target)
      .then(() => {
        this.snackBar.open('目標を作成しました！', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('target/' + id);
      });
  }

  getTargetWithAuthor(): Observable<TargetWithAuthor[]> {
    let targets: Target[];
    return this.db
      .collection<Target>('targets', (ref) => {
        return ref.orderBy('createdAt', 'desc');
      })
      .valueChanges()
      .pipe(
        switchMap((posts: Target[]) => {
          targets = posts;

          if (targets.length) {
            const uniqueAuthorIds: string[] = targets
              .filter((target, index, array) => {
                return (
                  array.findIndex(
                    (value) => value.authorUid === target.authorUid
                  ) === index
                );
              })
              .map((target) => target.authorUid);
            return combineLatest(
              uniqueAuthorIds.map((id) => {
                return this.db.doc(`users/${id}`).valueChanges();
              })
            ); // 重複削除　配列　set
          } else {
            return of([]);
          }
        }),
        map((users: User[]) => {
          return targets.map((target) => {
            const result: TargetWithAuthor = {
              ...target,
              author: users.find((user) => user.authorUid === target.authorUid),
            };
            return result;
          });
        })
      );
  }

  getTargetsWithAuthorsByTargetId(
    targetId: string
  ): Observable<TargetWithAuthor> {
    return this.db
      .doc<Target>(`targets/${targetId}`)
      .valueChanges()
      .pipe(
        switchMap((target: Target) => {
          const user$: Observable<User> = this.db
            .doc<User>(`users/${target.authorUid}`)
            .valueChanges();
          return combineLatest([user$, of(target)]);
        }),
        map(([author, target]) => {
          return {
            ...target,
            author,
          };
        })
      );
  }
}
