const axios = require('axios')

async function completeTask() {
  try {
    //First call to get our task
    const task =  await axios.get('https://interview.adpeai.com/api/v1/get-task')
    const taskData = task.data

    //All operations are completed using this table as a reference
    const operationTable = {
      addition : taskData.left + taskData.right,
      subtraction: taskData.left - taskData.right,
      multiplication: taskData.left * taskData.right,
      division: taskData.left / taskData.right,
      remainder: taskData.left % taskData.right
    }
    //Second call to send our results
    const response = await axios.post('https://interview.adpeai.com/api/v1/submit-task', {
      id: taskData.id,
      result: operationTable[taskData.operation]
    })

    console.log(`Operation: ${taskData.operation}`)
    console.log(`Result: ${operationTable[taskData.operation]}`)
    console.log(`Status code ${response.status}: ${response.data}`)
  }
  catch(err) {
    //Any errors are logged to the console (error code & the associated message recieved from the endpoint)
    console.log(`Error code ${err.response.status}: ${err.response.data}`)
  }
}


console.log(completeTask())
