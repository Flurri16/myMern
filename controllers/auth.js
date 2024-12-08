import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
    try {
        // console.log(req.body);      // Тело запроса
        // console.log(req.params);    // Параметры маршрута
        // console.log(req.query);     // Строка запроса
        // console.log(req.headers);   // Заголовки запроса
        // console.log(req.method);    // HTTP метод
        // console.log(req.url);       // URL пути запроса
        // console.log(req.ip);        // IP клиента

        const {username, password} = req.body
        const isUsed = await User.findOne({username})
        if(isUsed) return res.json({message: 'User already exist.'})
        
        const salt = bcrypt.genSaltSync(8)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = await new User({username, password: hash})

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "30d"})

        await newUser.save()

        res.json({newUser, message: 'Registartion was succesfull.', token})

    } catch (e) {
        console.log(e)
        res.json({message: "Registration error."})
    }
}
