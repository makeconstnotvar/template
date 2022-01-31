/** Проверяет вхождение subject в items */
function containsAny(subject: string | number, items: string[]) {
  for (const [_key, value] of Object.entries(items)) {
    if (typeof subject === 'string' && subject.toLowerCase().indexOf(String(value).toLowerCase()) > -1)
      return true;

    if (typeof subject === 'number' && !isNaN(+value) && subject == +value)
      return true;
  }

  return false;
}

function cleanText(text) {
  return text.trim().replace(/\s\s+/g, ' ')
}

export {containsAny, cleanText}