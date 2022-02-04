const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const util = require('./utils/ex')
require('./config/db')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  await next().catch(err =>{
    if (err.status == '401'){
      ctx.status =200;
      ctx.body = util.fail('token认证失败', util.CODE.AUTH_ERROR)
    } else{
      throw err
    }
  })
})

// routes
const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const koajwt = require('koa-jwt')

app.use(koajwt({secret: 'vue3'}).unless(
    {
      path: [/^\/api\/users\/login/]
    }
))


router.prefix('/api')

router.get('/leave/count',(ctx)=>{
  const token = ctx.request.header.authorization.split(' ')[1]
  const payload = jwt.verify(token, 'vue3')

  ctx.body = payload
})
router.get('/menu/list',()=>{

})



router.use(users.routes(), users.allowedMethods())
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
