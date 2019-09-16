const httperror = require("http-errors")
const { ReportRepository } = require("../repository/report")
const createCsvWriter = require("csv-writer").createObjectCsvWriter

class CreateReport {
  constructor() {}

  async execute() {
    try {
      let reportRepo = new ReportRepository()
      let dbdata = await reportRepo.getReport()
     
      const csvWriter = createCsvWriter({
        path: "file.csv",
        header: [
          { id: "_id", title: "ID" },
          { id: "_class", title: "CLASS" },
          { id: "webGuId", title: "webGuId" },
          { id: "hcId", title: "hcId" },
          { id: "mbrSeqNbr", title: "mbrSeqNbr" },
          { id: "srcSysId", title: "srcSysId" },
          { id: "fstNme", title: "fstNme" },
          { id: "lstNme", title: "lstNme" },
          { id: "dob", title: "dob" }
        ]
      })

      csvWriter.writeRecords(dbdata).then(() => {
        console.log("...Done")
      })

      return "Report has been created successfully"
    } catch (error) {
      throw error
    }
  }
}

exports.CreateReport = CreateReport
