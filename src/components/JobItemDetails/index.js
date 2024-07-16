import './index.css'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Jobpost from '../Jobpost'
import Header from '../Header'

class JobItemDetails extends Component {
  state = {jobDetailsData: {}, isLoading: true, similarJobs: []}

  componentDidMount() {
    this.getJobPostItemData()
  }

  componentDidUpdate(prevProps) {
    const {match} = this.props
    const {params} = match
    const {id} = params
    if (prevProps.match.params.id !== id) {
      this.getJobPostItemData()
    }
  }

  getJobPostItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jobDetailsData = await response.json()
      const updatedJobDetailsData = {
        companyLogoUrl: jobDetailsData.job_details.company_logo_url,
        employmentType: jobDetailsData.job_details.employment_type,
        id: jobDetailsData.job_details.id,
        location: jobDetailsData.job_details.location,
        jobDescription: jobDetailsData.job_details.job_description,
        packagePerAnnum: jobDetailsData.job_details.package_per_annum,
        rating: jobDetailsData.job_details.rating,
        title: jobDetailsData.job_details.title,
        lifeAtCompany: jobDetailsData.job_details.life_at_company,
        skills: jobDetailsData.job_details.skills,
        companyWebsiteUrl: jobDetailsData.job_details.company_website_url,
      }

      const jobDetailsDataSimilarJobs = jobDetailsData.similar_jobs.map(
        each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          location: each.location,
          jobDescription: each.job_description,
          packagePerAnnum: each.package_per_annum,
          rating: each.rating,
          title: each.title,
        }),
      )

      this.setState({
        jobDetailsData: updatedJobDetailsData,
        isLoading: false,
        similarJobs: jobDetailsDataSimilarJobs,
      })
    } else {
      // handle errors appropriately
      this.setState({isLoading: false})
    }
  }

  render() {
    const {jobDetailsData, isLoading, similarJobs} = this.state
    const {skills, lifeAtCompany, companyWebsiteUrl} = jobDetailsData

    return (
      <section className="jobpost-bg-con">
        <Header />
        {isLoading ? (
          <div className="loader-container">
            <Loader type="ThreeDots" height={50} width={50} color="#4f46e5" />
          </div>
        ) : (
          <div className="jobpost-bg-container">
            <Jobpost
              eachJobPost={jobDetailsData}
              companyWebsiteUrl={companyWebsiteUrl}
            />
            <div className="rem-container">
              <h1>Skills</h1>
              <ul className="list-skill-container">
                {skills.map(eachSkill => (
                  <li key={eachSkill.name} className="skill-container">
                    <img src={eachSkill.image_url} alt={eachSkill.name} />
                    <p>{eachSkill.name}</p>
                  </li>
                ))}
              </ul>
              <div className="life-at-company">
                <h1>Life at Company</h1>
                <div className="life-at-company-details">
                  <p>{lifeAtCompany.description}</p>
                  <img src={lifeAtCompany.image_url} alt="logo" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="similar-job-container">
          <h1>Similar Jobs</h1>
          <ul className="similar-ul-container">
            {similarJobs.map(eachSimilarJob => (
              <Link to={`/jobs/${eachSimilarJob.id}`} key={eachSimilarJob.id}>
                <Jobpost eachJobPost={eachSimilarJob} />
              </Link>
            ))}
          </ul>
        </div>
      </section>
    )
  }
}

export default JobItemDetails
