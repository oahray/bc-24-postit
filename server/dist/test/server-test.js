'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var request = _interopRequireWildcard(_supertest);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../models');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('POST /api/user/signup', function () {
  it('should create a new User', function (done) {
    request(_app2.default);
  });
});