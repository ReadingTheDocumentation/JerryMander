let app =  SpreadsheetApp;
let input = app.getActiveSpreadsheet();
let activesheet = input.getActiveSheet();


function gerryMander() {
  input = app.getActiveSpreadsheet();
  activesheet = input.getActiveSheet();
  let lastrow = activesheet.getLastRow () -1 ;
  activesheet.getRange(3,5,lastrow,12).clearContent()
  let total = 0
  let clients = activesheet.getRange("A3").getValues()[0][0];
  

  let populationSize = activesheet.getRange(3,3, lastrow,1 ).getValues();
  let zipCodes = activesheet.getRange(3,2, lastrow,1 ).getValues();
  
  for (let i = 0; i < populationSize.length; i++){
    total += populationSize[i][0]
    if (!populationSize[i][0]){
      populationSize.splice(i,1)
      zipCodes.splice(i,1)
    }
  }

  let fractionOfPopTotal = Math.floor(total / clients)
  let currentClientZipRow = 5
  let currentClientPopRow = 6
  let currentClientZipCell = 3
  let currentClientPopCell = 3
  let currentClientPopCount = 0

//iterate once for each client
  for (let i = 1; i <= clients; i++){
   
    while (currentClientPopCount <= fractionOfPopTotal && populationSize.length >0){
      let index = Math.floor(Math.random() * populationSize.length)
      //add total to count
      currentClientPopCount += populationSize[index][0]

      //add pop/zip to correct column
      activesheet.getRange(currentClientZipCell, currentClientZipRow,).setValue(zipCodes[index][0])
      currentClientZipCell++
      activesheet.getRange(currentClientPopCell,currentClientPopRow).setValue(populationSize[index][0])
      currentClientPopCell++

    //delete value from population size and zip list
      zipCodes.splice(index,1)
      populationSize.splice(index,1)
    }

    currentClientPopCount = 0
    currentClientPopCell = 3
    currentClientZipCell = 3
    currentClientZipRow +=2
    currentClientPopRow +=2
  }
}





