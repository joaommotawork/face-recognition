import React, { Component } from 'react';
import Navigation from "./components/Navigation/Navigation"
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Particles from 'react-particles-js'
import './App.css';

const particlesParams = {
	particles: {
		number: {
			value: 400,
			density: {
				enable: true,
				value_area: 800
			}
		},
		color: {
			value: '#fff'
		},
		shape: {
			type: 'circle',
			stroke: {
				width: 0,
				color: '#000000'
			},
			polygon: {
				nb_sides: 5
			},
			image: {
				src: 'img/github.svg',
				width: 100,
				height: 100
			}
		},
		opacity: {
			value: 0.5,
			random: true,
			anim: {
				enable: false,
				speed: 1,
				opacity_min: 0.1,
				sync: false
			}
		},
		size: {
			value: 10,
			random: true,
			anim: {
				enable: false,
				speed: 40,
				size_min: 0.1,
				sync: false
			}
		},
		line_linked: {
			enable: false,
			distance: 500,
			color: '#ffffff',
			opacity: 0.4,
			width: 2
		},
		move: {
			enable: true,
			speed: 6,
			direction: 'bottom',
			random: false,
			straight: false,
			out_mode: 'out',
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200
			}
		}
	},
	interactivity: {
		detect_on: 'canvas',
		events: {
			onhover: {
				enable: true,
				mode: 'bubble'
			},
			onclick: {
				enable: true,
				mode: 'repulse'
			},
			resize: true
		},
		modes: {
			grab: {
				distance: 400,
				line_linked: {
					opacity: 0.5
				}
			},
			bubble: {
				distance: 400,
				size: 4,
				duration: 0.3,
				opacity: 1,
				speed: 3
			},
			repulse: {
				distance: 200,
				duration: 0.4
			},
			push: {
				particles_nb: 4
			},
			remove: {
				particles_nb: 2
			}
		}
	},
	retina_detect: true
}

const initialState = {
	input: '',
	imageURL: '',
	box: {},
	route: 'signIn',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = initialState
	}

	loadUser = ( data ) => {
		this.setState({user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined
			}})
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
		const image = document.getElementById('inputImage')
		const width = Number(image.width)
		const height = Number(image.height)
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	displayFaceBox = (box) => {
		this.setState({box: box})
	}

	onInputChange = event => {
		this.setState({ input: event.target.value })
	}

	onPictureSubmit = () => {
    this.setState({imageURL: this.state.input})
		fetch('http://localhost:3001/imageURL', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				input: this.state.input
			})
		})
		.then(response => response.json())
		.then(response => {
			if (response) {
				fetch('http://localhost:3001/image', {
					method: 'put',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						id: this.state.user.id
					})
				})
				.then(response => response.json())
				.then(count => {
					this.setState(
						Object.assign(this.state.user, {
							entries: count
						})
					)
				})
				.catch(console.log)
			}
			this.displayFaceBox(this.calculateFaceLocation(response))
		})
		.catch(err => console.log(err))
	}

	onRouteChange = (route) => {
		if (route === 'signOut') {
			this.setState(initialState)
		} else if  (route === 'home') {
			this.setState({
				isSignedIn: true
			})
		}
		this.setState({route: route})
	}

	render() {
		const { isSignedIn, imageURL, route, box, user } = this.state
		return (
			<div className='App'>
				<Particles className='particles' params={particlesParams} />
				<Navigation
					isSignedIn={isSignedIn}
					onRouteChange={this.onRouteChange}
				/>
				<Logo />
				{route === 'home' ? (
					<div>
						<Rank name={user.name} entries={user.entries} />
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onPictureSubmit={this.onPictureSubmit}
						/>
						<FaceRecognition box={box} imageURL={imageURL} />
					</div>
				) : route === 'signIn' ? (
					<SignIn
						loadUser={this.loadUser}
						onRouteChange={this.onRouteChange}
					/>
				) : (
					<Register
						loadUser={this.loadUser}
						onRouteChange={this.onRouteChange}
					/>
				)}
			</div>
		)
	}
}

export default App;
