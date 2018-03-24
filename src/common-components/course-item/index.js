import React, { Component } from 'react';
import { Item, Header, Label, Segment, Icon, Popup, Transition } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CourseLabels from './components/course-labels';
import { BG, IT, AD } from '../../common-services/skill-levels';
import styled from 'styled-components';

const StyledCourseItem = styled.div`
  .course-item {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  }

  .description {
    text-align: justify;
    line-height: 1.5;
    display: block;
  }

  .course-skill-level {
    margin-bottom: 5px;
  }

  .skill-level-ribbon {
    background-color: ${props => {
        if(props.skillLevel === BG)
          return '#05c46b'
        if(props.skillLevel === IT)
          return '#ffc048'
        if(props.skillLevel === AD)
          return '#d63031'
      }
    };
    color: white;
  }

  padding-bottom: 10px;
`;

export default class CourseItem extends Component {

  state = { description: false, visible: false };

  course_data_types = [
    {
      name: 'VI',
      display: 'video',
      icon: 'youtube play'
    },
    {
      name: 'CO',
      display: 'course',
      icon: 'code'
    },
    {
      name: 'BL',
      display: 'blog',
      icon: 'book'
    },
    {
      name: 'TU',
      display: 'tutorial',
      icon: 'lightbulb'
    },
    {
      name: 'OT',
      display: 'other',
      icon: 'external'
    }
  ]

  componentWillMount() {
    setInterval(this.showComponent, 0);
  }
  showComponent = () => {
    this.setState({ visible: true });
  }

  renderSkillLevel(skill_level) {
    if(skill_level === BG) {
      return (
        <Label className='skill-level-ribbon' ribbon>
          Beginner
        </Label>
      );
    }
    if(skill_level === IT) {
      return (
        <Label className='skill-level-ribbon' ribbon>
          Intermediate
        </Label>
      )
    }
    if(skill_level === AD) {
      return (
        <Label className='skill-level-ribbon' ribbon>
          Advanced
        </Label>
      )
    }
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
    let iconName = '';
    let popupContent = '';
    this.course_data_types.map(type => {
      if(type.name === data_type) {
        iconName = type.icon;
        popupContent = type.display
      }
    })

    return (
      <div style={{ float: 'right' }}>
        <Popup
          trigger={<Icon name={iconName} />}
          content={popupContent}
          position='left'
          basic
        />
      </div>
    )
  }

///////////////
// renders description and [show more] trigger
  renderShowMoreTrigger() {
    let { description } = this.props.course;
    let showText = this.state.description ? '[less]' : '[more]'
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
      <Transition visible={this.state.visible} animation='fade up' duration={500}>

      <StyledCourseItem skillLevel={this.props.course.skill_level}>
        <Segment clearing className='course-item'>
          <div className='course-skill-level'>
            {this.renderIcon()}
            <span>{this.renderSkillLevel(this.props.course.skill_level)}</span>
          </div>
          <Header
            as={Link}
            to={{
              pathname: `/classroom/${this.props.courseType}/${this.props.course.id}`,
              state: { fromCourses: this.props.fromCourses }
            }}
            >
            {this.props.course.title}
          </Header>
          <p className='description'>
            {this.renderDescription()}
          </p>
          <CourseLabels languages={this.props.course.languages} domains={this.props.course.domains} softskills={this.props.course.soft_skill} />
        </Segment>
      </StyledCourseItem>
    </Transition>
    )
  }
}
