import {FaStar, FaMapMarkerAlt, FaExternalLinkAlt} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Jobpost = props => {
  const {eachJobPost, companyWebsiteUrl} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    rating,
    title,
    location,
  } = eachJobPost

  return (
    <li className="jobpost-bg-container">
      <div className="jobpost-details-container">
        <div className="jobpost-details-image">
          <img src={companyLogoUrl} alt="logo" />
        </div>
        <div>
          <p className="title">{title}</p>
          <div className="rating-con">
            <FaStar color="#fbbf24" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="loc-type-sala-container">
        <div className="loc-type-con">
          <div className="location-con">
            <FaMapMarkerAlt color="#ffffff" />
            <p>{location}</p>
          </div>
          <div className="employment-type">
            <BsBriefcaseFill color="#ffffff" />
            <p>{employmentType}</p>
          </div>
        </div>
        <div className="package">
          <p>{packagePerAnnum && packagePerAnnum}</p>
        </div>
      </div>
      <hr />
      <div>
        <div className="link-container">
          <p className="desc">Description</p>
          {companyWebsiteUrl && (
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit <FaExternalLinkAlt />
            </a>
          )}
        </div>

        <p>{jobDescription}</p>
      </div>
    </li>
  )
}

export default Jobpost
