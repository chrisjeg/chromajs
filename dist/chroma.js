'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request-promise');

var Chroma = function () {
    function Chroma(app) {
        var _this = this;

        _classCallCheck(this, Chroma);

        this._app = app;
        this._ready = false;
        this._uri = null;
        this._heartbeat = null;

        request({
            uri: 'http://localhost:54235/razer/chromasdk',
            method: 'POST',
            json: true,
            body: app_data
        }).then(function (res) {
            _this._uri = res.uri;
            _this._heartbeat = setInterval(function () {
                return request({
                    uri: _this._uri + '/heartbeat',
                    method: 'PUT',
                    body: {},
                    json: true
                });
            });
        });
    }

    _createClass(Chroma, [{
        key: 'set',
        value: function set(_ref) {
            var device = _ref.device,
                body = _objectWithoutProperties(_ref, ['device']);

            if (!this._ready) {
                throw new Error("Chroma has not finished initiating. Cannot set state.");
            } else {
                if (this._app.device_supported.includes(device)) {
                    return request({
                        uri: this._uri + '/' + device,
                        method: 'PUT',
                        body: body,
                        json: true
                    });
                } else {
                    throw new Error("Device is not supported by this app");
                }
            }
        }
    }, {
        key: 'cleanup',
        value: function cleanup() {
            if (this._ready) {
                clearInterval(this._heartbeat);
                return request({
                    uri: this._uri,
                    method: 'DELETE'
                });
            } else {
                throw new Error("Chroma has not finished initiating. Cannot clean up.");
            }
        }
    }]);

    return Chroma;
}();