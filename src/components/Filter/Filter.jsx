import PropTypes from 'prop-types';

export const Filter = ({ filter, onChange }) => {
  return (
    <input
      name="filter"
      onChange={onChange}
      placeholder="enter name or number"
      value={filter}
    />
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
