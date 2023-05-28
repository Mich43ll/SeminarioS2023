import express from 'express';
const router = express.Router();

router.get('/', (_req, res)=> {
    res.json({version:1, scope: 'projects'});
});

router.get('/echo/:msg', (req, res) =>{
    const{msg}= req.params;
    const{variable1= 'hola', variable2 ='mundo'} = req.query;
    res.json({msg, variable1, variable2});
});

router.post('/echo2', (req, res) =>{
    const{variable1= 'hola', variable2 ='mundo'} = req.body;
    res.json({variable1, variable2});
});

export default router;