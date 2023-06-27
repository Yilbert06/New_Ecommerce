const User = async () => {

const userCreate = {
    "firstName": "yilbert",
    "LastName": "osorio",
    "email": "yilbert06gmail.com",
    "password": "123456",
    "phone": "1131822916"
}

await User.create(userCreate)


}
module.exports = User