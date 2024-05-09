import {Request, Response} from "express"
import UserModel from "../models/user.model"


export const register = (req: Request, res: Response) => {

         const {username, email, password} = req.body

            const newUser = new UserModel({
                    username,
                    email,
                    password
                })

        console.log(newUser)
        res.sendStatus(200)
    }



export const login = (req: Request, res: Response) => {
  res.send("login")
}
