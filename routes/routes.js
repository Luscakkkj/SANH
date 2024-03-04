/*
|- - - - - - - - - - - - - - - - - - - - 
|          Importação das rotas        |
|- - - - - - - - - - - - - - - - - - - - 
*/

const public_route = require('./publicRoutes')
const home_route = require('./homeRoute')

module.exports = {
    public: public_route.public(),
    home: home_route.home()
}