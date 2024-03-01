import { createUserService } from "./service.js"

export const createUser = (req, res)=>{
    createUserService(req)
    .then(res.status({message: res.message, status: res.status}))
    .catch((error)=>{
        (res.status({message: error.message, status: error.status}))
    })
}
