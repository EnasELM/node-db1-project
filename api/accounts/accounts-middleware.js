const db= require('../../data/db-config')
const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body
  if (name === undefined || budget === undefined)  {
    next({ status: 400, message: 'name and budget are required' })
  } else if (typeof name !== 'string'){
    next({ status: 400, message: 'name of account must be a string' })
  } else if (name.trim().length < 3 || name.trim > 100){
    next({ status: 400, message: 'name of account must be between 3 and 100' })
  } else if(typeof budget !== 'number' || isNaN(budget)){
    next({ status: 400, message: 'budget of account must be a number' })
  } else if (budget <0 || budget > 1000000 ){
    next({ status: 400, message: 'budget of account is too large or too small' })
  } else {
     next()
  }
   
  }


exports.checkAccountNameUnique = async (req, res, next) => {
  try{
   const work = await db('accounts')
   .where('name', req.boq.name.trim())
   .first()
   if (work){
    next({ status: 400, message: 'that name is taken' })
   }else {
     next()
   }
  }catch(err){
        next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try{
    const account = await Accounts.getById(req.params.id)
    if(!account){
       console.log('account', account)
        next({ status: 404, message: 'account not found' })
    } else {
      req.account = account
      next()
    }
  } catch (error) {
    next(error)
  }

}
