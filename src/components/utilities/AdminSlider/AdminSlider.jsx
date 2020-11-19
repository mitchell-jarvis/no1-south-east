import React from 'react';
import styles from './AdminSlider.module.scss';

export default class AdminSlider extends React.Component {
    state = {
      value: 12
    }
    handleOnChange = (e) => {
      this.props.handleSliderInput(e.target.value);
      this.setState({ value: e.target.value })
    }

    render() {
      return (
        <div opacity={this.state.value > 1 ? (this.state.value / 12) : .1} color={this.props.color}>
          <input type="range" min={1} max={12} value={this.state.value} className={styles.slider} onChange={this.handleOnChange} name="maximumTableSize"/>
          <div className="value">{this.state.value}</div>
        </div>
      )
    }
  }