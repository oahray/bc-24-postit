import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uploadImage, editProfile } from '../actions';
import Profile from '../components/Profile';
import ProfileEditor from '../components/ProfileEditor';

/**
 * @class EditProfile
 */
export class EditProfile extends Component {
  /**
   * @constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      editingInfo: false,
      uploading: false,
      about: '',
      email: '',
      imageFile: {},
      imageUrl: ''
    };
    this.edit = this.edit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.save = this.save.bind(this);
    this.pickImage = this.pickImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  /**
   * @function componentWillMount
   * @description A component life-cycle method
   * that fires before component mounts
   * @returns {undefined}
   */
  componentWillMount() {

  }

  /**
   * @function componentDidMount
   * @description A component life-cycle method
   * that fires when component mounts
   * @returns {undefined}
   */
  componentDidMount() {
    setTimeout(() => {
      $('.materialboxed').materialbox();
    }, 800);
    this.setState({
      about: this.props.user.about,
      email: this.props.user.email,
      imageUrl: this.props.user.imageUrl
    });
  }

  /** @function edit
   * @summary sets edit mode to true in component state
   * @returns {undefined}
   */
  edit() {
    this.setState({
      editingInfo: true
    });
  }

  /**
   * @function onInputChange
   * @description sets component state when
   * the value of an input changes
   * @param {Object} event
   * @param {string} key
   * @returns {undefined}
   */
  onInputChange(event, key) {
    this.setState({
      [key]: event.target.value
    });
  }

  /** @function endEdit
   * @summary sets edit mode to false in component state
   * @returns {undefined}
   */
  endEdit() {
    this.setState({
      editingInfo: false
    });
  }

  /**
   * @function save
   * @summary to dispatch action and set component state
   * @returns {undefined}
   */
  save() {
    this.endEdit();
    this.props.editProfile(
      this.state.about,
      this.state.email,
      this.state.imageUrl,
      this.props.token
    );
  }

  /**
   * @function pickImage
   * @summary: saves image to component state for upload
   * @param {Object} event
   * @returns {undefined}
   */
  pickImage(event) {
    this.setState({
      imageFile: event.target.files[0]
    }, () => {
      this.handleUpload();
    });
  }

  /**
   * @function removeImage
   * @summary: removes imageUrl from state
   * @returns {undefined}
   */
  removeImage() {
    this.setState({
      imageUrl: ''
    });
  }

  /**
   * @function handleUpload
   * @description upload image to cloudinary
   * @returns {undefined}
   */
  handleUpload() {
    this.setState({
      uploading: true
    });
    uploadImage(this.state.imageFile)
      .then((response) => {
        const data = response.data;
        const fileURL = data.secure_url;
        this.setState({
          imageUrl: fileURL
        }, () => this.setState({
          uploading: false
        }));
      });
  }

  /**
   * @function render
   * @description component method to render element to screen
   * @returns {JSX} EditProfile component
   */
  render() {
    const profile = (<Profile user={this.props.user}
    state={this.state} edit={this.edit}/>);

    const profileEditor = (<ProfileEditor state={this.state}
      onInputChange={this.onInputChange}
      removeImage={this.removeImage} pickImage={this.pickImage}
      endEdit={this.endEdit} save={this.save}/>);

    return (
      <div className="edit-profile-page row">
        {this.state.editingInfo ? profileEditor : profile}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  token: state.token
});

const mapDispatchToProps = dispatch => bindActionCreators({
  editProfile
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
