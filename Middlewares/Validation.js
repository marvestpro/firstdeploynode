
const validate = (schema) => async(req, res, next) =>{
  try {
    const body = req.body
    if (body) {
        await schema.validate(body)
        next()
    }
  } catch (error) {
    console.log(error);
    res.status(409).send({message:error.message})
  }
}
module.exports = {validate}