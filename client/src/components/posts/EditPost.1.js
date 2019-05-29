import React, { Component } from 'react'
import ReactQuill from 'react-quill' // ES6
import 'react-quill/dist/quill.snow.css'

import { connect } from 'react-redux'
import { editPost, getPost } from '../../actions/postActions'
import PropTypes from 'prop-types'

class EditPost extends Component {
  constructor(props) {
    super(props)
    console.log('initialstate => ', this.state)
    console.log('initialprops => ', this.props)
    console.log('initialpropsID => ', this.props.post.post.text)
    this.state = {
      editorHtml: 'this.props.post.post.text',
      // text: '',
      theme: 'snow',
      errors: {}
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id)
  }

  onChange(e, formValue) {
    this.setState({ [e.target.name]: e.target.value })
    // this.setState()
    // console.log('onchangeprops => ', this.props)
    // console.log('onchangestate => ', this.state)
  }

  onFormSubmit = (e, formValue) => {
    e.preventDefault()
    console.log('formValue => ', formValue)
    console.log('onFSstate => ', this.state)
    console.log('onFSprops => ', this.props)
    // const { user } = this.props.auth
    // const newPost = {
    //   text: this.state.editorHtml,
    //   name: user.name,
    //   avatar: user.avatar
    // }
    // console.log(newPost)
    // this.props.editPost(newPost)
    // this.setState({ text: '' })
  }

  // handleChange = html => {
  //   this.setState({ editorHtml: html })
  // }

  // handleChange = (content, delta, source, editor) => {
  // console.log(content)
  // console.log(editor)
  // console.log('DELTA => ', delta)
  // console.log('EDITOR => ', editor.getHTML())
  // // console.log(editor.getContents().ops[0].insert)
  // console.log('get => ', editor.getContents())
  // console.log('content => ', content)
  // console.log('source => ', source)
  // const abc = editor.getHTML()

  // console.log('abc => ', abc)
  // this.setState({ editorHtml: content })
  // this.setState({ quillDelta: content, curQuillDelta: editor.getContents() })
  // this.setState({ editorHtml: content })
  // return content
  // }

  handleChange = value => {
    this.setState({ editorHtml: value })
  }

  render() {
    // console.log(this.props.post.post.text)

    // console.log('certainID => ', this.props)
    // const aaa = String(this.props.post.post.text)

    // console.log('aaa => ', aaa)
    // const bbb = aaa.replace(/"/g, '')
    // console.log('bbb => ', bbb)
    // console.log('this.state => ', this.state)
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <ReactQuill
            theme={this.state.theme}
            onChange={this.handleChange}
            // value="<p>&lt;iframe class='ql-video' frameborder='0' allowfullscreen='true' src='https://www.youtube.com/embed/y7e-GC6oGhg?showinfo=0'&gt;&lt;/iframe&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;</p>"
            // value="<iframe class=ql-video frameborder=0 allowfullscreen=true src=https://www.youtube.com/embed/y7e-GC6oGhg?showinfo=0></iframe><p><br></p>"
            // value={this.props.post.post.text}
            // value={editor.getContents()}
            // value={bbb}
            // defaultValue={bbb}
            value={this.state.editorHtml}
            modules={EditPost.modules}
            formats={EditPost.formats}
            // placeholder={bbb}
            // placeholder={bbb}
          />
          <button type="submit" className="btn btn-dark">
            Edit a post
          </button>
        </form>
      </div>
    )
  }
}

// EditPost.propTypes = {
//   placeholder: PropTypes.string
// }
// console.log('EditPost => ', EditPost.propTypes)

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */

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
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

// const mapStateToProps = (state, ownProps) => ({
//   auth: state.auth,
//   errors: state.errors,
// })
const mapStateToProps = (state, ownProps) => {
  console.log('MSTP =>', state)
  return {
    auth: state.auth,
    errors: state.errors,
    post: state.post
  }
}

export default connect(
  mapStateToProps,
  { getPost, editPost }
)(EditPost)
