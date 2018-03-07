import React, { Component } from 'react';
import { Form, Checkbox, Grid, Segment, Divider } from 'semantic-ui-react';

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
      <Segment>
        <h3>Filters</h3>
        <Grid columns={4} divided>
          <Grid.Column>
            Skill level:
            <Divider />
            <Form>
              {this.renderSkillLevelFilters()}
            </Form>
          </Grid.Column>
          <Grid.Column>
            Paid:
            <Divider />

            <Form>
              {this.renderPaidFilters()}
            </Form>
          </Grid.Column>
          <Grid.Column>
            Type:
            <Divider />
            <Form>
              {this.renderDataTypeFilters()}
            </Form>
          </Grid.Column>
          <Grid.Column>
            Projects:
            <Divider />
            <Form>
              {this.renderProjectFilters()}
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

export default Filters;
