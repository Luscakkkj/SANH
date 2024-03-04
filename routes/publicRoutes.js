const express = require('express');
const router = express.Router();
const getAuth = require('../controllers/auth/getAuth')
const postAuth = require('../controllers/auth/postAuth')



module.exports = {
    public: () => {
        /*========================== GET ROUTES ==========================*/

        router.get('/', (req, res) => res.render('index'));   

        router.get('/cadastro', getAuth.Cadastro); 

        router.get('/login', getAuth.Login);  

        /*========================== POST ROUTES ==========================*/

        router.post('/cadastro', postAuth.Cadastro)

        router.post('/login', postAuth.Login)

        return router
    }
}