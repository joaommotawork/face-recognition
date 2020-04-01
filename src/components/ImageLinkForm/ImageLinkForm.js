import React from 'react'
import './ImageLinkForm.css'
const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
	return (
		<div className=''>
            <p className='f3'>
                {'This Magic Brain Will Detect Faces in Your Pictures'}
                <div className='center'>
                    <div className='form center ma3 pa4 br3 shadow-5'>
                        <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                        <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={onPictureSubmit}>Detect</button>
                    </div>
                </div>
            </p>
		</div>
	)
}

export default ImageLinkForm
