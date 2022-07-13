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
  const [isLoading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    isLoading &&
      axios
        .get('/tasks')
        .then(res => {
          setTasks(res.data);
        })
        .catch(e => console.log(e))
        .finally(() => setLoading(false));
  }, [isLoading]);
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

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const start = getFormatDate(startDate.toISOString());
    const finish = getFormatDate(finishDate.toISOString());

    if (!task.title && !task.text) {
      return;
    }
    try {
      const res = await axios.post<ITask>('/tasks', {
        ...task,
        start,
        finish,
        isCompleted: false,
      });

      setTasks(tasks => [...tasks, res.data]);
    } catch (e) {
      console.log(e);
    }

    setTask({ title: '', text: '' });
  };

  /* ==================== Delete ==================== */
  const handleDelete = async (_id: string) => {
    console.log('aaa');
    try {
      await axios.delete('/tasks/' + _id);
      setTasks(tasks => tasks.filter(el => el._id !== _id));
    } catch (e) {
      console.log(e);
    }
  };
  const _handleDelete = React.useCallback(handleDelete, []);

  /* ==================== PATCH IsCompleted ==================== */
  const handleComplete = async (_id: string, isCompleted: boolean) => {
    try {
      await axios.patch('/tasks/' + _id + '/iscompleted', {
        isCompleted: !isCompleted,
      });
      setLoading(true);

      setTasks(tasks =>
        tasks.map(el =>
          el._id === _id
            ? Object.assign({}, el, { isCompleted: !isCompleted })
            : el,
        ),
      );
    } catch (e) {
      console.log(e);
    }
  };
  const _handleComplete = React.useCallback(handleComplete, []);

  /* ==================== CHANGE FINISH DATE ==================== */
  const handleChangeFinishDate = (date: string) => {
    console.log('aaaaaa');
    console.log(date);
  };
  const _handleChangeFinishDate = React.useCallback(
    () => handleChangeFinishDate,
    [],
  );

  return (
    <section>
      {/* ==================== FORM ==================== */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title :
          <input
            name="title"
            id="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Enter title"
          />
        </label>{' '}
        <label htmlFor="text">
          Text :
          <textarea
            name="text"
            id="text"
            value={task.text}
            onChange={handleChange}
            placeholder="Enter Text"
          />
        </label>{' '}
        {/* ==================== START FINISH DATE ==================== */}
        <button
          type="button"
          onClick={() => setIsOpenStartDate(!isOpenStartDate)}
          data-set="start"
        >
          Select a start date
        </button>
        {isOpenStartDate && (
          <DatePicker
            onChange={e => {
              e && setStartDate(e);
              setIsOpenStartDate(!isOpenStartDate);
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
      {tasks.length >= 1 && (
        <TasksList
          tasks={tasks}
          onDelete={_handleDelete}
          onComplete={_handleComplete}
        />
      )}
    </section>
  );
};

export default Tasks;
