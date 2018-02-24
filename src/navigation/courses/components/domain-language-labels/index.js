import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';

export default class DomainLanguageLabels extends Component {

  state = { domains: [], languages: [] };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
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
    if(this.state.domains.length)
      return this.state.domains.map(domain => {
        return <Label color='blue'>{domain.domain_name}</Label>
      })
  }
  renderLanguageLabels() {
    if(this.state.languages.length)
      return this.state.languages.map(language => {
        return <Label color='red'>{language.language_name}</Label>
      })
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
