import React, { Component } from 'react';
import { Segment, Progress, Label } from 'semantic-ui-react';
import styled from 'styled-components';
import { RATINGS_PROGRESS_BAR } from '../../../common-services/color-palette';

const StyledRatings = styled.div`
  .ui.progress .bar {
    background-image: initial;
    background-position-x: initial;
    background-position-y: initial;
    background-size: initial;
    background-repeat-x: initial;
    background-repeat-y: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color: ${RATINGS_PROGRESS_BAR};
  }
`;


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
            {key}: <Progress className='ratings' value={ratings[key]} total='5' size='small' progress='ratio' />
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
      <StyledRatings>
        {this.renderRatings()}
      </StyledRatings>
    )
  }
}
