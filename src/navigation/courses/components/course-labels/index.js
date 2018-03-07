import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { domain_api, language_api, soft_skill_api } from '../../../../common-services/api-endpoints';

// DomainLanguageLabels component fetches domains/languages from id list passed down as props
// and renders Labels for Courses component
export default class CourseLabels extends Component {

  state = { domains: [], languages: [], softskills: [] };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    // updating state on fetching data
    if(this.props.domains) {
      this.props.domains.map(id => {
        fetch(`${domain_api}${id}`)
        .then(response => {
          response.json()
          .then(data => {
            let domain = data;
            this.setState({ domains: [...this.state.domains, domain] })
          })
        })
      })
    }

    if(this.props.languages) {
      this.props.languages.map(id => {
        fetch(`${language_api}${id}`)
        .then(response => {
          response.json()
          .then(data => {
            let language = data;
            this.setState({ languages: [...this.state.languages, language] })
          })
        })
      })
    }

    if(this.props.softskills) {
      this.props.softskills.map(id => {
        fetch(`${soft_skill_api}${id}`)
        .then(response => {
          response.json()
          .then(data => {
            let softskill = data;
            this.setState({ softskills: [...this.state.softskills, softskill] })
          })
        })
      })
    }

  }

  renderDomainLabels() {
    if(this.props.domains) {
      if(this.props.domains.length) {
        if(this.state.domains.length === this.props.domains.length
          && this.state.languages.length === this.props.languages.length)
          return this.state.domains.map(domain => {
            return (
              <Label
                color='blue'
                as={Link}
                to={`/courses/knowledge-base/1/domain/${domain.id}/`}
                >
                {domain.domain_name}
              </Label>
            )
          })
        }
      }
  }
  renderLanguageLabels() {
    if(this.props.languages) {
      if(this.props.languages.length) {

        if(this.state.domains.length === this.props.domains.length
          && this.state.languages.length === this.props.languages.length)
          return this.state.languages.map(language => {
            return (
              <Label
                color='purple'
                as={Link}
                to={`/courses/knowledge-base/1/language/${language.id}/`}
                >
                {language.language_name}
              </Label>
            )
          })
          return <div>Loading...</div>
        }
      }
  }

  renderSoftSkillLabels() {
    if(this.props.softskills) {
      if(this.props.softskills.length) {

        if(this.state.softskills.length === this.props.softskills.length)
        return this.state.softskills.map(softskill => {
          return (
            <Label
              color='red'
              as={Link}
              to={`/courses/soft-skills/1/soft-skill/${softskill.id}`}
              >
              {softskill.soft_skill_category}
            </Label>
          )
        })
        return <div>Loading...</div>
      }
      }
  }

  render() {
    return (
      <div>
        {this.renderDomainLabels()}
        {this.renderLanguageLabels()}
        {this.renderSoftSkillLabels()}
      </div>
    )
  }
}
