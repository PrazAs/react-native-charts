import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import GraduationUnit from './GraduationUnit';
import styles from './styles';

export default class Grid extends Component {
  static propTypes = {
    content: PropTypes.any.isRequired,
    contentContainerStyle: View.propTypes.style,
    graduation: PropTypes.number.isRequired,
    horizontal: PropTypes.bool.isRequired,
    labelWrapperFlex: PropTypes.number.isRequired,
    lineColor: PropTypes.string,
    maxValue: PropTypes.number.isRequired,
    style: View.propTypes.style,
    unitFlex: PropTypes.number.isRequired,
  };

  static defaultProps = {
    graduation: 1,
    labelWrapperFlex: 1,
    maxValue: 10,
    unitFlex: 12,
  };

  getStyles() {
    const {
      horizontal,
      labelWrapperFlex,
      unitFlex,
    } = this.props;

    return styles({
      horizontal,
      labelWrapperFlex,
      unitFlex,
    });
  }

  getOrderedGraduationUnitValues() {
    const {
      horizontal,
      graduation,
      maxValue,
    } = this.props;

    const graduationUnitsCount = graduation > 0
                                ? Math.ceil(maxValue / graduation)
                                : 1;

    // Generate an iterable array of length `graduationUnitsCount` and map it
    // to graduation unit values...
    const graduationUnitValues = Array.apply(null, Array(graduationUnitsCount))
      .map((value, index) => {
        return graduation * (index + 1);
      });

    return !horizontal
            ? graduationUnitValues.reverse()
            : graduationUnitValues;
  }

  renderGraduationUnits() {
    const {
      horizontal,
      labelWrapperFlex,
      lineColor,
      unitFlex,
    } = this.props;

    const orderedGraduationUnitValues = this.getOrderedGraduationUnitValues();
    const lastGraduationUnitIndex = orderedGraduationUnitValues.length - 1;

    return (
      <View style={this.getStyles().graduationUnits}>
        {this.getOrderedGraduationUnitValues().map((value, index) => (
          <GraduationUnit
            key={value}
            completeBorder={(horizontal
                            ? index >= lastGraduationUnitIndex
                            : index === 0)}
            horizontal={horizontal}
            labelWrapperFlex={labelWrapperFlex}
            lineColor={lineColor}
            unitFlex={unitFlex}
            value={value}
          />
        ))}
      </View>
    );
  }

  renderContentContainer() {
    const {
      content,
      contentContainerStyle,
      horizontal,
    } = this.props;

    return (
      <View style={this.getStyles().contentContainerWrapper}>
        {horizontal ? null : <View style={this.getStyles().contentContainerLabelWrapperOffset} />}
        <View style={[this.getStyles().contentContainer, contentContainerStyle]}>
          {content}
        </View>
        {horizontal ? <View style={this.getStyles().contentContainerLabelWrapperOffset} /> : null}
      </View>
    );
  }

  render() {
    const { style } = this.props;

    // TODO: Add container for data set data (bar group) labels...
    console.log('TODO: Add container for data set data (bar group) labels...');
    // - Should render with respect to bar locations so to visually align them
    return (
      <View style={[this.getStyles().container, style]}>
        {this.renderGraduationUnits()}
        {this.renderContentContainer()}
      </View>
    );
  }
}
