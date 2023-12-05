import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
export const JWT_SECRET = 'qBvPkU2X;J1,51Z!~2p[JW.DT|g:4l@';

export const __dirname = path.dirname(__filename);
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const verifyPassword = (password, user) => bcrypt.compareSync(password, user.password);
export const tokenGenerator = (user) => {
    const{
        _id: id,
        first_name,
        last_name,
        email,
        role
    } = user;
    const payload = {
        id,
        first_name,
        last_name,
        email,
        role
    };
    return JWT.sign(payload, 'JWT_SECRET', { expiresIn: '1m' })
}

export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        JWT.veriy(token, JWT_SECRET, (error, payload) => {
            if(error){
                return rejects(error)
            }
            resolve(payload);
        });
    });
}

