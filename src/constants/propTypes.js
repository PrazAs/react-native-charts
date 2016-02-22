import { PropTypes } from 'react-native';

export const dataSetEntryPropType = PropTypes.shape({
  value: PropTypes.number.isRequired,
});

export const dataSetPropType = PropTypes.shape({
  fillColor: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(dataSetEntryPropType).isRequired,
});
