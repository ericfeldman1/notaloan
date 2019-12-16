const CareersService = {
    getAllCareers(knex) {
        return knex.select('*').from('notaloan_careers')
      },
    
      insertCareer(knex, newCareer) {
        return knex
          .insert(newCareer)
          .into('notaloan_careers')
          .returning('*')
          .then(rows => {
            return rows[0]
          })
      },
    
      getById(knex, id) {
        return knex
          .from('notaloan_careers')
          .select('*')
          .where('id', id)
          .first()
      },
    
      deleteCareer(knex, id) {
        return knex('notaloan_careers')
          .where({ id })
          .delete()
      },
    
      updateCareer(knex, id, newCareerFields) {
        return knex('notaloan_careers')
          .where({ id })
          .update(newCareerFields)
      },
    }
    
    module.exports = CareersService