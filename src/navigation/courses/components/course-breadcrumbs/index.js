import React, { Component } from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { domain_api, language_api, soft_skill_api } from '../../../../common-services/api-endpoints';
import { DOMAINS, LANGUAGES, SOFT_SKILLS } from '../../../../common-services/course_types';
import { apiCall } from '../../../../common-services/api-call';

export default class CourseBreadcrumbs extends Component {
  state = { categoryName: '' };

  technical_breadcrumb = [
    {
      name: 'Technial Skills',
      path: '/technical',
      active: false
    }
  ];

  random_data_breadcrumbs = [
    ...this.technical_breadcrumb,
    {
      name: 'Miscellaneous',
      path: '/technical/misc',
      active: true
    }
  ]

  domain_breadcrumbs = [
    ...this.technical_breadcrumb,
    {
      name: 'Domains',
      path: '/technical/domains',
      active: false
    }
  ]
  language_breadcrumbs = [
    ...this.technical_breadcrumb,
    {
      name: 'Languages',
      path: '/technical/languages',
      active: false
    }
  ]
  soft_skills_breadcrumbs = [
    {
      name: 'Soft Skills',
      path: '/soft-skills'
    }
  ]

  componentDidMount() {
    let { courseType, categoryId } = this.props;
    this.fetchCourseType(courseType, categoryId);
  }
  componentWillReceiveProps(nextProps) {
    let { courseType, categoryId } = nextProps;
    if(courseType !== this.props.courseType || categoryId !== this.props.categoryId) {
      this.fetchCourseType(courseType, categoryId);
    }
  }

  fetchCourseType = (courseType, categoryId) => {
    this.setState({ categoryName: ''});
    // courseType & courseId passed down as props;
    let url = '';
    let name_attribute = '';
    let categoryName = '';

    if(courseType === DOMAINS) {
      url = domain_api;
      categoryName = 'domain_name';
    }
    if(courseType === LANGUAGES) {
      url = language_api;
      categoryName = 'language_name';
    }
    if(courseType === SOFT_SKILLS) {
      url = soft_skill_api;
      categoryName = 'soft_skill_category';
    }
    apiCall(`${url}${categoryId}`, 'get')
    .then(result => {
      if(result.response) {
        result.response.json()
        .then(data => {
          if(data[categoryName]) {
            this.setState({ categoryName: data[categoryName] });
          }
        })
      }
      if(result.error) {
        this.setState({ categoryName: '' });
      }
    })
  }


  renderBreadcrumbs() {
    let { courseType } = this.props;
    let breadcrumbData = [];

    if(courseType === 'domains') {
      breadcrumbData = this.domain_breadcrumbs;
    }
    if(courseType === 'languages') {
      breadcrumbData = this.language_breadcrumbs;
    }
    if(courseType === 'random') {
      breadcrumbData = this.random_data_breadcrumbs;
    }
    if(courseType === 'soft-skills') {
      breadcrumbData = this.soft_skills_breadcrumbs;
    }

    if(breadcrumbData.length) {
      return breadcrumbData.map(breadcrumb => {
        if(breadcrumb.active) {
          return (
            <Breadcrumb.Section active>{breadcrumb.name}</Breadcrumb.Section>
            )
        }
        return [
          <Breadcrumb.Section as={Link} to={breadcrumb.path}>{breadcrumb.name}</Breadcrumb.Section>,
            <Breadcrumb.Divider icon='right angle' />
          ]
        })
    }
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Section as={Link} to='/'>Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right angle' />
          {this.renderBreadcrumbs()}
          <Breadcrumb.Section active>{this.state.categoryName}</Breadcrumb.Section>
        </Breadcrumb>
      </div>
    )
  }
}
