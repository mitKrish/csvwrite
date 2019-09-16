const httperror = require("http-errors")
const { ReportRepository } = require("../repository/report")
const createCsvWriter = require("csv-writer").createObjectCsvWriter

class GenerateReport {
  constructor() {}

  async execute() {
    try {
      let reportRepo = new ReportRepository()
      let dbdata = await reportRepo.generateReport()

      let final_data = []
      for (let item of dbdata) {
        if (item != null) {
          var read = 0
          var unread = 0
          var inbox = 0
          var starred = 0
          item.read = "0"
          item.unread = "0"
          item.inbox = "0"
          item.starred = "0"

          if (item.msgs != null) {
            var len = JSON.parse(item.msgs.length)
            console.log(len)
            for (var i = 0; i < len; i++) {
              if (item.msgs[i]["stts"] == "read") {
                read++
              } else if (item.msgs[i]["stts"] == "unread" || item.msgs[i]["stts"] == "Unread") {
                unread++
              } else if (item.msgs[i]["stts"] == "Inbox" || item.msgs[i]["stts"] == "INBOX") {
                inbox++
              } else if (item.msgs[i]["stts"] == "Starred") {
                starred++
              }

              item.read = read
              item.unread = unread
              item.inbox = inbox
              item.starred = starred
              item.count = item.read + item.unread + item.inbox + item.starred
            }
          }
        }
        final_data.push(item)
      }

      const csvWriter = createCsvWriter({
        path: "file.csv",
        header: [
          { id: "webGuId", title: "WebGuId" },
          { id: "fstNme", title: "FirstName" },
          { id: "lstNme", title: "LastName" },
          { id: "dob", title: "DOB" },
          { id: "mcId", title: "Mcid" },
          { id: "read", title: "Read" },
          { id: "unread", title: "UnRead" },
          { id: "starred", title: "Starred" },
          { id: "inbox", title: "INBOX" },
          { id: "count", title: "Count" }
        ]
      })

      csvWriter.writeRecords(final_data).then(() => {
        console.log("...Done")
      })

      return "Report has been created successfully"
    } catch (error) {
      throw error
    }
  }
}

exports.GenerateReport = GenerateReport
