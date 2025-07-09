import dotenv from 'dotenv'
dotenv.config()

export const USERNAME = process.env.ORANGE_USERNAME!
export const PASSWORD = process.env.ORANGE_PASSWORD!

// This file has to be commited but it does not have real credentials!