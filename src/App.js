import React, { Component } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
  apiKey: 'enter-clarifai-api-key'
});
class App extends Component {
  state = {
    input: "",
    imageUrl: "",
    imageWidth: 0,
    faces: {
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.onSubmitHandler);
  }

  calculateFaceLocation = (data) => {
    const inputImageElement = document.getElementById('inputimage');
    const width = Number(inputImageElement.width);
    const height = Number(inputImageElement.height);
    this.setState({ imageWidth: width });
    return data.outputs[0].data.regions.map(face => {
      return {
        id: face.id,
        leftCol: face.region_info.bounding_box.left_col * width,
        topRow: face.region_info.bounding_box.top_row * height,
        rightCol: width - (face.region_info.bounding_box.right_col * width),
        bottomRow: height - (face.region_info.bounding_box.bottom_row * height)
      }
    })
  }

  displayFaceBox = (faces) => {
    this.setState({ faces: faces });
  }

  onInputChangeHandler = (event) => {
    this.setState({ input: event.target.value })
  }

  onKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.onSubmitHandler();
    }
  }

  onImageClick = (event) => {
    let imageUrl = event.target.src;
    this.setState({ imageUrl: imageUrl, input: imageUrl }, () => {
      this.onSubmitHandler()
    });

  }

  onSubmitHandler = () => {
    this.setState({ imageUrl: this.state.input });
    let image = this.state.input;

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      image)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response))
        .catch(err => console.log(err)));
  }

  render() {
    return (
      <div className="App">
        <ImageLinkForm
          onInputChange={this.onInputChangeHandler}
          onSubmit={this.onSubmitHandler}
          onKeyDown={this.onKeyDown}
        />
        <a href="#inputimage">
          <img className="thumbImage" onClick={this.onImageClick} width="100px" height="80px" src="https://image.freepik.com/free-vector/business-people-organization-office-freelance-job-character_40876-1291.jpg" />
        </a>
        <a href="#inputimage">
          <img className="thumbImage" onClick={this.onImageClick} width="100px" height="80px" src="https://images.pexels.com/photos/2477357/pexels-photo-2477357.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
        </a>
        <a href="#inputimage">
          <img className="thumbImage" onClick={this.onImageClick} width="100px" height="80px" src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
        </a>
        <a href="#inputimage">
          <img className="thumbImage" onClick={this.onImageClick} width="100px" height="80px" src="https://images.unsplash.com/photo-1498661694102-0a3793edbe74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=993&q=80" />
        </a>

        <a href="#inputimage">
          <img className="thumbImage" onClick={this.onImageClick} width="100px" height="80px" src="https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
        </a>
        <FaceRecognition faces={this.state.faces} image={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
