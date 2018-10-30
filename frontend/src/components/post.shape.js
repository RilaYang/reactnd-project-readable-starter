import PropTypes from 'prop-types'

export const postShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  boby: PropTypes.string,
  voteScopre: PropTypes.number,
  category: PropTypes.string,
  deleted: PropTypes.bool,
  commentCount: PropTypes.number
}

export default postShape