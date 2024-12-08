import mongoose, { Schema } from 'mongoose'
import { IUsers } from '~/interfaces/user.interface'

export interface IUserModel extends IUsers {}

const UserSchema: Schema = new Schema<IUserModel>({})

const User = mongoose.model<IUserModel>('Users', UserSchema)

export default User
