const express = require('express')
const router = express.Router()

const homeGet = require('../controllers/home/getHome')
const homePost = require('../controllers/home/postHome.js')
const homeDelete = require('../controllers/home/deleteHome.js')
const upload = require('../middleware/upload')

module.exports = {
    home: () => {
       /*========================== GET ROUTES ==========================*/

        router.get('/home/:crnNutri', homeGet.Dashboard)

        router.get('/home/:crnNutri/registro', homeGet.Registro)

        router.get('/home/:crnNutri/pacientes', homeGet.Listagem)

        router.get('/home/:crnNutri/pacientes/:idPacientes', homeGet.Perfil)

        router.get('/home/:crnNutri/pacientes/:idPacientes/evolucao', homeGet.Evolucoes)

        router.get('/home/:crnNutri/pacientes/:idPacientes/prescricao', homeGet.Prescricoes)

        router.get('/home/:crnNutri/pacientes/:idPacientes/triagem', homeGet.Triagem)

        router.get('/home/:crnNutri/pacientes/:idPacientes/prescricoes', homeGet.ListagemPrescricao)

        router.get('/home/:crnNutri/pacientes/:idPacientes/evolucoes', homeGet.ListagemEvolucoes)


      /*========================== POST ROUTES ==========================*/


        router.post('/home/registro/pacientes', upload.single('file'), homePost.Pacientes)

        router.post('/home/registro/:idPacientes/evolucao', homePost.Evolucao)

        router.post('/home/registro/:idPacientes/prescricao', homePost.Prescricao)


       /*========================== DELETE ROUTES ==========================*/

        router.post('/delete/:crnNutri/registro/:idPacientes', homeDelete.Perfil)

        router.post("/delete/:crnNutri/registro/:idPacientes/prescricao/:idPrescricoes", homeDelete.Prescricao);

        router.post("/delete/:crnNutri/registro/:idPacientes/evolucao/:idEvolucao", homeDelete.Evolucao);

        return router
    }
}