import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import TasksList from './TasksList/TasksList';
import { ITaskForm, ITask } from './TaskType';
import axios from 'axios';
import { getFormatDate } from '../../helpers/getCurrentDay';

import { TextField, TextareaAutosize, IconButton, Box } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './Task.scss';
import MyButton from '../shared/Buttons/MyButton/MyButton';
import Modal from '../shared/Modal/Modal';
import AddButton from '../shared/Buttons/AddButton/AddButton';

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

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>): void =>
    setTask({ ...task, [e.target.name]: e.target.value });

  /* ==================== START FINISH DATE ==================== */
  const [startDate, setStartDate] = React.useState(new Date());
  const [isOpenStartDate, setIsOpenStartDate] = React.useState(false);

  const [finishDate, setFinishDate] = React.useState(new Date());
  const [isOpenFinishDate, setIsOpenFinishDate] = React.useState(false);

  /* ==================== MADOL FINISH DATE ==================== */
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = () => setModalOpen(true);
  const _openModal = React.useCallback(openModal, []);

  const handleCloseModal = () => setModalOpen(false);

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
    handleCloseModal();
  };

  /* ==================== Delete ==================== */
  const handleDelete = async (_id: string) => {
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
  // const handleChangeFinishDate = (date: string) => {
  //   console.log('aaaaaa');
  //   console.log(date);
  // };
  // const _handleChangeFinishDate = React.useCallback(
  //   () => handleChangeFinishDate,
  //   [],
  // );

  return (
    <section>
      <AddButton
        openModal={_openModal}
        style={{
          top: -65,
          m: '0 auto',
        }}
      />
      {isModalOpen && (
        <Modal onClose={handleCloseModal} style={{ height: '325px' }}>
          {/* ==================== FORM ==================== */}
          <form
            onSubmit={handleSubmit}
            onChange={handleChange}
            className="task--form"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 400,
                m: '30px auto',
              }}
            >
              <TextField
                id="input-task-title"
                label="Task Title"
                value={task.title}
                name="title"
                variant="standard"
                sx={{
                  input: {
                    color: 'white',
                    width: '400px',
                  },
                  label: {
                    color: 'white',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'rgb(3, 233, 244)',
                  },
                  '& label.Mui-focused': {
                    color: 'rgb(3, 233, 244)',
                  },
                }}
              />{' '}
            </Box>{' '}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 400,
                m: '0 auto',
                mb: 2.5,
              }}
            >
              <TextareaAutosize
                id="input-task-text"
                value={task.text}
                name="text"
                minRows={4}
                maxRows={7}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                m: 1,
              }}
            >
              <IconButton
                onClick={() => setIsOpenStartDate(!isOpenStartDate)}
                data-set="start"
              >
                Start:
                <CalendarMonthIcon />
              </IconButton>{' '}
              <IconButton
                onClick={() => setIsOpenFinishDate(!isOpenFinishDate)}
                data-set="finish"
              >
                Finish:
                <CalendarMonthIcon />
              </IconButton>
            </Box>{' '}
            {/* ==================== DATA PICKER ==================== */}
            {isOpenStartDate && (
              <Box
                sx={{
                  position: 'absolute',
                  left: -240,
                }}
              >
                <DatePicker
                  onChange={e => {
                    e && setStartDate(e);
                    setIsOpenStartDate(!isOpenStartDate);
                  }}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  inline
                  className="task__data--picker"
                />
              </Box>
            )}
            {isOpenFinishDate && (
              <Box
                sx={{
                  position: 'absolute',
                  left: 500,
                  borderRaduis: '10px',
                }}
              >
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
                  className="task__data--picker"
                />
              </Box>
            )}
            <MyButton
              type="submit"
              text="Add Task"
              width="400px"
              height="50px"
            />
          </form>{' '}
        </Modal>
      )}

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
