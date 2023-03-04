export function checkMandatoryField(fieldArr, dataArr){
  const missingFields = []
  const isAllFieldExists = fieldArr.some((val)=>{
    if(dataArr.indexOf(val) === -1){
      missingFields.push(val)
    }
    return dataArr.indexOf(val) === -1
  })

  return {missingFields, isAllFieldExists}
}