
import React from 'react'

const TotalInterestAmount = (principleAmount,roi, timeDiff ) => {
  console.log("sdfsdf",principleAmount,roi, timeDiff)
  return principleAmount * (1 + roi / 100 * Math.floor(timeDiff )/365) - principleAmount
// return 0
}

export default TotalInterestAmount