import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    activeButtonId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getLanguageData()
  }

  responseFailed = () => {
    this.failedImage()
  }

  getLanguageData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {activeButtonId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeButtonId}`
    const response = await fetch(apiUrl)

    if (response.ok) {
      const fetchData = await response.json()
      const popularRepos = fetchData.popular_repos
      const repositoryUpdateList = popularRepos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))
      this.setState({
        repositoryList: repositoryUpdateList,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateButtonId = id => {
    this.setState({activeButtonId: id}, this.getLanguageData)
  }

  failedImage = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="error_name">Something Went Wrong</h1>
    </div>
  )

  renderLanguageFilterItem = () => {
    const {activeButtonId} = this.state
    return (
      <ul className="button-list">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            languageDetails={eachLanguage}
            isActive={activeButtonId === eachLanguage.id}
            updateButtonId={this.updateButtonId}
          />
        ))}
      </ul>
    )
  }

  renderRepositoryList = () => {
    const {repositoryList} = this.state
    return (
      <>
        <ul className="repo-list">
          {repositoryList.map(eachObj => (
            <RepositoryItem key={eachObj.id} RepoDetails={eachObj} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryList()
      case apiStatusConstants.failure:
        return this.failedImage()
      case apiStatusConstants.inProgress:
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-container">
        <h1 className="title">Popular</h1>
        {this.renderLanguageFilterItem()}
        {this.renderStatus()}
      </div>
    )
  }
}
export default GithubPopularRepos
