import axios from "axios";
import { useState } from "react";
import * as XLSX from "xlsx";


function App() {
  const [msg, setmsg] = useState("")
  const [status, setstatus] = useState(false)
  const [emaillist,setemaillist] = useState("")

  function handlemsg(event) {
    setmsg(event.target.value)
  }

  function handlefile(event) {
    const file = event.target.files[0]
    //console.log(file)
    // load file
    const reader = new FileReader()
    // onloaded file & read
    reader.onload = function (event) {
      const data = event.target.result
      // readable format
      const workbook = XLSX.read(data, { type: "binary" })
      //console.log(workbook)// sheetnames 1
      const sheetname = workbook.SheetNames[0]
      //console.log(sheetname) // Sheets[sheetname 1]
      const sheet = workbook.Sheets[sheetname]
      //console.log(sheet)
      const emaillist = XLSX.utils.sheet_to_json(sheet, { header: "A" })
      //console.log(emaillist)
      const totalemail = emaillist.map(function(item){return item.A})
      setemaillist(totalemail)
    }
    reader.readAsBinaryString(file)
  }

function send() {
  setstatus(true)
  axios.post("https://bulkmail-backend-nezp.onrender.com/sendmail", { msg: msg , emaillist:emaillist})
    .then(function (data) {
      if (data.data == true) {
        alert("Email sent Sucessfully")
        setstatus(false)
      }
      else {
        alert("Failed")
      }
    }
    )
}

return (
  <>
    <div className="bg-blue-950 text-white text-center">
      <h1 className="font-medium text-2xl py-5">BulkMail</h1>
    </div>
    <div className="bg-blue-800 text-white text-center">
      <h2 className="font-medium py-5">We can help your business with sending multiple emails at once</h2>
    </div>
    <div className="bg-blue-600 text-white text-center">
      <h2 className="font-medium py-5">Drag and Drop</h2>
    </div>
    <div className="bg-blue-400 text-black text-center py-5">
      <textarea onChange={handlemsg} value={msg} className="w-[80%] h-32 border border-black rounded-md px-2 py-2" placeholder="Enter the email text..."></textarea>
      <div>
        <input onChange={handlefile} className="border-4 border-dashed px-4 py-4 mt-5 mb-5" placeholder="Choose File" type="file" ></input>
      </div>
      <p>Total emails in the file:{emaillist.length}</p>
      <button onClick={send} className="bg-blue-950 text-white px-2 py-2 rounded-md font-medium mt-3 mb-1">{status ? "sending" : "send"}</button>
    </div>
    <div className="bg-blue-300 p-9"></div>
    <div className="bg-blue-200 p-8"></div>
  </>
);
}

export default App;
