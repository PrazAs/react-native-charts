import { StyleSheet } from 'react-native';
import memoize from 'memoizee';

// (Configuration constants)
const DEFAULT_LABEL_COLOR = '#ccc';
const DEFAULT_LABEL_WRAPPER_FLEX = 1;
const DEFAULT_LINE_COLOR = '#dad9d4';
const DEFAULT_UNIT_FLEX = 12;
const LABEL_FONT_SIZE = 12;

export default memoize(({ completeBorder, horizontal, labelColor, labelWrapperFlex, lineColor, unitFlex }) => {
  const unitBorderStyles = {
    borderColor: lineColor || DEFAULT_LINE_COLOR,
    borderWidth: 1,
  };
  let containerFlexDirection;
  let labelTransformation;
  let labelMarginSide;

  if (horizontal) {
    containerFlexDirection = 'column';
    labelTransformation = { translateX: 4 };
    labelMarginSide = 'Top';
    unitBorderStyles.borderRightWidth = !completeBorder
                                      ? 0
                                      : unitBorderStyles.borderWidth;
  } else {
    containerFlexDirection = 'row';
    labelTransformation = { translateY: -(1 + LABEL_FONT_SIZE / 2) };
    labelMarginSide = 'Right';
    unitBorderStyles.borderTopWidth = !completeBorder
                                    ? 0
                                    : unitBorderStyles.borderWidth;
  }

  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      flex: 1,
      flexDirection: containerFlexDirection,
    },

    labelWrapper: {
      flex: labelWrapperFlex || DEFAULT_LABEL_WRAPPER_FLEX,
    },
    label: {
      color: labelColor || DEFAULT_LABEL_COLOR,
      fontFamily: 'Avenir',
      fontSize: 12,
      [`margin${labelMarginSide}`]: (LABEL_FONT_SIZE / 2),
      textAlign: 'right',
      transform: [
        labelTransformation,
      ],
    },

    unit: {
      ...unitBorderStyles,
      flex: unitFlex || DEFAULT_UNIT_FLEX,
    },
  });
});
