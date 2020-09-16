function checkType(inputText) {
    console.log("::: Running checkType :::", inputText);
    if (inputText == '') {
        console.log('no input provided')
        return 0
    }
    else if (inputText.startsWith('www.') && inputText.endsWith('.com')) {
        console.log('type is url')
        return 'url'
    }
    else {
        console.log('type is txt')
        return 'txt'
    }
}

export { checkType }
