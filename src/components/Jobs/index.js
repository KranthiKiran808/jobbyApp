import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import LinkJobpost from '../LinkJobPost'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    isLoading: false,
    profileDetails: {},
    jobsData: [],
    userSearchInput: '',
    isUserProfileLoading: false,
  }

  componentDidMount() {
    this.getUserDetails()
    this.getListofJobs()
  }

  getUserDetails = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const url = 'https://apis.ccbp.in/profile'
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedProfileDetails = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    this.setState({
      profileDetails: updatedProfileDetails,
      isUserProfileLoading: true,
    })
  }

  getListofJobs = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const url = 'https://apis.ccbp.in/jobs'
    const response = await fetch(url, options)
    const jobsData = await response.json()
    const updatedJobsData = jobsData.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      location: each.location,
      jobDescription: each.job_description,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))

    this.setState({jobsData: updatedJobsData, isLoading: true})
  }

  onChangeSearchButton = event => {
    this.setState({userSearchInput: event.target.value})
  }

  render() {
    const {
      isLoading,
      profileDetails,
      jobsData,
      userSearchInput,
      isUserProfileLoading,
    } = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    const filteredJobsData = jobsData.filter(each =>
      each.title.toLowerCase().includes(userSearchInput.toLowerCase()),
    )
    return (
      <section>
        <Header />
        <div className="jobs-bg-container">
          <div className="user-details">
            {isUserProfileLoading ? (
              <div className="user-profile">
                <img src={profileImageUrl} alt="logo" />
                <h1>{name}</h1>
                <p>{shortBio}</p>
              </div>
            ) : (
              <div className="loader-spinner">
                <Loader
                  type="ThreeDots"
                  height={50}
                  width={50}
                  color="#4f46e5"
                />
              </div>
            )}

            <hr />
            <ul className="types-of-employment">
              <p className="para1">Types of Employment</p>
              {employmentTypesList.map(eachType => (
                <li
                  className="type-of-employment"
                  key={eachType.employmentTypeId}
                >
                  <input type="checkbox" />
                  <label>{eachType.label}</label>
                </li>
              ))}
            </ul>
            <hr />
            <ul className="types-of-salary-range">
              <p className="para2">Salary Range</p>
              {salaryRangesList.map(eachSalaryRange => (
                <li
                  className="type-of-salary-range"
                  key={eachSalaryRange.salaryRangeId}
                >
                  <input type="radio" name="salary-range" />
                  <label>{eachSalaryRange.label}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobs-items-container">
            <div className="input-container-for-jobs">
              <input
                value={userSearchInput}
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearchButton}
              />
              <div className="search-container">
                <FaSearch className="search-icon" />
              </div>
            </div>
            <ul className="list-of-jobs">
              {isLoading ? (
                <ul className="job-post-ul-list">
                  {filteredJobsData.map(eachJobPost => (
                    <LinkJobpost
                      eachJobPost={eachJobPost}
                      key={eachJobPost.id}
                    />
                  ))}
                </ul>
              ) : (
                <Loader
                  type="ThreeDots"
                  height={50}
                  width={50}
                  color="#4f46e5"
                />
              )}
            </ul>
          </div>
        </div>
      </section>
    )
  }
}
export default Jobs
