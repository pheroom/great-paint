import axios from "axios";
import {API_URL} from "../utils";

export default class ImageService{
    static getImage(id: string, userId: string){
        return axios.get(`${API_URL}/image?id=${id}&userId=${userId}`)
    }

    static postImage(id: string, userId: string, username: string, canvasImgUrl: string){
        return axios.post(`${API_URL}/image?id=${id}&userId=${userId}&username=${username}`, {img: canvasImgUrl})
    }
}