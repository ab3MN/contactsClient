export interface ITask {
  title: string;
  text: string;
  finish: string;
  start: string;
  isCompleted: boolean;
  _id: string;
}

export interface ITaskForm {
  title: string;
  text: string;
}
