'use strict'

let express = require('express')

let About = (() => {
	let message = ''

	return class About {
		constructor() {
			message = 'About.'
		}

		get response() { // really complicated calculations
			return {
				title : 'Nine squares. How hard could it be?',
				message: message
			}
		}
	}
})()

module.exports = () => {
	return new About()
}
