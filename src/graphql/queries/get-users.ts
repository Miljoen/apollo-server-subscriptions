import { User } from '../../models/User'

export const getUsers = () => User.findAll()
