import React from 'react';
import { useTypedSelector } from '../hooks/useTypedSelectors';
import { useDispatchAcions } from '../hooks/useDispatchActions';
import { Nav } from './Nav/Nav';
import { IUser } from '../types/userTypes/userTypes';
import MyButton from './shared/Buttons/MyButton/MyButton';
import './AppBar.scss';
import { useNavigate } from 'react-router-dom';

interface IAppBarProps {
  user: IUser;
  isAuthenticated: boolean;
}

const AppBar = () => {
  const { isAuthenticated, user } = useTypedSelector<IAppBarProps>(s => s.user);
  const { logOut, changeUserAvatar } = useDispatchAcions();
  let navigate = useNavigate();

  const avatar = user?.smallAvatarURL.startsWith('https')
    ? user?.smallAvatarURL
    : 'https://guarded-coast-33180.herokuapp.com' + user?.smallAvatarURL;

  const _logOut = () => {
    logOut();

    setTimeout(() => navigate('/login'));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files;
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file[0]);
      changeUserAvatar(formData);
    }
  };

  const _handleChange = React.useCallback(handleChange, [changeUserAvatar]);

  return (
    <header className="header">
      <Nav online={isAuthenticated} logOut={logOut} />{' '}
      {isAuthenticated && (
        <div className="nav__user--box">
          <label htmlFor="user__image--upload">
            <img src={avatar} className="nav__user--avatar" alt="avatar" />
            <input
              id="user__image--upload"
              type="file"
              style={{ display: 'none' }}
              onChange={_handleChange}
              accept=".jpg, .jpeg, .png"
            />
          </label>

          <MyButton type="button" cb={_logOut} text="LogOut" />
        </div>
      )}
    </header>
  );
};

export default AppBar;
