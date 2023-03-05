export function getParsedDateUrl(strDate: Date){
  var date = strDate
  var dd = date.getDate();
  var mm = date.getMonth() + 1; //January is 0!

  var ddString 
  var mmString
  var yyyy = date.getFullYear();
  
  if (dd < 10) {
    ddString = '0' + dd;
    console.log(dd)
  }else{
    ddString = dd.toString()
  }

  if (mm < 10) {
    mmString = '0' + mm;
  }else{
    mmString = mm.toString()
  }
  ;
  return ddString + "%5c%2c" + mmString + "%5c%2c" + yyyy;
}

export function getParsedDate(strDate: Date){
  var date = strDate
  var dd = date.getDate();
  var mm = date.getMonth() + 1; //January is 0!v

  var ddString 
  var mmString
  var yyyy = date.getFullYear();

  if (dd < 10) {
    ddString = '0' + dd;
  }else{
    ddString = dd.toString()
  }

  if (mm < 10) {
    mmString = '0' + mm;
  }else{
    mmString = mm.toString()
  }

  return ddString + "/" + mmString + "/" + yyyy;
}
