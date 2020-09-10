import * as express from 'express';
import { personaSchema } from './../schemas/persona';
import { resolve } from 'path';

const router = express.Router();

router.get('/persona', (req, res, next) => {
  console.log('Viene del get');
  console.log('entra a persona');
  personaSchema.find((err, persona) =>{
    if(err) return;
    console.log('pepe: ', persona);
    res.send(persona);
  // })
    // personaSchema.find(function(err, persona) {
        // if (err) return;

        // res.send(persona);

    // });

    // getPersona()
    // .then((persona) => {
    //   res.json(persona);
    // })
    // .then((persona) => {
    //   res.json(persona);
    // })
    // .then((persona) => {
    //   res.json(persona);
    // })
    // .then((persona) => {
    //   res.json(persona);
    // })
    // .catch(err => {
    //   console.log('Error: ', err);
    });
});

//GET PERSONA
function getPersona(){
  return new Promise ((resolve, reject) => {
    let persona = personaSchema.find({ nombre : 'Leo'}).exec();
    if (persona) {
      resolve(persona);
    } else{
      reject(console.log('No se encontró persona'));
    }
  });

};

//POST PERSONA
router.post('/persona', (req, res) => {
  console.log('Viene persona POST: ', req.body);
  const persona = new personaSchema(req.body);
  persona.save(function(err, persona){
    if (err) {
      return err;
    }
    res.json(persona);
  });
});

//PUT PERSONA
router.put('/persona/:_id', (req, res, next) => {

  //console.log('Viene del PUT: ', req.body);
  personaSchema.findByIdAndUpdate(req.params._id, req.body, { new : true}, (err, persona) => {
    if (err){
      return err;
    }
    //console.log("Persona nueva: ", persona);
    return res.send(persona);
  });
});

//DELETE PERSONA
router.delete('/persona/:_id', (req, res, next) => {
  console.log('Viene del DELETE');
  personaSchema.findByIdAndRemove(req.params._id, (err, persona) => {
    if (err) {
      console.log('Error: ', err);
    }
    console.log('Persona eliminada: ', persona);
  });
});
export = router;