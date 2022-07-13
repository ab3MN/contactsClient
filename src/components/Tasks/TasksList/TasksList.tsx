import React, { FC } from 'react';
import { ITask } from '../TaskType';
import './TaskList.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
const throttle = require('lodash.throttle');

interface TaskList {
  tasks: Array<ITask>;
  onDelete: (_id: string) => void;
  onComplete: (_id: string, isCompleted: boolean) => void;
}

const TasksList: FC<TaskList> = ({ tasks, onDelete, onComplete }) => {
  console.log('TasksList render');

  return (
    <ul>
      {tasks.map(el => (
        <li key={el._id} className={el.isCompleted ? 'completed ' : ''}>
          <h3>{el.title}</h3>
          <h5>{el.text}</h5>
          <p>
            <span>Start:{el.start}</span>
            <br />
            <span>Finish:{el.finish}</span>
          </p>{' '}
          <Checkbox
            checked={el.isCompleted}
            sx={{
              color: pink[800],
              '&.Mui-checked': {
                color: pink[600],
              },
            }}
          />
          <button type="button" onClick={throttle(() => onDelete(el._id))}>
            Delete
          </button>{' '}
          <button
            type="button"
            onClick={throttle(() => onComplete(el._id, el.isCompleted), 2000)}
          >
            Complete
          </button>{' '}
        </li>
      ))}
    </ul>
  );
};

export default React.memo(TasksList);
