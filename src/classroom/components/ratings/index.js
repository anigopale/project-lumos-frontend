import React, { Component } from 'react';
import { Segment, Progress, Label } from 'semantic-ui-react';

export default class Ratings extends Component {
  renderRatings() {
    let flag = true;
    let { ratings } = this.props;
      Object.keys(ratings).map((key => {
        if(ratings[key] === 0)
          flag = false;
      }));
      if(flag) {
        return Object.keys(ratings).map((key => {
          let percent = ratings[key]*20;
          return (
            <div>
              {key}: {ratings[key]} <Progress percent={percent} size='small' />
            </div>
          )
        }))
    }
    return (
      <div>Be the first one to rate this!</div>
    )
  }

  render() {
    return (
      <div>
        {this.renderRatings()}
      </div>
    )
  }
}
