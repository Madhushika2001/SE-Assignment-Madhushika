const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    select: false
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
});

// Only hash password if it's modified (for local users)
// userSchema.pre('save', async function(next) {
//   if (this.isModified('password') && this.password) {
//     this.password = await bcrypt.hash(this.password, 8);
//   }
//   next();
// });

// userSchema.methods.matchPassword = async function(enteredPassword) {
//   if (!this.password) return false;
//   return await bcrypt.compare(enteredPassword, this.password);
// };

module.exports = mongoose.model('User', userSchema);