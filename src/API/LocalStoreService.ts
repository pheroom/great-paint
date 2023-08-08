import {ICanvasData, names} from "../utils";

enum keys {
    USERNAME = 'username',
    CODE = 'code',
}

export default class LocalStoreService{
    static getUsername() {
        const response = localStorage.getItem(keys.USERNAME)
        if(!response) {
            const name = names[Math.floor(Math.random()*names.length)]
            LocalStoreService.setUsername(name)
            return name
        }
        return response
    }

    static setUsername(username: string){
        localStorage.setItem(keys.USERNAME, username)
    }

    static getCanvas(id: string) {
        return JSON.parse(localStorage.getItem(id))
    }

    static setCanvas(id: string, canvasData){
        localStorage.setItem(id, JSON.stringify(canvasData))
    }

    static removeCanvas(id: string){
        localStorage.removeItem(id)
    }

    // static setCanvas(id: string, canvasData: ICanvasData){
    //     localStorage.setItem(id, JSON.stringify(canvasData))
    // }

    // static getCode(id: string) {
    //     const {codeId, code} = JSON.parse(localStorage.getItem(keys.CODE))
    //     return codeId === id ? code : undefined
    // }
    //
    // static setCode(id:string, code: string){
    //     localStorage.setItem(keys.CODE, JSON.stringify({code, id}))
    // }
}