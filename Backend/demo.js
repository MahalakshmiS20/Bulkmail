const fileInput = document.getElementById('fileInput')

fileInput.addEventListener("change", function (event) {
    //selection of file
    const file = event.target.files[0]

    // load file

    const reader = new FileReader()

    // onloaded file & read

    reader.onload = function(event) {
        const data = event.target.result
        // readable format
        const workbook = XLSX.read(data, { type: "binary" })
        //console.log(workbook)// sheetnames 1
        const sheetname = workbook.SheetNames[0]
        //console.log(sheetname) // Sheets[sheetname 1]
        const sheet = workbook.Sheets[sheetname]
        //console.log(sheet)
        const emaillist = XLSX.utils.sheet_to_json(sheet,{header:"A"})
        console.log(emaillist)
    }


    reader.readAsBinaryString(file)
})