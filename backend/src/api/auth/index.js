
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { loginSchema } from "../../validate/Login";
// import Users from "../../model/Users";
import bcrypt from "bcryptjs";
import { signupSchema } from "../../validate/Register";
import Users from "../../model/Users";
import connect from "../../config/db";

dotenv.config()
export const Login = async (req, res) => {
    await connect()
    const { SECRET_CODE } = process.env
    const data = req.body
    const method = req.method
    switch (method) {
        case "POST":
            try {
                const { error } = loginSchema.validate(data)
                if (error) {
                    return res.status(400).send({ message: error?.details[0].message })
                }
                const user = await Users.findOne({ email: data.email });
                if (!user) {
                    return res.status(400).send({ message: "user not found" });
                }
                const validPass = bcrypt.compare(data.password, user.password);
                if (!validPass) {
                    return res.status(400).send({ message: "Mật khẩu không đúng" })
                }
                const token = jwt.sign({ _id: user._id }, SECRET_CODE, {
                    expiresIn: "10d",
                });
                user.password = undefined;
    
                return res.status(200).send({
                    message: "Đăng nhập thành công",
                    accessToken: token,
                    user,
                });
                
            } catch (error) {
                return res.send({message:error});
            }

        default:
             return res.status(404).send({ message: "Method not found" })
            break;
    }
}

export const Register = async (req, res) => {
    await connect()
    const method = req.method
    const data = req.body
    switch (method) {
        case "POST":
            try {
                const { error } = signupSchema.validate(data)
                if (error) {
                    return res.status(400).send({ message: error?.details[0].message })
                }

                const userExists = await Users.findOne({ email: data.email });
                if (userExists) {
                    return res.status(409).json({
                        message: "User already exists",
                        connect: false
                    })
                }
                
                const hashedPassword = await bcrypt.hash(data.password, 10);
                const user = await Users.create({
                   ...data,
                    password: hashedPassword,

                });
                
                user.password = undefined;
                user.role = undefined;
                return res.status(201).json({
                    message: "User created successfully",
                    user,
                });
            } catch (error) {
                return res.send({message:error});
            }

        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }
}