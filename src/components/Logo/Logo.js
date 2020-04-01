import React from 'react'
import Tilt from 'react-tilt'
import PersonalLogo from './Logo.png'
const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt
				className='Tilt'
				options={{ max: 25 }}
				style={{ height: 150, width: 150 }}
			>
				<div className='Tilt-inner'>
                    <img alt='Logo' src={PersonalLogo}/>
                </div>
			</Tilt>
		</div>
	)
}

export default Logo
