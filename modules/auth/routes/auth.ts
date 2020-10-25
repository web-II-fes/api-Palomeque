import * as express from 'express';
import { userSchema } from './../schemas/user';
import { verifyToken } from './../middlewares/authJwt';
import { registro, login } from './../controllers/authController';

const router = express.Router();

router.post('/registro', async (req, res) => {
	console.log('Registro: ', req.body);
	let newRegistro = await registro(req.body);
});

router.post('/login', async (req, res) => {
	try {
		let token = await login(req.body);

		res.send({
			msg: 'Login Exitoso',
			token: token
		});
	} catch (err) {
		res.send(err);
	}
});

export = router;