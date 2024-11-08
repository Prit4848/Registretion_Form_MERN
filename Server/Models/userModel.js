const mongoose = require('mongoose');


mongoose.connect('mongodb://0.0.0.0:27017/RegistrationMERN')
.then(() => {
    console.log("Database connected");
})
.catch((error) => {
    console.error("Database connection error:", error);
});


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
