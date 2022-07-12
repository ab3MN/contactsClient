import React, { FC } from 'react';
import { ITask } from '../TaskType';
import './TaskList.scss';

interface TaskList {
  tasks: Array<ITask>;
}

const TasksList: FC<TaskList> = ({ tasks }) => {
  console.log(tasks);
  return (
    <ul>
      {tasks.map(el => (
        <li key={el._id}>
          <h3>{el.title}</h3>
          <h5>{el.text}</h5>
          <p>
            <span>Start:{el.start}</span>
            <br />
            <span>Finish:{el.finish}</span>
          </p>{' '}
          <div
            className={
              !el.isCompleted ? 'completed completed_box' : 'completed_box'
            }
          ></div>
        </li>
      ))}
    </ul>
  );
};

export default TasksList;
