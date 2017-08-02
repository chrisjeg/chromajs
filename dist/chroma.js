'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request-promise');

var Chroma = function () {
    function Chroma(_ref) {
        var _this = this;

        var uri = _ref.uri,
            session = _ref.session,
            application = _ref.application;

        _classCallCheck(this, Chroma);

        this._uri = uri;
        this._session = session;
        this._application = application;
        this._heartbeat = setInterval(function () {
            return request({
                uri: _this._uri + '/heartbeat',
                method: 'PUT',
                body: {},
                json: true
            });
        }, 5000);
    }

    _createClass(Chroma, [{
        key: 'set',
        value: function set(_ref2) {
            var device = _ref2.device,
                _ref2$method = _ref2.method,
                method = _ref2$method === undefined ? 'PUT' : _ref2$method,
                body = _ref2.body;

            if (this._application.device_supported.includes(device)) {
                return request({
                    uri: this._uri + '/' + device,
                    method: method,
                    body: body,
                    json: true
                });
            } else {
                throw new Error("Device is not supported by this app");
            }
        }
    }, {
        key: 'cleanup',
        value: function cleanup() {
            clearInterval(this._heartbeat);
            return request({
                uri: this._uri,
                method: 'DELETE'
            });
        }
    }], [{
        key: 'initialize',
        value: function initialize(application) {
            return request({
                uri: 'http://localhost:54235/razer/chromasdk',
                method: 'POST',
                json: true,
                body: application
            }).then(function (response) {
                return {
                    uri: response.uri,
                    session: response.session,
                    application: application
                };
            });
        }
    }]);

    return Chroma;
}();

module.exports = Chroma;