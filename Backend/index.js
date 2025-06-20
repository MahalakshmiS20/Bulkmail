const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

app.use(cors({
  origin: "https://bulkmail-lag6.onrender.com",
  methods: ["GET", "POST"]
}))
app.use(express.json())

mongoose.connect("mongodb+srv://mahalakshmisenthil208:123@cluster0.kyhtehy.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => { console.log("DB connnected") })
    .catch((error) => { console.log(error) })

const credential = mongoose.model("credential", {}, "bulkmail")

const nodemailer = require("nodemailer");

app.post("/sendemail", function (req, res) {
    var msg = req.body.msg
    var emaillist = req.body.emaillist
    credential.find().then((data) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: data[0].toJSON().user,
            pass: data[0].toJSON().pass,
        }
    });
    new Promise(async function (resolve, reject) {
        try {
            for (var i = 0; i < emaillist.length; i++) {
                await transporter.sendMail(
                    {
                        from: "mahalakshmisenthil208@gmail.com",
                        to: emaillist[i],
                        subject: "A msg from Bulk mail app",
                        text: msg
                    }
                )}
            resolve("sucess")
            }
        catch(error){
            reject("failure")
        }
    }).then(()=>{res.send(true)})
      .catch(()=>{res.send(false)})

    }).catch((error) => { console.log(error) })
})

app.listen("5000", function () {
    console.log("server started")
})
