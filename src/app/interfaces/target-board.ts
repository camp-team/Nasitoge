import { User } from '../interfaces/user';

export interface TargetBoard {
  authorUid: string;
  title: string;
  boardId: string;
  genre: string;
  subTask: string[];
  importance: string;
}

export interface TargetBoardWithAuthor extends TargetBoard {
  author: User;
}
