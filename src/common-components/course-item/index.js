import React, { Component } from 'react';
import { Item, Header, Label, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CourseLabels from './components/course-labels';
import { BG, IT, AD } from '../../common-services/skill-levels';

export default class CourseItem extends Component {

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

  render() {
    return (
      <Segment clearing raised>
        <div>
          <span>{this.renderSkillLevel(this.props.course.skill_level)}</span>
        </div>
        <Header
          onClick={() => {this.openLink(this.props.course.link_url, this.props.course.data_type)}}
          as={Link}
          to={{
            pathname: `/classroom/${this.props.courseType}/${this.props.course.id}`,
            state: { fromCourses: true }
          }}
          >
          {this.props.course.title}
        </Header>

        <Segment basic floated='right'>
          <CourseLabels languages={this.props.course.languages} domains={this.props.course.domains} softskills={this.props.course.soft_skill} />
        </Segment>
      </Segment>
    )
  }
}
