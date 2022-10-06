import React, { FC } from 'react';
import { ITask } from '../TaskType';
import './TaskList.scss';
import 'react-datepicker/dist/react-datepicker.css';

import TaskListItem from '../TaskListItem/TaskListItem';

interface TaskList {
  tasks: Array<ITask>;
  onDelete: (_id: string) => void;
  onComplete: (_id: string, isCompleted: boolean) => void;
}

const TasksList: FC<TaskList> = ({ tasks, onDelete, onComplete }) => {
  const completedTasks = tasks.filter(el => el.isCompleted === true);
  const currentTasks = tasks.filter(el => el.isCompleted !== true);

  return (
    <section className="tasks">
      <h2 className="task--list__title">Current :</h2>
      <ul className="task--list">
        {currentTasks.length > 0 ? (
          currentTasks.map(el => (
            <li
              key={el._id}
              className={
                el.isCompleted
                  ? 'task--list__item completed '
                  : 'task--list__item'
              }
            >
              <TaskListItem
                task={el}
                onDelete={onDelete}
                onComplete={onComplete}
              />
            </li>
          ))
        ) : (
          <h5 className="task--list__title">No Current tasks</h5>
        )}
      </ul>{' '}
      <h2 className="task--list__title">Completed :</h2>
      <ul className="task--list">
        {completedTasks.length > 0 ? (
          completedTasks.map(el => (
            <li
              key={el._id}
              className={
                el.isCompleted
                  ? 'task--list__item completed '
                  : 'task--list__item'
              }
            >
              <TaskListItem
                task={el}
                onDelete={onDelete}
                onComplete={onComplete}
              />
            </li>
          ))
        ) : (
          <h5 className="task--list__title">No Completed tasks</h5>
        )}
      </ul>
    </section>
  );
};

export default React.memo(TasksList);
