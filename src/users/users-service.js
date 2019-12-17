const UsersService = {
    getAllUsers(knex) {
        return knex.select('*').from('notaloan_users')
      },
    
      insertUser(knex, newUser) {
        return knex
          .insert(newUser)
          .into('notaloan_users')
          .returning('*')
          .then(rows => {
            return rows[0]
          })
      },
    
      getById(knex, id) {
        return knex
          .from('notaloan_users')
          .select('*')
          .where('id', id)
          .first()
      },
    
      deleteUser(knex, id) {
        return knex('notaloan_users')
          .where({ id })
          .delete()
      },
    
      updateUser(knex, id, newUserFields) {
        return knex('notaloan_users')
          .where({ id })
          .update(newUserFields)
      },
    }
    
    module.exports = UsersService