import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from '../../validation/is-empty'
import Posts from '../posts/Posts'

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props

    // Get first name
    const firstName = profile.user.name.trim().split(' ')[0]

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName} is Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{firstName} does not have a bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
          </div>
        </div>
        <Posts />
      </div>
    )
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout
