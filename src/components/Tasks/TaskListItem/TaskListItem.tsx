import React, { FC } from 'react';
import { ITask } from '../TaskType';
import './TaskListItem.scss';

import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import IconButton from '@mui/material/IconButton';
import DeleteButton from '../../shared/Buttons/DeleteButton/DeleteButton';
const throttle = require('lodash.throttle');

interface ITaskListItemProps {
  task: ITask;
  onDelete: (_id: string) => void;
  onComplete: (_id: string, isCompleted: boolean) => void;
}

const TaskListItem: FC<ITaskListItemProps> = ({
  task,
  onDelete,
  onComplete,
}) => {
  return (
    <>
      <h3 className="task--list__name">{task.title}</h3>{' '}
      <h4 className="task--list__text">{task.text}</h4>
      <p>
        <span className="task--list__date">Start: </span>
        {task.start}
        <br />
        <span className="task--list__date">Finish: </span>
        {task.finish}
      </p>{' '}
      <DeleteButton
        onDelete={onDelete}
        id={task._id}
        style={{
          color: task.isCompleted ? 'rgb(0, 0, 0)' : 'rgb(240, 248, 255)',
        }}
      />
      <IconButton
        onClick={throttle(() => onComplete(task._id, task.isCompleted), 2000)}
        sx={{
          color: task.isCompleted ? 'rgb(0, 0, 0)' : 'rgb(240, 248, 255)',
          '&:hover': {
            color: 'rgb(3, 233, 244)',
          },
        }}
      >
        {task.isCompleted ? <DoneAllIcon /> : <RemoveDoneIcon />}
      </IconButton>
    </>
  );
};

export default React.memo(TaskListItem);
