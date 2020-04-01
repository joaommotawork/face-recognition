import React from 'react'
import './FaceRecognition.css'
const FaceRecognition = ({ box, imageURL }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img
				id='inputImage'
				width='500'
				height='auto'
				alt=''
				src={imageURL} />
				<div
					className='bounding-box'
					style={{
						top: box.topRow,
						right: box.rightCol,
						bottom: box.bottomRow,
						left: box.leftCol
					}}
				/>
			</div>
		</div>
	)
}

export default FaceRecognition
