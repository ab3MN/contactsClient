import React, { FC } from 'react';
import './FooterList.scss';
import { Link } from 'react-router-dom';

type link = {
  key: number;
  link: string;
  path: string;
};

interface IFooterListProprs {
  title: string;
  links: link[];
}

const FooterList: FC<IFooterListProprs> = ({ title, links }) => {
  return (
    <ul aria-label={title} className="footer__list">
      {links.map(el => (
        <li key={el.key}>
          {el.path.startsWith('https://') ? (
            <a
              href={el.path}
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              {el.link}
            </a>
          ) : (
            <Link className="footer__link" to={el.path}>
              {el.link}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default React.memo(FooterList);
