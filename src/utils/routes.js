// class Routers {
//   constructor() {
//     this.routes = [];
//     this.req = arguments[0]
//     this.res = arguments[arguments.length - 1]
//     this.method = this.req.method;
//     this.url = this.req.url;
//     arguments[0].path = this.path = this.url.split("?")[0]
//   }
//   async get () {
//     const path = arguments[0]
//     const handler = arguments[arguments.length - 1]
//     this.routes.push({
//       method: 'GET',
//       path: path,
//       handler
//     })
//     if (this.method === 'GET' && this.path === path) {
//       await this.handler(handler)
//     }
//   }
//   async post () {
//     const path = arguments[0]
//     const handler = arguments[arguments.length - 1]
//     this.routes.push({
//       method: 'POST',
//       path: path,
//       handler
//     })
//     if (this.method === 'POST' && this.path === path) {
//       await this.handler(handler)
//     }
//   }
//   async handler (call) {
//     if (typeof call === 'function') {
//       await call(this.req, this.res)
//     } else {
//       throw new Error('handler is undefined')
//     }
//   }

// }

(function () {
  // 收集路由依赖
  let routes = [];

  Routers = (req, res) => {
    let method = req.method;
    let url = req.url;
    let path = url.split("?")[0]
    let flag = routes.find(route => {
      if (route.path === path) {
        return true
      } else {
        return false
      }
    })
    if (!flag) {
      // 未命中
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('404 NOT Found')
      return
    }
    // 执行的时候直接往注册的routes里找有没有注册的路由
    routes.forEach(route => {
      if (method === route.method && path === route.path) {
        route.handler(req, res)
      }
    })
  }

  Routers.get = (path, callback) => {
    routes.push({
      method: 'GET',
      path: path,
      handler: callback
    })
  }

  Routers.post = (path, callback) => {
    routes.push({
      method: 'POST',
      path: path,
      handler: callback
    })
  }
  // 将routes也挂载在Routers上
  Routers.routes = routes
  // 导出
  module.exports = Routers
})()
