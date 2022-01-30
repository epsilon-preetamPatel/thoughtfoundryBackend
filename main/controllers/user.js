const userService = require("../services/user.service")

class user {

    post = (async (req, callback) => {
        try {
            let result = await userService.register(req.body)
            if (result.error) {
                callback(result, null)
            } else {
                callback(null, result)
            }
        } catch (error) {
            error.status = 400
            callback(error, null)
        }
    })

    get = (async (req, callback) => {
        try {
            let result = await userService.details(req.query)
            if (result.error) {
                callback(result, null)
            } else {
                callback(null, result)
            }
        } catch (error) {
            error.status = 400
            callback(error, null)
        }
    })
}


module.exports = new user();