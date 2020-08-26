import React from 'react'
import './FaceRecognition.css';
import imgPlaceholder from '../../resources/imgplaceholdertightcrop.png';

const FaceRecognition = ({ faces, image }) => {

  let boxes;

  if (Array.isArray(faces)) {
    boxes = faces.map(face => {
      return <div className="bounding-box" key={face.id} style={{ top: face.topRow, right: face.rightCol, bottom: face.bottomRow, left: face.leftCol }}></div>
    })
  }

  return (
    <div className="Face ma center">
      <div className="absolute mt2">
        <img id="inputimage" src={image ? image : imgPlaceholder} alt="my image" width='450px' height='auto' />
        {boxes}
      </div>
    </div>
  )
}

export default FaceRecognition
