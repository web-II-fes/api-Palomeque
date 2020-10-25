import * as jwt from 'jsonwebtoken';
import { key } from './../../../config.private';
import * as express from 'express';

export function verifyToken(req, res, next) {
    let token = req.headers['x-access-token'];
    console.log("Tokenn: ", token);

	if (!token) {
		return res.status(403).send({ message: 'No token provided!' });
	}

	jwt.verify(token, key.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: 'Unauthorized!' });
        }
        console.log("Error: ", err);
        console.log("Decoded: ", decoded);
		req.userId = decoded.id;
		next();
	});
}