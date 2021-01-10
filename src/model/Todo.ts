export interface ITodo {
  id: number;
  text: string;
  done: boolean;
}

export enum ModalType {
  Edit = 'EDIT',
  Add = 'ADD',
}
