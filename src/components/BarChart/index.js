import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { flatten, max, pluck, zip } from 'underscore';
import { dataSetPropType } from '../../constants/propTypes';
import Bar from '../Bar';
import Grid from '../Grid';
import styles from './styles';

export default class BarChart extends Component {
  static propTypes = {
    barSize: PropTypes.number,
    barSpacing: PropTypes.number,
    barStyle: View.propTypes.style,
    dataSets: PropTypes.arrayOf(dataSetPropType).isRequired,
    graduation: PropTypes.number,
    horizontal: PropTypes.bool,
    showGrid: PropTypes.bool.isRequired,
    style: View.propTypes.style,
  };

  static defaultProps = {
    showGrid: true,
  };

  getStyles() {
    const {
      barSize,
      barSpacing,
      horizontal,
    } = this.props;

    return styles({
      barSize,
      barSpacing,
      horizontal,
    });
  }

  getDataSetsMaxValue() {
    const {
      dataSets,
    } = this.props;

    const dataSetsData = flatten(pluck(dataSets, 'data'));
    const dataSetsValues = pluck(dataSetsData, 'value');
    const dataSetsMaxValue = max(dataSetsValues);

    return dataSetsMaxValue;
  }

  getGraduation() {
    const dataSetsMaxValue = this.getDataSetsMaxValue();
    const calculatedGraduation = Math.ceil(Math.sqrt(dataSetsMaxValue));

    return this.props.graduation || calculatedGraduation;
  }

  getGridMaxValue() {
    const dataSetsMaxValue = this.getDataSetsMaxValue();
    const graduation = this.getGraduation();
    const gridMaxValue = Math.ceil(dataSetsMaxValue / graduation) * graduation;

    return gridMaxValue;
  }

  renderGrid(children) {
    const {
      horizontal,
    } = this.props;

    const gridMaxValue = this.getGridMaxValue();
    const graduation = this.getGraduation();

    return (
      <Grid
        horizontal={horizontal}
        graduation={graduation}
        maxValue={gridMaxValue}
        content={children}
        style={this.getStyles().grid}
      />
    );
  }

  renderBars() {
    const {
      barStyle,
      dataSets,
      horizontal,
    } = this.props;

    // TODO: Margin/pad datasets...
    console.log('TODO: Margin/pad datasets...');
    const gridMaxValue = this.getGridMaxValue();
    const dataSetsBars = dataSets.map(dataSet => {
      return dataSet.data.map((data, index) => {
        return (
          <Bar
            key={`${dataSet.fillColor}${index}`}
            fillColor={dataSet.fillColor}
            horizontal={horizontal}
            value={data.value}
            maxValue={gridMaxValue}
            style={[this.getStyles().bar, barStyle]}
          />
        );
      });
    });
    const bars = flatten(zip(...dataSetsBars));

    return (
      <View style={this.getStyles().bars}>
        {bars}
      </View>
    );
  }

  render() {
    const {
      showGrid,
      style,
    } = this.props;

    const bars = this.renderBars();
    const chart = showGrid
                ? this.renderGrid(bars)
                : bars;

    return (
      <View style={[this.getStyles().container, style]}>
        {chart}
      </View>
    );
  }
}
