import {API_URL, ICanvasData} from "../utils";
import axios from "axios";

export default class CanvasService{
    static getConfines(id: string, signal){
        return axios.get(`${API_URL}/canvas-confines?id=${id}`, signal)
    }

    static createCanvas(canvasData: ICanvasData){
        return axios.post(`${API_URL}/create-canvas`, canvasData)
    }
}