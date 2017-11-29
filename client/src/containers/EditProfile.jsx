import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { uploadImage, editProfile } from '../actions';

/* eslint-disable no-nested-ternary */

/**
 * @class EditProfile
 */
class EditProfile extends Component {
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
    this.save = this.save.bind(this);
    this.pickImage = this.pickImage.bind(this);
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
   * @function save
   * @summary to dispatch action and set component state
   * @returns {undefined}
   */
  save() {
    this.setState({
      editingInfo: false
    });
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
    const profile = (
      <div className="edit-profile-card col s12 m6 z-depth-1">
        <h5 className="page-header center">My Profile</h5>
        <br/>
        <div className="photo-and-info center">
          <div className="full-photo-div">
            <img className="full-photo" src={this.props.user.photo ?
              this.props.user.photo : (this.state.imageUrl ?
                this.state.imageUrl : '/images/no-pic.png')}
              alt="profile photo" />
          </div>
          <div className="join-info">
            <h5>{this.props.user.username}</h5>
            <p>
              <small>Registered <strong>{moment(this.props.user.createdAt)
                .format('Do MMMM, YYYY, [at] h:mma')}</strong></small>
            </p>
          </div>
        </div>
        <div className="user-info">
          <p className="main-text-color page-header">
            <strong>PERSONAL INFO</strong>
            <span className="pointer right">
              <a onClick={this.edit}>Edit</a>
            </span>
          </p>
          <p><strong>About me: </strong>{this.props.user.about}</p>
          <p><strong>Email: </strong>{this.props.user.email}</p>
        </div>
      </div>
    );

    const profileEditor = (
      <div className="edit-profile-card z-depth-1">
        <h5 className="page-header center">Edit Profile</h5>

        <form action="#" className="row">
          <div className="input-field col s12"
            id="">
            <input className="s12" autoFocus
              value={this.state.about} onChange={event =>
                this.setState({ about: event.target.value })} />
            <label className="active" for="first_name2">About</label>
          </div>

          <div className="input-field col s12">
            {<input className="s12" value={this.state.email}
              onChange={event =>
                this.setState({ email: event.target.value })} />}
            <label className="active" for="first_name2">Email</label>
          </div>

          <div className="col s12">
            <p>Change your profile picture</p>
            <div className="file-field input-field">
              <div className="btn">
                <span>Photo</span>
                <input type="file" onChange={this.pickImage}
                  accept=".jpg,.jpeg,.png" />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate"
                  placeholder="Upload new picture" type="text" />
              </div>
            </div>
          </div>
          <div className="center">
            <a onClick={this.save}
              className={`btn white main-text-color ${
                this.state.uploading ? 'disabled' : ''
              }`}>
                {this.state.uploading ? 'Uploading...' : 'Save'}
              </a>
          </div>
        </form>
      </div>
    );

    return (
      <div className="edit-profile-page valign-wrapper row">
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
