import React from 'react-native'
const { Text, View } = React
import styles from './styles'

export default class GraduationUnit extends React.Component {
  getStyles() {
    const {
      completeBorder,
      horizontal,
      labelColor,
      labelWrapperFlex,
      lineColor,
      unitFlex,
    } = this.props

    return styles({
      completeBorder,
      horizontal,
      labelColor,
      labelWrapperFlex,
      lineColor,
      unitFlex,
    })
  }

  renderLabel() {
    const {
      value,
    } = this.props

    return (
      <View style={this.getStyles().labelWrapper}>
        <Text style={this.getStyles().label}>
          {value}
        </Text>
      </View>
    )
  }

  render() {
    const {
      horizontal,
      style,
    } = this.props

    return (
      <View style={[this.getStyles().container, style]}>
        {horizontal ? null : this.renderLabel()}
        <View style={this.getStyles().unit}/>
        {horizontal ? this.renderLabel() : null}
      </View>
    )
  }
}