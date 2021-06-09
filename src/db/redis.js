const { REDIS_CONF } = require('../../conf/db.js')
const redis = require('redis');
const client = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

client.on('error', err => {
  console.log(err)
})




function set (key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  client.set(key, val, redis.print)
}

function get (key) {
  return new Promise((resolve, reject) => {

    client.get(key, (err, value) => {
      if (err) {

        reject(err)
        return
      }
      if (value == null) {

        resolve(null)
        return
      }
      try {
        // 对应 if(typeof value === 'object') {...}
        resolve(JSON.parse(value))
      } catch (ex) {
        resolve(value)
      }

    })
  })
}

function quit (params) {
  client.quit()
}

module.exports = {
  set,
  get,
  quit
}