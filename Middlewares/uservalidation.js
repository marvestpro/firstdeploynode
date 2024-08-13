const yup = require("yup")

const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/

const uservalidation = yup.object({
    firstname:yup.string().required("firstname is empty").max(15, "Maximum of fifteen"),
    lastname:yup.string().required("lastname is empty"),
    email:yup.string().matches(emailregex, "must be a valid email").required("email fields cannot be empty"),
    password:yup.string().min(5, "password is too short").required("password field cannot be empty")
})


module.exports  = {uservalidation}