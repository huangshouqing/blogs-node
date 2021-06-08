
// 用来对返回的数据添加固定的参数，如 code ，msg，等
class BaseModel {
  constructor(data, msg) {
    if (typeof data === 'string')
    {
      this.msg = data;
      data = null;
      msg = null
    }
    if (data)
    {
      this.data = data
    }
    if (msg)
    {
      this.msg = msg
    }
  }
}

class successModel extends BaseModel {
  constructor(data, msg) {
    super(data, msg);
    this.code = 0
  }
}
class errorModel extends BaseModel {
  constructor(data, msg) {
    super(data, msg);
    this.code = -1
  }
}



module.exports = {
  successModel,
  errorModel
}
