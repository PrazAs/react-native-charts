import React from 'react-native'
const { View } = React
import _ from 'underscore'
import Bar from '../Bar'
import Grid from '../Grid'
import styles from './styles'

// Configuration Constants
const DEFAULT_SHOW_GRID = true

export default class BarChart extends React.Component {
  static defaultProps = {
    showGrid: DEFAULT_SHOW_GRID,
  }

  getStyles() {
    const {
      barSize,
      barSpacing,
      horizontal,
    } = this.props

    return styles({
      barSize,
      barSpacing,
      horizontal,
    })
  }

  getDataSetsMaxValue() {
    const {
      dataSets,
    } = this.props

    const dataSetsData = _.flatten(_.pluck(dataSets, 'data'))
    const dataSetsValues = _.pluck(dataSetsData, 'value')
    const dataSetsMaxValue = _.max(dataSetsValues)

    return dataSetsMaxValue
  }

  getGraduation() {
    const dataSetsMaxValue = this.getDataSetsMaxValue()
    const calculatedGraduation = Math.ceil(Math.sqrt(dataSetsMaxValue))

    return this.props.graduation || calculatedGraduation
  }

  getGridMaxValue() {
    const dataSetsMaxValue = this.getDataSetsMaxValue()
    const graduation = this.getGraduation()
    const gridMaxValue = Math.ceil(dataSetsMaxValue / graduation) * graduation

    return gridMaxValue
  }

  renderGrid(children) {
    const {
      dataSets,
      horizontal,
    } = this.props

    const gridMaxValue = this.getGridMaxValue()
    const graduation = this.getGraduation()

    return (
      <Grid
        horizontal={horizontal}
        graduation={graduation}
        maxValue={gridMaxValue}
        content={children}
        style={this.getStyles().grid}/>
    )
  }

  renderBars() {
    const {
      barStyle,
      dataSets,
      horizontal,
    } = this.props

    // TODO: Margin/pad datasets...
    console.log('TODO: Margin/pad datasets...')
    const gridMaxValue = this.getGridMaxValue()
    const dataSetsBars = dataSets.map(dataSet => {
      return dataSet.data.map((data, index) => {
        return (
          <Bar
            key={`${dataSet.fillColor}${index}`}
            fillColor={dataSet.fillColor}
            horizontal={horizontal}
            value={data.value}
            maxValue={gridMaxValue}
            style={[this.getStyles().bar, barStyle]}/>
        )
      })
    })
    const bars = _.flatten(_.zip(...dataSetsBars))

    return (
      <View style={this.getStyles().bars}>
        {bars}
      </View>
    )
  }

  render() {
    const {
      dataSets,
      showGrid,
      style,
    } = this.props

    const bars = this.renderBars()
    const chart = showGrid
                ? this.renderGrid(bars)
                : bars

    return (
      <View style={[this.getStyles().container, style]}>
        {chart}
      </View>
    )
  }
}