import { sign } from 'jsonwebtoken'
import { compare, hash } from 'bcryptjs'
import { arg, objectType, extendType, stringArg } from 'nexus'

import { Context } from '../context'
import { logger } from '../utils/logger'

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  }
})

export const authMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
        email: stringArg(),
        roles: arg({ type: 'RoleCreateManyWithoutUsersInput' })
      },
      resolve: async (_parent, { name, email, password, roles }, ctx: Context) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.prisma.user.create({
          data: {
            name,
            password: hashedPassword,
            email,
            roles
          }
        })
        return {
          token: sign({ userId: user.id }, process.env.AUTH_SECRET as string),
          user
        }
      }
    })

    t.field('signin', {
      type: 'AuthPayload',
      args: {
        name: stringArg({ nullable: false }),
        password: stringArg({ nullable: false })
      },
      resolve: async (_parent, { name, password }, ctx: Context) => {
        const user = await ctx.prisma.user.findOne({
          where: {
            name
          }
        })
        if (!user) {
          throw new Error(`No user found for name: ${name}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, process.env.AUTH_SECRET as string),
          user
        }
      }
    })
  }
})
