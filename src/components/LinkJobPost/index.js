import {Link} from 'react-router-dom'
import Jobpost from '../Jobpost'

const LinkJobpost = props => {
  const {eachJobPost} = props
  const {id} = eachJobPost

  return (
    <Link to={`/jobs/${id}`}>
      <Jobpost eachJobPost={eachJobPost} />
    </Link>
  )
}

export default LinkJobpost
