const request = require('request-promise');

class Chroma {
    constructor(app){
        this._app = app;
        this._ready = false;
        this._uri = null;
        this._heartbeat = null;

        request({
            uri:'http://localhost:54235/razer/chromasdk',
            method:'POST',
            json:true,
            body:app_data
        }).then(res=>{
            this._uri = res.uri;
            this._heartbeat = setInterval(
                ()=>request({
                    uri: this._uri + '/heartbeat',
                    method:'PUT',
                    body:{},
                    json:true
                })
            );
        });
    }

    set({device, method='PUT', body}){
        if(!this._ready){
            throw new Error("Chroma has not finished initiating. Cannot set state.")
        } else {
            if(this._app.device_supported.includes(device)){
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
    }


    cleanup(){
        if(this._ready){
            clearInterval(this._heartbeat);
            return request({
                uri: this._uri,
                method:'DELETE'
            })
        } else {
            throw new Error("Chroma has not finished initiating. Cannot clean up.")
        }
    }
}