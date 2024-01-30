document.addEventListener('DOMContentLoaded', () => {
  let cyrillicPattern = /^[а-яА-Я\s\-]+$/
  const isValidKey = (key) => {
    return key === 'Backspace' ||
      key === 'Enter' ||
      key === 'Tab' ||
      key.startsWith('Arrow') ||
      key === 'Delete'
  }

  const validateInput = (str) => {
    let trimmedValue = str.trim();

    // Replace consecutive whitespace characters with a single space
    let replacedSpaces = trimmedValue.replace(/\s+/g, ' ');

    // Replace consecutive hyphens with a single hyphen
    let replacedHyphens = replacedSpaces.replace(/-+/g, '-');

    // Capitalize the first letter and convert the rest to lowercase
    let validatedValue = replacedHyphens.charAt(0).toUpperCase() + replacedHyphens.slice(1).toLowerCase();

    return validatedValue;
  }


  window.addEventListener('keydown', event => {


    const firstName = document.querySelector('.first_name')
    const lastName = document.querySelector('.last_name')

    const inputs = [firstName, lastName]
    inputs.forEach(input => {

      let currentText = ''

      // check if current key accords to pattern,then allows it to be input in field, else prevent this.
      if (isValidKey(event.key) || cyrillicPattern.test(event.key)) {
        if (event.key === 'Backspace') {
          currentText = currentText.slice(0, -1)
        }
        if (!isValidKey(event.key)) {
          currentText = currentText.concat('', event.key)
        }
        // console.log('currentText:', currentText)
      } else {
        event.preventDefault()
      }

      input.addEventListener('blur', event => {
        console.log('1-', currentText)
        currentText = validateInput(currentText)
        console.log('2-', currentText)

      })
    })
  }, true)


})
