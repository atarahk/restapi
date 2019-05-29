import React, { Component } from 'react'
import ReactQuill from 'react-quill' // ES6
import 'react-quill/dist/quill.snow.css'

import { connect } from 'react-redux'
import { editPost, getPost } from '../../actions/postActions'
import PropTypes from 'prop-types'

class EditPost extends Component {
  constructor(props) {
    super(props)
    console.log('initialprops => ', this.props)
    console.log('initialtext => ', this.props.currentPost)
    this.state = {
      editorHtml: this.props.currentPost.text,
      theme: 'snow',
      errors: {}
    }
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id)

    console.log(
      'this.props.getPost(id) => ',
      this.props.getPost(this.props.match.params.id)
    )
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    // console.log('e.target.value => ', e.target.value)
    // console.log('this.state => ', this.state)
  }

  onFormSubmit = e => {
    e.preventDefault()
    console.log('FS.props => ', this.props)
    const { user } = this.props.auth
    const newPost = {
      text: this.state.editorHtml,
      id: this.props.match.params.id,
      user: user
    }
    console.log(newPost)
    this.props.editPost(newPost)
    this.props.history.push('/feed')
  }

  handleChange = html => {
    this.setState({ editorHtml: html })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <ReactQuill
            theme={this.state.theme}
            onChange={this.handleChange}
            defaultValue={this.state.editorHtml}
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
  console.log(
    'currentPost => ',
    state.post.posts.find(post => post._id === ownProps.match.params.id)
  )
  return {
    auth: state.auth,
    errors: state.errors,
    currentPost: state.post.posts.find(
      post => post._id === ownProps.match.params.id
    )
  }
}

export default connect(
  mapStateToProps,
  { getPost, editPost }
)(EditPost)
