import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

const createJWT = (id: mongoose.Types.ObjectId) => jwt.sign({id}, process.env.JWTSECRET!, {expiresIn: '5d'});

const comparePassword = (password: string, hash: string) => bcrypt.compareSync(password, hash);



export {
    hashPassword,
    createJWT,
    comparePassword
}