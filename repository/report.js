const MongoClient = require("mongodb").MongoClient
const url = "mongodb://localhost:27017"

const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

class ReportRepository {
  async sampleReport() {
    try {
      const options = { useUnifiedTopology: true, useNewUrlParser: true }
      const client = await MongoClient.connect(url, options)
      if (!client) return "no mongo client"

      const db = client.db("DATABASE_NAME") //database name
      let collection = db.collection("COLLECTION_NAME") // collection name
      let res = await collection.findOne({})
      client.close()
      return res
    } catch (err) {
      console.log(err)
    } finally {
      //if (client) client.close()
    }
  }

  async getReport() {
    try {
      let db_data = [
        {
          _id: ObjectId("5ba25eb7af8b1a2e684828a4"),
          _class: "com.wellpoint.renewalkit.batch.model.RenewalKitDocument",
          webGuId: "a9075a57-d1a1-482a-997b-33146af98cf3",
          hcId: "706T61120",
          mbrSeqNbr: "1",
          mcId: "600800556",
          srcSysId: "ISG",
          fstNme: "Darnell",
          lstNme: "Mirador",
          dob: "07/19/1977"
        },
        {
          _id: ObjectId("5ba25eb7af8b1a2e684828a4"),
          _class: "com.wellpoint.renewalkit.batch.model.RenewalKitDocument",
          webGuId: "a9075a57-d1a1-482a-997b-33146af98cf3",
          hcId: "706T61120",
          mbrSeqNbr: "2",
          mcId: "600800556",
          srcSysId: "ISG",
          fstNme: "Darnell",
          lstNme: "Mirador",
          dob: "07/19/1977"
        },
        {
          _id: ObjectId("5ba25eb7af8b1a2e684828a4"),
          _class: "com.wellpoint.renewalkit.batch.model.RenewalKitDocument",
          webGuId: "a9075a57-d1a1-482a-997b-33146af98cf3",
          hcId: "706T61120",
          mbrSeqNbr: "3",
          mcId: "600800556",
          srcSysId: "ISG",
          fstNme: "Darnell",
          lstNme: "Mirador",
          dob: "07/19/1977"
        },
        {
          _id: ObjectId("5ba25eb7af8b1a2e684828a4"),
          _class: "com.wellpoint.renewalkit.batch.model.RenewalKitDocument",
          webGuId: "a9075a57-d1a1-482a-997b-33146af98cf3",
          hcId: "706T61120",
          mbrSeqNbr: "4",
          mcId: "600800556",
          srcSysId: "ISG",
          fstNme: "Darnell",
          lstNme: "Mirador",
          dob: "07/19/1977"
        }
      ]
      return db_data
    } catch (err) {
      console.log(err)
    } finally {
      //if (client) client.close()
    }
  }

  async generateReport() {
    try {
      const options = { useUnifiedTopology: true, useNewUrlParser: true }
      const client = await MongoClient.connect(url, options)
      if (!client) return "no mongo client"

      const db = client.db("DATABASE_NAME") //database name
      let collection = db.collection("eDelivery") // collection name

      let result = await collection.aggregate(
        [
          {
            $match: {
              "msgs.crtDtTm": { $gt: "1559390399000" }
            }
          },
          { $unwind: "$msgs" },
          {
            $match: {
              "msgs.crtDtTm": { $gt: "1559390399000" }
            }
          },
          { $group: { _id: "$_id", msgs: { $push: "$msgs" }, docs: { $first: "$$ROOT" } } },
          { $addFields: { "docs.msgs": "$msgs" } },
          { $replaceRoot: { newRoot: "$docs" } },
          {
            $project: {
              webGuId: 1,
              fstNme: 1,
              lstNme: 1,
              dob: 1,
              mcId: 1,
              "msgs.uId": 1,
              "msgs.crtDtTm": 1,
              "msgs.email": 1,
              "msgs.tpe": 1,
              "msgs.stts": 1
            }
          }
        ],
        { allowDiskUse: true }
      )
      client.close()
      return result
    } catch (err) {
      console.log(err)
    } finally {
      //if (client) client.close()
    }
  }
}

exports.ReportRepository = ReportRepository
