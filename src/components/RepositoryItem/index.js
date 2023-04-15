// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {RepoDetails} = props
  const {avatarUrl, name, starsCount, forksCount, issuesCount} = RepoDetails
  return (
    <li className="list-container ">
      <div className="each-list">
        <img src={avatarUrl} alt={name} className="avatar-image" />
        <h1 className="name-heading">{name}</h1>
        <div className="count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon-image"
          />
          <p className="count">{starsCount} stars</p>
        </div>
        <div className="count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon-image"
          />
          <p className="count">{forksCount} forks</p>
        </div>
        <div className="count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="issue-image"
          />
          <p className="count">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
