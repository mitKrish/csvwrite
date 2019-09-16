const express = require("express")
const router = express.Router()

const { ActionManager } = require("../actions/action-manager")
const { CreateReport } = require("../actions/create-report")
const { GenerateReport } = require("../actions/generate-report")

router.get("/create", function(req, res, next) {
  let action = new CreateReport()
  ActionManager.execute(action)
    .then(data => {
      res.status(200).send({ success: true, data: data })
    })
    .catch(error => {
      res.status(error.status || 400).send({ success: false, data: error.message })
    })
})

router.get("/generate", function(req, res, next) {
  let action = new GenerateReport()
  ActionManager.execute(action)
    .then(data => {
      res.status(200).send({ success: true, data: data })
    })
    .catch(error => {
      res.status(error.status || 400).send({ success: false, data: error.message })
    })
})

module.exports = router
