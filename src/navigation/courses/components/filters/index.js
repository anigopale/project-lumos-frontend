import React, { Component } from 'react';
import { Form, Checkbox, Grid, Segment, Divider, Menu } from 'semantic-ui-react';
import styled from 'styled-components';


class Filters extends Component {
  state = { skill_level: '', data_type: '', paid: '', project: '' };

  project_filters = [
    {
      label: 'all',
      value: ''
    },
    {
      label: 'projects only',
      value: 'true'
    }
  ]

  skill_levels = [
    {
      label: 'all',
      value: ''
    },
    {
      label: 'Beginner',
      value: 'BG'
    },
    {
      label: 'Intermediate',
      value: 'IT'
    },
    {
      label: 'Advanced',
      value: 'AD'
    }
  ]

  paid_filters = [
    {
      label: 'all',
      value: ''
    },
    {
      label: 'paid',
      value: 'true'
    },
    {
      label: 'unpaid',
      value: 'false'
    }
  ]

  data_types = [
    {
      label: 'all',
      value: ''
    },
    {
      label: 'Videos',
      value: 'VI'
    },
    {
      label: 'Blogs',
      value: 'BL'
    },
    {
      label: 'Tutorials',
      value: 'TU'
    },
    {
      label: 'Courses',
      value: 'CO'
    },
    {
      label: 'Others',
      value: 'OT'
    }

  ]


  componentWillReceiveProps(nextProps) {
    // reset state on url change
    if(nextProps.urlParams !== this.props.urlParams) {
      this.setState({ skill_level: '', data_type: '', paid: '', project: '' })
    }
  }

  handleFilter = (filters) => {
    // passes filters as props
    this.props.getFilters(filters);
  }


  // for changing app state and passing filters as props
  changeProjectFilter = (e, { value }) => {
    this.setState({ project: value });
    let { skill_level, data_type, paid } = this.state;
    this.handleFilter({ skill_level, data_type, paid, project: value });
  }

  changeDataType = (e, { value }) => {
    this.setState({ data_type: value });
    let { skill_level, paid, project } = this.state;
    this.handleFilter({ skill_level, data_type: value, paid, project });
  }

  changePaidFilter = (e, { value }) => {
    this.setState({ paid: value });
    let { skill_level, data_type, project } = this.state;
    this.handleFilter({ skill_level, data_type, paid: value, project });  }

  changeSkillLevel = (e, { value }) => {
    this.setState({ skill_level: value });
    let { data_type, paid, project } = this.state;
    this.handleFilter({ skill_level: value, data_type, paid, project });
  }


  // for rendering filters
  renderProjectFilters() {
    return this.project_filters.map(filter => {
      return (
        <Form.Field>
          <Checkbox
            radio
            label={filter.label}
            value={filter.value}
            checked={this.state.project === filter.value}
            onChange={this.changeProjectFilter}
            />
        </Form.Field>
      )
    })
  }

  renderDataTypeFilters() {
    return this.data_types.map(filter => {
      return (
        <Form.Field>
          <Checkbox
            radio
            label={filter.label}
            value={filter.value}
            checked={this.state.data_type === filter.value}
            onChange={this.changeDataType}
            />
        </Form.Field>
      )
    })
  }

  renderPaidFilters() {
    return this.paid_filters.map(filter => {
      return (
        <Form.Field>
          <Checkbox
            radio
            label={filter.label}
            value={filter.value}
            checked={this.state.paid === filter.value}
            onChange={this.changePaidFilter}
            />
        </Form.Field>
      )
    })
  }

  renderSkillLevelFilters() {
    return this.skill_levels.map(filter => {
      return (
        <Form.Field>
          <Checkbox
            radio
            label={filter.label}
            value={filter.value}
            checked={this.state.skill_level === filter.value}
            onChange={this.changeSkillLevel}
          />
      </Form.Field>
      )
    })
  }

  render() {
    return (
          <Menu vertical fluid>
            <Menu.Item>
              <Menu.Header>
                Skill level:
              </Menu.Header>
              <Menu.Item>
                <Form>
                  {this.renderSkillLevelFilters()}
                </Form>
              </Menu.Item>
            </Menu.Item>
            <Menu.Item>
              <Menu.Header>
                Paid:
              </Menu.Header>
              <Menu.Item>
                <Form>
                  {this.renderPaidFilters()}
                </Form>
              </Menu.Item>
            </Menu.Item>

            <Menu.Item>
              <Menu.Header>
                Type:
              </Menu.Header>
              <Menu.Item>
                <Form>
                  {this.renderDataTypeFilters()}
                </Form>
              </Menu.Item>
            </Menu.Item>

            <Menu.Item>
              <Menu.Header>
                Project
              </Menu.Header>
              <Menu.Item>
                <Form>
                  {this.renderProjectFilters()}
                </Form>
              </Menu.Item>
            </Menu.Item>

          </Menu>



    )
  }
}

export default Filters;
