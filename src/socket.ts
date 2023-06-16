import { Socket, io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';

// export const socket = io(URL || 'http://localhost:5000');
export const socket: Socket = io('http://localhost:5000');
// export const socket: Socket = io('https://queue-ticketing-api.azurewebsites.net/');