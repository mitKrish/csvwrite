let createError = require("http-errors")
let express = require("express")
let path = require("path")
let cookieParser = require("cookie-parser")

let reportRouter = require("./routes/report")

let app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/report", reportRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  console.log(JSON.stringify(err))
})

app.listen(5000, () => {
  console.log("Listening on Port 5000")
})

module.exports = app
