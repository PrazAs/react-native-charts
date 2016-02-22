import { StyleSheet } from 'react-native';
import memoize from 'memoizee';

export default memoize(({ fillColor, horizontal, maxValue, value, valueScale }) => {
  const maximumFlex = maxValue - value;
  const valueFlex = maxValue - maximumFlex;

  let containerFlexDirection;
  let containerScale;
  let scaleDimension;

  if (horizontal) {
    containerFlexDirection = 'row';
    containerScale = -1;
    scaleDimension = 'scaleX';
  } else {
    containerFlexDirection = 'column';
    containerScale = 1;
    scaleDimension = 'scaleY';
  }

  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      flex: 1,
      flexDirection: containerFlexDirection,
      transform: [
        { [scaleDimension]: containerScale },
      ],
    },

    value: {
      backgroundColor: fillColor,
      flex: valueFlex,
      transform: [
        { [scaleDimension]: valueScale },
      ],
    },
    maximum: {
      backgroundColor: 'transparent',
      flex: maximumFlex,
    },
  });
});
