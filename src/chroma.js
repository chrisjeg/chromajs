const request = require('request-promise');

class Chroma {
    constructor({uri, session, application}){
        this._uri = uri;
        this._session = session;
        this._application = application;
        this._heartbeat = setInterval(
            ()=>request({
                uri: this._uri + '/heartbeat',
                method:'PUT',
                body:{},
                json:true
            })
        ,5000);
    }

    static initialize(application){
        return request({
            uri:'http://localhost:54235/razer/chromasdk',
            method:'POST',
            json:true,
            body:application
        }).then(response=>({
            uri: response.uri,
            session: response.session,
            application
        }))
    }

    set({device, method='PUT', body}){
        if(this._application.device_supported.includes(device)){
            return request({
                uri: `${this._uri}/${device}`,
                method,
                body,
                json:true
            })
        } else {
            throw new Error("Device is not supported by this app")
        }
    }


    cleanup(){
        clearInterval(this._heartbeat);
        return request({
            uri: this._uri,
            method:'DELETE'
        })
    }
}

module.exports = Chroma;