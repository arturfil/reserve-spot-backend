const { Schema, model } = require('mongoose');

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password required']
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },
    google: {
      type: Boolean,
      default: false
    },
    facebook: {
      type: Boolean,
      default: false
    }
  }
)

UserSchema.methods.toJSON = function() {
  const {password, _id, __v, ...user} = this.toObject();
  user.uid = _id;
  return user;
}

module.exports = model('User', UserSchema);