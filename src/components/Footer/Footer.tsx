import React from 'react';
import './Footer.scss';
import FooterIcons from './FooterIcons/FooterIcons';
import FooterList from './FooterList/FooterList';
import RoofingIcon from '@mui/icons-material/Roofing';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <article className="footer__article">
        {/* ==================== NAVIGATION ==================== */}
        <FooterList
          title="Navigation"
          links={[
            { link: 'Contacts', key: 0, path: '/contacts' },
            { link: 'Books', key: 1, path: '/books' },
            { link: 'Tasks', key: 2, path: '/tasks' },
            { link: 'DateBook', key: 3, path: '/datebooks' },
          ]}
        />
        {/* ==================== CONTACTS ==================== */}
        <FooterList
          title="Contact Us"
          links={[
            { link: 'Contact', key: 0, path: '/' },
            { link: 'Support', key: 1, path: '/' },
            { link: 'Destinations', key: 2, path: '/' },
            { link: 'Sponsorships', key: 3, path: '/' },
          ]}
        />{' '}
        {/* ==================== About Us ==================== */}
        <FooterList
          title="About Us"
          links={[
            { link: 'How it works', key: 0, path: '/' },
            { link: 'Testimonials', key: 1, path: '/' },
            { link: 'Careers', key: 2, path: '/' },
            { link: 'Investors', key: 3, path: '/' },
            { link: 'Terms of Servi', key: 4, path: '/' },
          ]}
        />{' '}
        {/* ==================== Social Media ==================== */}
        <FooterList
          title="Social Media"
          links={[
            { link: 'Instagram', key: 0, path: 'https://www.instagram.com' },
            { link: 'Facebook', key: 1, path: 'https://www.facebook.com' },
            { link: 'Telegram', key: 2, path: 'https://t.me/ab3mn3' },
            { link: 'LinkedIn', key: 3, path: 'https://www.linkedin.com' },
            { link: 'Twitter', key: 4, path: 'https://www.twitter.com' },
            { link: 'Youtube', key: 5, path: 'https://www.youtube.com' },
          ]}
        />{' '}
      </article>

      <article className="footer__icons">
        <Link to="/" className="footer__icons--link">
          <span className="footer__icons--link-text"> My Website</span>
          <RoofingIcon fontSize="large" />
        </Link>
        <p>
          My Website <span className="footer__icons--date">©2022</span>
        </p>
        <FooterIcons />
      </article>
    </footer>
  );
};

export default React.memo(Footer);
