
const errorHandler = (err,req,res,next) => {
  const objErr = (code, message) => {
    return res.status(code).json({
      status: 'Error',
      name: err.name,
      message: message
    })
  }

  if(err){
    switch (err.name) {
      case "SequelizeValidationError":
        objErr(400, err.errors.map(e=>e.message))
        break;
      case "SequelizeUniqueConstraintError":
        objErr(400, err.errors.map(e=>e.message))
        break;
      case "ErrorLogin":
        objErr(401, 'wrong email / password')
        break;
      case "ErrorAuthenticate":
        objErr(401, 'you need to login first')
        break;
      case "ErrorAuthorize":
        objErr(401, 'you dont have access')
        break;
      case "SequelizeForeignKeyConstraintError": 
        objErr(400, 'invalid constrain error')
        break;
      case "ErrorNotFound":
        objErr(404, 'not found')
        break;
      default:
        res.status(500).json({
          status: 'Error',
          error: err
        })
        break;
    }
  }
}

module.exports = errorHandler