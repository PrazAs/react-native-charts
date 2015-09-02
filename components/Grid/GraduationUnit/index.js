import React from 'react-native'
const { Text, View } = React
import styles from './styles'

export default class GraduationUnit extends React.Component {
  getStyles() {
    return styles(this.props)
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