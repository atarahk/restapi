import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import PostFeed from './PostFeed'
import Spinner from '../common/Spinner'
// import PostItem from './PostItem'
import EditorHtml from './EditorHtml'
import { getPosts } from '../../actions/postActions'

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts()
    // this.props.getPost(this.props.match.params.id)
    // this.setState({ post: this.state.post })
  }

  render() {
    // console.log('POSTs refresh => ', this.props)
    const { posts, loading } = this.props.post
    console.log(this.props)
    let postContent
    // console.group('posts => ', posts)
    if (posts === null || loading) {
      postContent = <Spinner />
    } else {
      postContent = <PostFeed posts={posts} />
      // postContent = posts.map((post) => <PostItem key={post._id} post={post} />)
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <EditorHtml />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

// const mapStateToProps = state => {
//   console.log('MSTP POSTS => ', state)
//   return {
//     post: state.post
//   }
// }

const mapStateToProps = (state, ownProps) => {
  // console.log('MSTP POSTS => ', state)
  // console.log('OWNProps => ', ownProps)
  return {
    post: state.post
  }
}

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts)
