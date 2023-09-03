const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		fname: {
			type: String,
			
		},
		lname: {
			type: String,
			
		},
		img:{
			data: Buffer,
			contentType: String
		},
		dob:{
			type:Date,
		}
	},
	{ timestamps: true },
)

const User = mongoose.model('User', userSchema)

module.exports = { User }
