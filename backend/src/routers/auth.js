import express from 'express';
import { Login, Register } from '../api/auth';

const route = express.Router();

route.post('/register',Register) //;+localhost:8000/apilogin
route.post('/login',Login)

export default route