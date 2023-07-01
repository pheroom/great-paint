import axios from "axios";
import {API_URL} from "../utils";

export default class ImageService{
    static getImage(id: string){
        return axios.get(`${API_URL}/image?id=${id}`)
    }

    static postImage(id: string, username: string, canvasImgUrl: string){
        return axios.post(`${API_URL}/image?id=${id}&username=${username}`, {img: canvasImgUrl})
    }
}