import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { connect } from 'react-redux'
import { addPost } from '../../actions/postActions'
import PropTypes from 'prop-types'

class EditorHtml extends Component {
  constructor(props) {
    super(props)
    this.state = { editorHtml: '', text: '', theme: 'snow', errors: {} }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onFormSubmit = e => {
    e.preventDefault()
    const { user } = this.props.auth
    const newPost = {
      text: this.state.editorHtml,
      name: user.name,
      avatar: user.avatar
    }
    this.props.addPost(newPost)
    this.setState({ text: '' })
  }

  handleChange = html => {
    this.setState({ editorHtml: html })
    console.log('HTML => ', html)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <ReactQuill
            theme={this.state.theme}
            onChange={this.handleChange}
            value={this.state.editorHtml}
            modules={EditorHtml.modules}
            formats={EditorHtml.formats}
            placeholder="Any thing wanna say..."
          />
          <br />
          <button type="submit" className="btn btn-dark">
            Create a post
          </button>
          <br />
          <br />
        </form>
      </div>
    )
  }
}
// function imageHandler() {
//   var range = this.quill.getSelection();
//   var value = prompt('What is the image URL');
//   this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
// }

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
EditorHtml.modules = {
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

EditorHtml.propTypes = {
  placeholder: PropTypes.string
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
EditorHtml.formats = [
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
  'video',
  'color',
  'image',
  'background'
]

EditorHtml.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { addPost }
)(EditorHtml)
