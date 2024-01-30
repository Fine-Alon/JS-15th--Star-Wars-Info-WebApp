document.addEventListener('DOMContentLoaded', () => {
  const CYRILLIC_PATTERN = /^[а-яА-Я\s\-]+$/
  let currentText = ''

  const isValidKey = (key) => {
    return key === 'Backspace' ||
      key === 'Enter' ||
      key === 'Tab' ||
      key.startsWith('Arrow') ||
      key === 'Delete'
  }

  const validateInput = (str) => {
    let trimmedValue = str.trim();
    trimmedValue = trimmedValue.replace(/^[-]+|[-]+$/, '')

    // Replace consecutive whitespace characters with a single space
    let replacedSpaces = trimmedValue.replace(/\s+/g, ' ');

    // Replace consecutive hyphens with a single hyphen
    let replacedHyphens = replacedSpaces.replace(/-+/g, '-');

    // Capitalize the first letter and convert the rest to lowercase
    let validatedValue = replacedHyphens.charAt(0).toUpperCase() + replacedHyphens.slice(1).toLowerCase();

    return validatedValue;
  }

  window.addEventListener('keydown', event => {

    // check if current key accords to pattern,then allows it to be input in field, else prevent this.
    if (isValidKey(event.key) || CYRILLIC_PATTERN.test(event.key)) {
      if (event.key === 'Backspace') {
        currentText = currentText.slice(0, -1)
      }
      if (!isValidKey(event.key)) {
        currentText = currentText.concat('', event.key)
      }

      // console.log('currentText:', currentText)
    } else event.preventDefault()

  }, true)

  const inputs = document.querySelectorAll('.js_input')
  inputs.forEach(input => {

    input.addEventListener('blur', event => {
      // get input under validate
      currentText = validateInput(input.value)

      //change input value to valid value
      event.target.value = currentText
      console.log(input.value)
      console.log(event.target.value)

      currentText = ''

    })
  })

  // form & submit
  const form = document.querySelector('form')
  form.addEventListener('submit', event => {
    event.preventDefault()
    const p = document.createElement('p')

    form.querySelectorAll('.js_input').forEach(input => {
      // concat name + surname
      p.textContent = p.textContent + ' ' + input.value

      // past a paragraph after form
      if (input.value){
        form.parentNode.insertBefore(p, form.nextSibling)
      }

      //   refresh input value
      input.value = ''
    })
  })

})
