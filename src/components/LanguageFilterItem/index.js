// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, updateButtonId, isActive} = props
  const {language, id} = languageDetails

  const className = isActive
    ? 'language-button active-button'
    : 'language-button'

  const onChangeButton = () => {
    updateButtonId(id)
  }

  return (
    <li>
      <button type="button" className={className} onClick={onChangeButton}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
