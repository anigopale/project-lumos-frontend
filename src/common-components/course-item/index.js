import React, { Component } from 'react';
import { Item, Header, Label, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CourseLabels from './components/course-labels';
import { BG, IT, AD } from '../../common-services/skill-levels';

export default class CourseItem extends Component {

  state = { description: false }

  renderSkillLevel(skill_level) {
    if(skill_level === BG) {
      return (
        <Label color='green' ribbon>
          Beginner
        </Label>
      );
    }
    if(skill_level === IT) {
      return (
        <Label color='orange' ribbon>
          Intermediate
        </Label>
      )
    }
    if(skill_level === AD) {
      return (
        <Label color='red' ribbon>
          Advanced
        </Label>
      )
    }
  }


  openLink(url, type) {
    // opens external link url in new tab
    if(type !== 'VI')
      window.open(url);
  }

  renderPaidLabel() {
    let { paid } = this.props.course;
    let text = 'free';
    if(paid) {
      text = '$$$';
    }

    return (
      <Label tag>{text}</Label>
    )

  }

  renderIcon() {
    let { data_type } = this.props.course;
    let iconName = 'external';
    if(data_type === 'VI')
      iconName = 'youtube play';
    if(data_type === 'CO')
      iconName = 'code';
    if(data_type === 'BL')
      iconName = 'book';

    return (
      <div style={{ float: 'right' }}>
        <Icon name={iconName} />
      </div>
    )
  }

///////////////
// renders description and [show more] trigger
  renderShowMoreTrigger() {
    let { description } = this.props.course;
    let showText = this.state.description ? '[hide]' : '[show]'
    if(description.length > 100) {
      return (
        <a onClick={() => this.setState({ description: !this.state.description })} style={{ cursor: 'pointer '}}> {showText}</a>
      )
    }
  }

  renderDescription() {
    let { description } = this.props.course;
    let strLength = this.state.description ? description.length : 100;
    let str = description.substring(0, strLength)

    return (
      <div>
        {str}
        {this.renderShowMoreTrigger()}
      </div>
    )
/////////////

  }
  render() {
    return (
      <Segment clearing>
        <div>
          {this.renderIcon()}
          <span>{this.renderSkillLevel(this.props.course.skill_level)}</span>
        </div>
        <br />
        <Header
          onClick={() => {this.openLink(this.props.course.link_url, this.props.course.data_type)}}
          as={Link}
          to={{
            pathname: `/classroom/${this.props.courseType}/${this.props.course.id}`,
            state: { fromCourses: this.props.fromCourses }
          }}
          >
          {this.props.course.title}
        </Header>
        <p>
          {this.renderDescription()}
        </p>
        {this.renderPaidLabel()}
        <div style={{ float: 'right'}}>
          <CourseLabels languages={this.props.course.languages} domains={this.props.course.domains} softskills={this.props.course.soft_skill} />
        </div>
      </Segment>
    )
  }
}
