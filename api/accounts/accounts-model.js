const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts')
  .select('budget', 'name')
  .where('id', '=' , id).first()
}

const create = async account => {
  const [id] = await db('accounts').insert(account)
   
  return getById(id)
}

const updateById = async (id, account) => {
   await db('shippers')
  .update(account).where('id', id)
  return getById(id)
  
}

const deleteById = id => {
  const what =  db('accounts')
    .where('id', id).del()
    return what
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
