const axios = require('axios')

async function completeTask() {
  try {
    const task =  await axios.get('https://interview.adpeai.com/api/v1/get-task')
    const taskData = task.data

    const operationTable = {
      addition : taskData.left + taskData.right,
      subtraction: taskData.left - taskData.right,
      multiplication: taskData.left * taskData.right,
      division: taskData.left / taskData.right,
      remainder: taskData.left % taskData.right
    }

    const response = await axios.post('https://interview.adpeai.com/api/v1/submit-task', {
      id: taskData.id,
      result: operationTable[taskData.operation]
    })

    console.log(`Operation: ${taskData.operation}`)
    console.log(`Result: ${operationTable[taskData.operation]}`)
    console.log(`Status code ${response.status}: ${response.data}`)
  }
  catch(err) {
    console.log(`Error code ${err.response.status}: ${err.response.data}`)
  }
}


console.log(completeTask())
