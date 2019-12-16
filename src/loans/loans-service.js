const LoansService = {
    getAllLoans(knex) {
        return knex.select('*').from('notaloan_loans')
      },
    
      insertLoan(knex, newLoan) {
        return knex
          .insert(newLoan)
          .into('notaloan_loans')
          .returning('*')
          .then(rows => {
            return rows[0]
          })
      },
    
      getById(knex, id) {
        return knex
          .from('notaloan_loans')
          .select('*')
          .where('id', id)
          .first()
      },
    
      deleteLoan(knex, id) {
        return knex('notaloan_loans')
          .where({ id })
          .delete()
      },
    
      updateLoan(knex, id, newLoanFields) {
        return knex('notaloan_loans')
          .where({ id })
          .update(newLoanFields)
      },
    }
    
    module.exports = LoansService