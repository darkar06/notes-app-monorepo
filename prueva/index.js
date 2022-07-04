require("dotenv").config()
require("./mongo")
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const express = require("express")
const app = express();
const logger = require("./logger")
const cors = require("cors");
const Note = require("./models/note.js")
const usersRouter = require("./routers/users")
const notesRouter = require("./routers/notes")
const {endpointNotFound, malformedId} = require("./errorHandlers.js")
const router = require("./login")

app.use(cors())
app.use(express.json())
app.use(logger)

Sentry.init({
    dsn: "https://1520c669fa50475da436d8ce14121630@o1185467.ingest.sentry.io/6304069",
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
  
  const transaction = Sentry.startTransaction({
    op: "test",
    name: "My First Test Transaction",
  });

  setTimeout(() => {
    try {
      foo();
    } catch (e) {
      Sentry.captureException(e);
    } finally {
      transaction.finish();
    }
  }, 99);

app.use(express.static("../myApp/build"))

app.use("/app", notesRouter)

app.use("/app/user",usersRouter)

app.use("/app/login",router)


app.use(malformedId)

app.use(endpointNotFound)

const port = process.env.PORT || 3002;
 const server = app.listen(port,()=>{
    console.log("server on port " + port)
})


module.exports = {app, server};