import { Request, Response, NextFunction } from 'express'
import User from '~/models/user.model'
import { signAccessToken } from '~/utils/jwt'

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, password } = req.body
    if (!code || !password) {
      throw new Error('Code và mật khẩu là bắt buộc')
    }
    const user = await User.findOne({ code })

    if (!user) {
      throw new Error('Code hoặc mật khẩu không đúng')
    }

    const token = await signAccessToken({
      _id: user._id.toString()
    })

    res.status(200).json({
      message: 'Đăng nhập thành công',
      token
    })
  } catch (error) {
    next(error)
  }
}
