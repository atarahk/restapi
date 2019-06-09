import React, { Component } from 'react'
import ReactQuill from 'react-quill' // ES6
import 'react-quill/dist/quill.snow.css'

import { connect } from 'react-redux'
import { editPost, getPost, getPosts } from '../../actions/postActions'
import PropTypes from 'prop-types'

class EditPost extends Component {
  constructor(props) {
    super(props)
    // console.log('INITIALPROPS => ', this.props)
    // console.log('INITIALSTATE => ', this.state)
    this.state = {
      // editorHtml: this.props.currentPost.text,
      editorHtml: this.props.post.text,
      theme: 'snow',
      errors: {}
    }
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id)
    // this.props.getPosts()
  }

  // onChange = e => {
  //   this.setState({ editorHtml: this.state.editorHtml })
  //   // console.log('e.target.value => ', e.target.value)
  //   console.log('ONCHANGE state => ', e)
  // }
  onFormSubmit = async e => {
    e.preventDefault()
    // console.log('formValues => ', formValues)
    console.log('FS.props => ', this.props)
    // console.log('FS.state => ', this.state)
    const { user } = this.props.auth
    const newPost = {
      text: this.state.editorHtml,
      id: this.props.match.params.id,
      user: user
    }
    console.log('newPost => ', newPost)
    this.props.editPost(newPost, () => {
      this.props.history.push(`/post/${newPost.id}`)
    })
    // this.props.history.push('/test')

    // this.props.history.push({
    //   pathname: '/feed'
    //   // state: { text: this.state.editorHtml }
    // })
    //window.location.reload()
  }

  handleChange = html => {
    this.setState({ editorHtml: html })
    // this.props.onChange(this.state.term)
    // // console.log('EDITHTML => ', html)
    // console.log('term => ', this.state.term)
  }

  render() {
    // console.log('PASS TO PARENT => ', this.state)
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <ReactQuill
            theme={this.state.theme}
            onChange={this.handleChange}
            defaultValue={this.state.editorHtml}
            // value={{ ...this.state, handleChange: this.handleChange }}
            modules={EditPost.modules}
            formats={EditPost.formats}
          />
          <button type="submit" className="btn btn-dark">
            Edit a post
          </button>
        </form>
      </div>
    )
  }
}

EditPost.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    [{ color: [] }, { background: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
EditPost.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'color',
  'background'
]

EditPost.propTypes = {
  editPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  console.log('MSTP => ', state)
  console.log('OWNP => ', ownProps)
  // console.log(
  //   'currentPost => ',
  //   state.post.posts.find(post => post._id === ownProps.match.params.id)
  // )
  return {
    auth: state.auth,
    errors: state.errors,
    post: state.post.post
    // currentPost: state.post.posts.find(
    //   post => post._id === ownProps.match.params.id
    // )
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     getPost: postId => {
//       dispatch(getPost(postId))
//     },
//     editPost: editHtml => {
//       dispatch(editPost(editHtml))
//     }
//   }
// }

export default connect(
  mapStateToProps,
  // mapDispatchToProps,
  { getPost, getPosts, editPost }
)(EditPost)
