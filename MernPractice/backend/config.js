import mongoPass from '../private/mongoPass.js'
// Port that its set to run on
export const PORT = 5555;

// The mongodb URL needed to access and use the database we created on mongo db
export const mongoDBURL = 
`mongodb+srv://root:${mongoPass}!@books-store-mern.kuedadf.mongodb.net/?retryWrites=true&w=majority`