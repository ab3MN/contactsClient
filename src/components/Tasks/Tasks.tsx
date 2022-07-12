import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import TasksList from './TasksList/TasksList';
import { ITaskForm, ITask } from './TaskType';
import axios from 'axios';
import { getFormatDate } from '../../helpers/getCurrentDay';

const Tasks = () => {
  /* ==================== FETCH TASKS  ==================== */
  const [tasks, setTasks] = React.useState<ITask[]>([]);

  React.useEffect(() => {
    axios
      .get('/tasks')
      .then(res => setTasks(res.data))
      .catch(e => console.log(e));
  }, []);
  /* ==================== TASK  ==================== */
  const [task, setTask] = React.useState<ITaskForm>({ title: '', text: '' });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ): void => setTask({ ...task, [e.target.name]: e.target.value });

  /* ==================== START FINISH DATE ==================== */
  const [startDate, setStartDate] = React.useState(new Date());
  const [isOpenStartDate, setIsOpenStartDate] = React.useState(false);

  const [finishDate, setFinishDate] = React.useState(new Date());
  const [isOpenFinishDate, setIsOpenFinishDate] = React.useState(false);

  /* ==================== SUBMIT ==================== */
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const start = getFormatDate(startDate.toISOString());
    const finish = getFormatDate(finishDate.toISOString());

    axios
      .post<ITask>('/tasks', {
        ...task,
        start,
        finish,
        isCompleted: false,
      })
      .then(res => setTask(res.data))
      .catch(e => console.log(e));

    setTask({ title: '', text: '' });
  };

  return (
    <section>
      {/* ==================== FORM ==================== */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Email :
          <input
            name="title"
            id="title"
            value={task.title}
            onChange={handleChange}
          />
        </label>{' '}
        <label htmlFor="text">
          Name :
          <textarea
            name="text"
            id="text"
            value={task.text}
            onChange={handleChange}
          />
        </label>{' '}
        {/* ==================== START FINISH DATE ==================== */}
        <button
          type="button"
          onClick={() => setIsOpenFinishDate(!isOpenStartDate)}
          data-set="start"
        >
          Select a start date
        </button>
        {isOpenStartDate && (
          <DatePicker
            onChange={e => {
              e && setStartDate(e);
              setIsOpenStartDate(!isOpenFinishDate);
            }}
            calendarClassName="rasta-stripes"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            inline
          />
        )}
        <button
          type="button"
          onClick={() => setIsOpenFinishDate(!isOpenFinishDate)}
          data-set="finish"
        >
          Select a finish date
        </button>
        {isOpenFinishDate && (
          <DatePicker
            name="finish"
            onChange={e => {
              e && setFinishDate(e);
              setIsOpenFinishDate(!isOpenFinishDate);
            }}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            inline
          />
        )}
        {/* ==================== SUBMIT ==================== */}
        <button type="submit">Add Task</button>
      </form>{' '}
      {/* ==================== TASK LIST ==================== */}
      {tasks.length >= 1 && <TasksList tasks={tasks} />}
    </section>
  );
};

export default Tasks;
