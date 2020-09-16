async function handleSubmit(event) {
    console.log("::: Form Submitted :::")
    event.preventDefault()
    // Get text from input form.
    const inputText = document.getElementById('input').value
    console.log(inputText)
    // What kind of text did we get? Is it a URL or regular text?
    const inputType = Main.checkType(inputText) 
    // Show either full results or "no input provided"
    console.log(inputType)
    if (inputType == 0) {
        document.getElementById('noresults').style.display = 'block'
        document.getElementById('yesresults').style.display = 'none'
        return
    }
    else {
        document.getElementById('yesresults').style.display = 'block'
        document.getElementById('noresults').style.display = 'none'
    }
    // Post the text and type to /getfeels, and get back sentiment analysis.
    const response = await fetch('/getfeels', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({feels: inputText, type: inputType})
    })
    const feelsdata = await response.json()
    document.getElementById('score').innerHTML = `score: ${feelsdata.score_tag}`
    document.getElementById('agreement').innerHTML = `agreement: ${feelsdata.agreement}`
    document.getElementById('subjectivity').innerHTML = `subjectivity: ${feelsdata.subjectivity}`
    document.getElementById('confidence').innerHTML = `confidence: ${feelsdata.confidence}`
    document.getElementById('irony').innerHTML = `irony: ${feelsdata.irony}`
}

export { handleSubmit }
