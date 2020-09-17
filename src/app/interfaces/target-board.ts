import { User } from '../interfaces/user';

export interface TargetBoard {
  authorUid: string;
  title: string;
  boardId: string;
}

export interface TargetBoardWithAuthor extends TargetBoard {
  author: User;
}
