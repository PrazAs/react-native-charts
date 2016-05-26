import React, { Component, PropTypes } from 'react';
import { Animated, View } from 'react-native';
import styles from './styles';

export default class Bar extends Component {
  static propTypes = {
    destinationValueScale: PropTypes.number.isRequired,
    fillColor: PropTypes.string.isRequired,
    horizontal: PropTypes.bool,
    initialValueScale: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    style: View.propTypes.style,
    value: PropTypes.number.isRequired,
    valueScaleSpringFriction: PropTypes.number.isRequired,
  };

  static defaultProps = {
    destinationValueScale: 1,
    fillColor: '#00b5ec',
    initialValueScale: 0,
    valueScaleSpringFriction: 5,
  };

  constructor(props) {
    super(props);

    this.state = {
      valueScale: new Animated.Value(props.initialValueScale),
    };
  }

  componentDidMount() {
    this.animateValueScale();
  }

  componentWillUpdate(nextProps) {
    const maxValueWillChange = nextProps.maxValue !== this.props.maxValue;
    const valueWillChange = nextProps.value !== this.props.value;
    const shouldAnimate = maxValueWillChange || valueWillChange;

    // Only animate value scale if relative value changes
    if (shouldAnimate) {
      this.animateValueScale();
    }
  }

  getStyles() {
    const {
      fillColor,
      horizontal,
      maxValue,
      value,
    } = this.props;

    return styles({
      fillColor,
      horizontal,
      maxValue,
      value,
      valueScale: this.state.valueScale,
    });
  }

  animateValueScale() {
    const {
      destinationValueScale,
      initialValueScale,
      valueScaleSpringFriction,
    } = this.props;

    // Reset value scale
    this.state.valueScale.setValue(initialValueScale);

    // Apply spring animation to value scale to its destination value
    Animated.spring(this.state.valueScale, {
      friction: valueScaleSpringFriction,
      toValue: destinationValueScale,
    }).start();
  }

  render() {
    const {
      style,
    } = this.props;

    return (
      <View style={[this.getStyles().container, style]}>
        <Animated.View style={this.getStyles().maximum} />
        <Animated.View style={this.getStyles().value} />
      </View>
    );
  }
}
