import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import './FooterIcons.scss';

const FooterIcons = () => {
  return (
    <ul className="footer__icons--list">
      <li className="footer__icons--item">
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noreferrer"
          className="footer__icons--link"
        >
          <InstagramIcon />
        </a>{' '}
      </li>
      <li>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noreferrer"
          className="footer__icons--link"
        >
          <FacebookIcon />
        </a>{' '}
      </li>
      <li>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="footer__icons--link"
        >
          <LinkedInIcon />
        </a>{' '}
      </li>
      <li>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noreferrer"
          className="footer__icons--link"
        >
          <TwitterIcon />
        </a>
      </li>{' '}
      <li>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noreferrer"
          className="footer__icons--link"
        >
          <YouTubeIcon />
        </a>
      </li>{' '}
      <li>
        <a
          href="https://t.me/ab3mn"
          target="_blank"
          rel="noreferrer"
          className="footer__icons--link"
        >
          <TelegramIcon />
        </a>
      </li>
    </ul>
  );
};

export default React.memo(FooterIcons);
