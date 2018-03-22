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
        return (
          <div>
            {key}: <Progress value={ratings[key]} total='5' size='small' progress='ratio' color='green'/>
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
