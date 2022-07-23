import React, { FC } from 'react';
import { ITask } from '../TaskType';
import './TaskList.scss';
import 'react-datepicker/dist/react-datepicker.css';

import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import IconButton from '@mui/material/IconButton';
import DeleteButton from '../../shared/Buttons/DeleteButton/DeleteButton';
const throttle = require('lodash.throttle');

interface TaskList {
  tasks: Array<ITask>;
  onDelete: (_id: string) => void;
  onComplete: (_id: string, isCompleted: boolean) => void;
}

const TasksList: FC<TaskList> = ({ tasks, onDelete, onComplete }) => {
  console.log('TasksList render');

  return (
    <ul className="task--list">
      {tasks.map(el => (
        <li
          key={el._id}
          className={
            el.isCompleted ? 'task--list__item completed ' : 'task--list__item'
          }
        >
          {' '}
          <h3 className="task--list__title">{el.title}</h3>{' '}
          <h5 className="task--list__text">{el.text}</h5>
          <p>
            <span className="task--list__date">Start: </span>
            {el.start}
            <br />
            <span className="task--list__date">Finish: </span>
            {el.finish}
          </p>{' '}
          <DeleteButton onDelete={onDelete} id={el._id} />
          <IconButton
            onClick={throttle(() => onComplete(el._id, el.isCompleted), 2000)}
            sx={{
              color: 'rgb(240, 248, 255)',
              '&:hover': {
                color: 'rgb(3, 233, 244)',
              },
            }}
          >
            {el.isCompleted ? <DoneAllIcon /> : <RemoveDoneIcon />}
          </IconButton>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(TasksList);
