class Routers {
  constructor() {
    this.routes = [];
    this.req = arguments[0]
    this.res = arguments[arguments.length - 1]
    this.method = this.req.method;
    this.url = this.req.url;
    arguments[0].path = this.path = this.url.split("?")[0]
  }
  async get () {
    const path = arguments[0]
    const handler = arguments[arguments.length - 1]
    if (this.method === 'GET' && this.path === path) {
      await this.handler(handler)
    }
  }
  async post () {
    const path = arguments[0]
    const handler = arguments[arguments.length - 1]
    if (this.method === 'POST' && this.path === path) {
      await this.handler(handler)
    }
  }
  async handler (call) {
    if (typeof call === 'function') {
      await call(this.req, this.res)
    } else {
      throw new Error('handler is undefined')
    }
  }

}
module.exports = Routers