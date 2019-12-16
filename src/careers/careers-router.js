const path = require('path')
const express = require('express')
const xss = require('xss')
const CareersService = require('./careers-service')

const careersRouter = express.Router()
const jsonParser = express.json()

const serializeCareer = comment => ({
//   id: comment.id,
//   text: xss(comment.text),
//   date_commented: comment.date_commented,
//   article_id: comment.article_id,
//   user_id: comment.user_id
})

careersRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    CommentsService.getAllComments(knexInstance)
      .then(comments => {
        res.json(careers.map(serializeCareer))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    // const { text, article_id, user_id, date_commented } = req.body
    // const newComment = { text, article_id, user_id }

    for (const [key, value] of Object.entries(newCareer))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    newCareer.date_commented = date_commented;

    CareersService.insertCareer(
      req.app.get('db'),
      newCareer
    )
      .then(career => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${career.id}`))
          .json(serializeCareer(career))
      })
      .catch(next)
  })

careersRouter
  .route('/:comment_id')
  .all((req, res, next) => {
    CareersService.getById(
      req.app.get('db'),
      req.params.career_id
    )
      .then(career => {
        if (!career) {
          return res.status(404).json({
            error: { message: `Career doesn't exist` }
          })
        }
        res.career = career
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeCareer(res.career))
  })
  .delete((req, res, next) => {
    CareersService.deleteCareer(
      req.app.get('db'),
      req.params.career_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { text, date_commented } = req.body
    const careerToUpdate = { text, date_commented }

    const numberOfValues = Object.values(careerToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
        //   message: `Request body must contain either 'text' or 'date_commented'`
        }
      })

    CareersService.updateCareer(
      req.app.get('db'),
      req.params.comment_id,
      careerToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = careersRouter

