import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';

// DomainLanguageLabels component fetches domains/languages from id list passed down as props
// and renders Labels for Courses component
export default class DomainLanguageLabels extends Component {

  state = { domains: [], languages: [] };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    // updating state on fetching data
    this.props.domains.map(id => {
      fetch(`https://private-eb08cd-plbackendmockup.apiary-mock.com/api/v1/domains/tech/${id}`)
      .then(response => {
        response.json()
        .then(data => {
          let domain = data[0];
          this.setState({ domains: [...this.state.domains, domain] })
        })
      })
    })
    this.props.languages.map(id => {
      fetch(`https://private-eb08cd-plbackendmockup.apiary-mock.com/api/v1/languages/${id}`)
      .then(response => {
        response.json()
        .then(data => {
          let language = data[0];
          this.setState({ languages: [...this.state.languages, language] })
        })
      })
    })
  }

  renderDomainLabels() {
    if(this.props.domains.length) {
      if(this.state.domains.length === this.props.domains.length
        && this.state.languages.length === this.props.languages.length)
        return this.state.domains.map(domain => {
          return <Label color='blue'>{domain.domain_name}</Label>
        })
    }
  }
  renderLanguageLabels() {
    if(this.props.domains.length) {
      if(this.state.domains.length === this.props.domains.length
        && this.state.languages.length === this.props.languages.length)
        return this.state.languages.map(language => {
          return <Label color='purple'>{language.language_name}</Label>
        })
        return <div>Loading...</div>
    }
  }

  render() {
    return (
      <div>
        {this.renderDomainLabels()}
        {this.renderLanguageLabels()}
      </div>
    )
  }
}
