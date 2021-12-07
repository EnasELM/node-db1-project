const router = require('express').Router()
const Accounts = require('./accounts-model')
const md = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Accounts.getAll()
  .then(accounts => {
    res.status(200).json(accounts);
    
  })
  .catch(error => {
    next(error);
  });
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {
  res.json(req.account)
})

router.post('/',
 md.checkAccountPayload,
 md.checkAccountNameUnique,
  async (req, res, next) => {
  try{
    const newAccount = await Accounts.create({
      name: req.body.name.trm(),
    budget: req.body.budget})
    res.status(201).json(newAccount)

   
  }catch(err){
    next(err)
  }
})

router.put('/:id',
md.checkAccountId,
md.checkAccountPayload,
 async (req, res, next) => {
 
   try{
    const updated = await Accounts.updateById(req.params.id, req.body)
    res.json(updated)
   }catch(err){
     next(err)
   }
});

router.delete('/:id',md.checkAccountId, async(req, res, next) => {
  try {
    const data = await Accounts.deleteById(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
 
    res.status(err.status || 500).json({
      message: ` ${err.message}`,
      stack: err.stack,
    });
  })


module.exports = router;
