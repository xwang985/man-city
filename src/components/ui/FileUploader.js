import React, { Component } from "react";
import { firebaseStorage, firebasePlayers, firebaseUrl } from "../../firebase";
import FileUploader from "react-firebase-file-uploader";
import { CircularProgress } from "@material-ui/core";

const initialState = {
  name: "",
  isUploading: false,
  fileUrl: ""
};

class Fileuploader extends Component {
  state = initialState;

  static getDerivedStateFromProps(props, state) {
    if (props.defaultImg) {
      return (state = {
        name: props.defaultImg,
        fileUrl: props.defaultImg
      });
    }
    return null;
  }

  handleUploadStart = () => {
    this.setState({ isUploading: true });
  };

  handleUploadError = () => {
    this.setState({ isUploading: false });
  };

  handleUploadSuccess = filename => {
    this.setState({ name: filename, isUploading: false });
    firebaseUrl(this.props.dir, filename).then(fileUrl =>
      this.setState({ fileUrl })
    );
    // firebaseStorage
    //   .ref(this.props.dir)
    //   .child(filename)
    //   .getDownloadURL()
    //   .then(fileUrl => this.setState({ fileUrl }));

    this.props.filename(filename);
  };

  uploadAgain = () => {
    this.props.resetImage();
    this.setState(initialState);
  };

  render() {
    return (
      <div>
        {!this.state.fileUrl && (
          <>
            <div className="label_inputs">{this.props.tag}</div>
            <FileUploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebaseStorage.ref(this.props.dir)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              style={{ cursor: "pointer" }}
            />
          </>
        )}
        {this.state.isUploading && (
          <div
            className="progress"
            style={{ textAlign: "center", margin: "30px 0" }}
          >
            <CircularProgress style={{ color: "#98c6e9" }} thickness={7} />
          </div>
        )}
        {this.state.fileUrl && (
          <div className="image_upload_container">
            <img
              style={{ width: "100px" }}
              src={this.state.fileUrl}
              alt={this.state.name}
            />
            <div className="remove" onClick={this.uploadAgain}>
              Remove
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Fileuploader;
