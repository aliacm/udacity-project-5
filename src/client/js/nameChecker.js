function getNumDaysOut(inputDate) {
    console.log("::: Running checkType :::", inputDate);
    // Check that date is in correct format
    const pattern = /^\d{2}-\d{2}-\d{4}$/
    if (inputDate.match(pattern) == null) {
        alert('Please format date correctly: MM-DD-YYYY')
        return
    }
    const mdy = inputDate.split("-")
    const month = mdy[0]-1 // Date() uses a 0-indexed month
    const day = mdy[1]
    const year = mdy[2]
    // Convert given date to Date object
    let travelDate = new Date(year, month, day)
    // Get current date with hours, mins, etc set to 0
    const todayDate = new Date()
    todayDate.setHours(0, 0, 0, 0)
    // Find how many days out the given date is
    const diffMilliseconds = travelDate - todayDate
    const diffDays = Math.round(diffMilliseconds/(1000*60*60*24))
    console.log(`diffDays: ${diffDays}`)
    if (diffDays < 0) {
        alert('Date must be in the future')
        return
    }
    else if (diffDays > 16) {
        alert('Date cannot be more than 16 days in the future')
        return
    }
    console.log(`date diff: ${diffDays}`)
    return diffDays

}

export { getNumDaysOut }
