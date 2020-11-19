import React from 'react';
import styles from './Slider.module.scss';

export default class Slider extends React.Component {
    state = {
      value: 1
    }

    handleOnChange = (e) => {
      this.setState({ value: parseInt(e.target.value)});
      this.props.collectFilters(this.props.filterType, "", parseInt(e.target.value));
    }

    render() {
      return (
          <>
        <div className={styles.sliderOuterContainer}>
          <p className={styles.party}>
              Party Size:<span className={styles.displayNumber}> {this.state.value}</span>
          </p>
          <div opacity={this.state.value > 1 ? (this.state.value / 12) : .1} color={this.props.color}>
            <input type="range" min={1} max={12} value={this.state.value} className={styles.slider} onChange={this.handleOnChange} />
          </div>
        </div>
        </>
      )
    }
  }



