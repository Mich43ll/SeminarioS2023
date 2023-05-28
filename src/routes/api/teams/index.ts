import express from 'express';
const router = express.Router();
import {
    createTeam,
    getTeam,
    getTeams,
    updateTeam,
    deleteTeam
} from '@libs/teams/teams'

router.get('/all', async (_req, res) => {
  try {
    const teams = await getTeams();
    return res.json(teams);
  } catch (ex: any) {
    return res.status(500).json({ error: ex.message });
  }
});

router.get('/byid/:id',async (req,res) => {
  try{
    const { id =''} = req.params;
    const team = await getTeam(id);
    return res.json(team);
  }
  catch(ex:any){
    return res.status(500).json({error: ex?.message});
  }
})

router.post('/new', async (req, res) => {
  try {
    const { name = '', description = '', isActive = false } = req.body;
    const newTeam = { name, description, isActive: isActive && true };
    const createdTeam = await createTeam(newTeam);
    return res.json(createdTeam);
  } catch (ex: any) {
    return res.status(500).json({ error: ex.message });
  }
});

router.put('/upd/:id', async (req, res) => {
  try {
    const { id = '' } = req.params;
    const { name = '', description = '', isActive = false } = req.body;
    const updatedTeam = await updateTeam(id, {
      name,
      description,
      isActive: isActive && true,
    });
    return res.json(updatedTeam);
  } catch (ex: any) {
    return res.status(500).json({ error: ex.message });
  }
});

router.delete('/del/:id', async (req, res) => {
  try {
    const { id = '' } = req.params;
    const deletedTeam = await deleteTeam(id);
    return res.json({ deleted: deletedTeam, id });
  } catch (ex: any) {
    return res.status(500).json({ error: ex.message });
  }
});

export default router;
