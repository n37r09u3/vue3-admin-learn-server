const router = require('koa-router')()

router.prefix('/users')
const User = require('../models/userScheme')
router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
const utils = require('../utils/ex')
router.post('/login',  async ctx => {
  try {
    const {userName, userPwd} = ctx.request.body
    const res = await User.findOne({
      userName,
      userPwd
    })
    if (res){
      ctx.body = utils.success(res)
    } else{
      ctx.body =  utils.fail('账号或密码不正确')
    }
  } catch (error){
    ctx.body =  utils.fail(error.message)
  }
})
module.exports = router
