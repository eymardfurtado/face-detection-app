import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onSubmit, onKeyDown}) => {
  return (
    <div className="ImageLinkForm">
      <p className='f4'>{'This App will detect faces in your picture. \n Click on an image below or enter the Url for an image!'}</p>
      
    <div >
      
      <input onChange={onInputChange} onKeyDown={onKeyDown} type="text" placeholder="Enter image Url" className="ImageLinkForm f4 pa2 w-70 center br2 ma2" />
      <button onClick={onSubmit} className="ImageLinkForm w-30 grow br2 f4 link ph3 pv2 dib white bg-purple">detect</button>
    </div>
    </div>
  )
}

export default ImageLinkForm
