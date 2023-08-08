export const API_URL = 'https://great-paint-server.glitch.me'
// export const API_URL = 'http://localhost:5000'

export interface ICanvasData{
    name: string,
    spectatorCode: string | undefined,
    painterCode: string | undefined,
}

export interface IConfines{
    name: string,
    spectatorCode: boolean,
    painterCode: boolean,
}

export const sha256 = async (data) => {
    const textAsBuffer = new TextEncoder().encode(data);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const digest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return digest;
}

export function uuidToColor(str) {
    return "#" + str.slice(-6)
}

export const names = ['Ash', 'Blaze', 'Bolt', 'Breez', 'Cade', 'Cruz', 'Dash', 'Dex', 'Echo', 'Finn', 'Flash', 'Gage', 'Grey', 'Hawk', 'Jax', 'Jet', 'Kai', 'Koda', 'Lark', 'Levi', 'Luxe', 'Maxx', 'Neo', 'Onyx', 'Ozzy', 'Pax', 'Phoenix', 'Quest', 'Raze', 'Rio', 'Rogue', 'Rush', 'Sage', 'Scout', 'Sky', 'Slate', 'Sol', 'Storm', 'Swift', 'Titan', 'Trace', 'Vega', 'Vex', 'Wolf', 'Xander', 'Zenon', 'Zeus', 'Zephyr', 'Zorro', 'Zylo']