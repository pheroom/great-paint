import {API_URL} from "../utils";

export default class WsService{
    static openWs(){
        return new WebSocket(`ws://${new URL(API_URL).host}/`)
    }
}