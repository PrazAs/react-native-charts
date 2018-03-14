import { PropTypes } from 'prop-types';

export const dataSetEntryPropType = PropTypes.shape({
  value: PropTypes.number.isRequired,
});

export const dataSetPropType = PropTypes.shape({
  fillColor: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(dataSetEntryPropType).isRequired,
});
