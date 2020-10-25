import { key } from '../../../config.private';
import { userSchema } from '../schemas/user';

import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

export function registro(usuario: any) {
	const user = new userSchema({
		username: usuario.username,
		email: usuario.email,
		password: bcrypt.hashSync(usuario.password, 8)
	});

	try {
		let newUser = user.save();
		return newUser;
	} catch (err) {
		throw err;
	}
}

export async function login(usuario) {
	try {
		let userLogin = await userSchema.findOne({ username: usuario.username });
		
		if (!userLogin) {
			return false;
		}
		
		let passwordIsValid = bcrypt.compareSync(usuario.password, userLogin.password);

		if (!passwordIsValid) {
			let msg = 'Password Invalido';
			return msg;
		}

		var token = jwt.sign({ id: userLogin.id, username: userLogin.username, rol: 'admin', email: userLogin.email }, key.secret, {
			expiresIn: 86400 // 24 hours
        });
        return token;
        console.log("Token: ", token);
	} catch (err) {
		throw err;
	}
}
