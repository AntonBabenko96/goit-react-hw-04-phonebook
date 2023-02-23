import PropTypes from 'prop-types';
import css from './Box.module.css';

export const Box = ({ title, children }) => {
  return (
    <div className={css.contactList}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

Box.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
