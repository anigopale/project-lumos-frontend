import React, { Component } from 'react';
import { Form, Checkbox, Button } from 'semantic-ui-react';

class Filters extends Component {
  state = { skill_level: '', data_type: '', paid: '', project: '' };

  renderFilters() {
    return (
      <div>
        skill:{this.state.skill_level}<br/>
        datatype:{this.state.data_type}<br/>
        paid:{this.state.paid}<br/>
        project:{this.state.project}<br/>
      </div>
    )
  }
  handleFilter = () => {
    let { skill_level, data_type, paid, project } = this.state;
    this.props.getFilters({ skill_level, data_type, paid, project });
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleFilter}>Filter</Button>
        {this.renderFilters()}

      </div>
    )
  }
}

export default Filters;
