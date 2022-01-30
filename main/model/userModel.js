const rm = require('../../services/require.module');
const mongoose = rm.mongoose;

const schema = new mongoose.Schema({
  'name': {
    'type': 'string'
  },
  'userId': {
    'type': 'string'
  },
  'email': {
    'type': 'string'
  },
  'password': {
    'type': 'string'
  },
  'userType': {
    'type': 'string'
  }
});

module.exports = mongoose.model('user', schema, 'user');
