import { StyleSheet } from 'react-native';
import memoize from 'memoizee';

export default memoize(({ barSpacing, horizontal }) => {
  let barsFlexDirection;
  let barSpacingStyle;
  let barsSpacingStyle;

  if (horizontal) {
    barsFlexDirection = 'column';
    barSpacingStyle = { marginVertical: barSpacing };
    barsSpacingStyle = { paddingVertical: barSpacing };
  } else {
    barsFlexDirection = 'row';
    barSpacingStyle = { marginHorizontal: barSpacing };
    barsSpacingStyle = { paddingHorizontal: barSpacing };
  }

  return StyleSheet.create({
    container: {},

    grid: {},

    bars: {
      flex: 1,
      flexDirection: barsFlexDirection,
      ...barsSpacingStyle,
    },
    bar: {
      ...barSpacingStyle,
    },
  });
});
