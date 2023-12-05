import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../models/UserModel.js';
import { JWT_SECRET } from '../utils.js';

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['access_token'];
    }
    return token;
};

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: JWT_SECRET,
};

passport.use('jwt', new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await UserModel.findById(payload.id);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error, false);
    }
}));

passport.use('current', new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await UserModel.findById(payload.id);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error, false);
    }
}));
