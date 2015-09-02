import { StyleSheet } from 'react-native'

export default ({ barSize, barSpacing, barStyles, horizontal }) => {
  let barsFlexDirection
  let barSpacingStyle
  let barsSpacingStyle

  if (horizontal) {
    barsFlexDirection = 'column'
    barSpacingStyle = { marginVertical: barSpacing }
    barsSpacingStyle = { paddingVertical: barSpacing }
  } else {
    barsFlexDirection = 'row'
    barSpacingStyle = { marginHorizontal: barSpacing }
    barsSpacingStyle = { paddingHorizontal: barSpacing }
  }

  return StyleSheet.create({
    container: {
      flex: 1,
    },

    grid: {},

    bars: {
      flex: 1,
      flexDirection: barsFlexDirection,
      ...barsSpacingStyle,
    },
    bar: {
      ...barSpacingStyle,
      ...barStyles,
    },
  })
}