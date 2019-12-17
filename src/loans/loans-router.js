const path = require('path')
const express = require('express')
const xss = require('xss')
const LoansService = require('./loans-service')

const loansRouter = express.Router()
const jsonParser = express.json()

const serializeLoan = loan => ({
  id: loan.id,
  title: xss(loan.title),
  balance: xss(loan.balance),
  interest_rate: xss(loan.interest_rate),
  term: xss(loan.term),
  date_created: loan.date_created,
  user_id: loan.user_id
})

loansRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    CommentsService.getAllComments(knexInstance)
      .then(comments => {
        res.json(loans.map(serializeLoan))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { title, balance, interest_rate, term, date_created, user_id } = req.body
    const newLoan = { title, balance, interest_rate, term, user_id }

    for (const [key, value] of Object.entries(newLoan))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    newLoan.date_commented = date_commented;

    LoansService.insertLoan(
      req.app.get('db'),
      newLoan
    )
      .then(loan => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${loan.id}`))
          .json(serializeLoan(loan))
      })
      .catch(next)
  })

loansRouter
  .route('/:comment_id')
  .all((req, res, next) => {
    LoansService.getById(
      req.app.get('db'),
      req.params.loan_id
    )
      .then(loan => {
        if (!loan) {
          return res.status(404).json({
            error: { message: `Loan doesn't exist` }
          })
        }
        res.loan = loan
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeLoan(res.loan))
  })
  .delete((req, res, next) => {
    LoansService.deleteLoan(
      req.app.get('db'),
      req.params.loan_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { text, date_commented } = req.body
    const loanToUpdate = { text, date_commented }

    const numberOfValues = Object.values(loanToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
        //   message: `Request body must contain either 'text' or 'date_commented'`
        }
      })

    LoansService.updateLoan(
      req.app.get('db'),
      req.params.comment_id,
      loanToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = loansRouter

