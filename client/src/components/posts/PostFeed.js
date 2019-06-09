import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PostItem from './PostItem'
// import Spinner from '../common/Spinner'

class PostFeed extends Component {
  render() {
    const { posts } = this.props
    // console.log(this.props)
    // let postContent
    // if (posts === []) {
    //   return
    // } else {
    //   postContent = posts.map(post => <PostItem key={post._id} post={post} />)
    // }

    // return <div>{postContent}</div>
    return posts.map(post => <PostItem key={post._id} post={post} />)
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostFeed
