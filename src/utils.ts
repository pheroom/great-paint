export const API_URL = 'https://sphenoid-tested-alyssum.glitch.me'
// export const API_URL = 'http://localhost:5000'

export interface ICanvas{
    id: string
    ownerName: string
    title: string
    spectators: string[]
    painters: string[]
    isPrivate: boolean
}