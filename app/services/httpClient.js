export function getLatestVersion (lang) {
  const langSafe = new Set(['el', 'en']).has(lang) ? lang : 'en'
  return fetchSafe(`http://covid-19.rise.org.cy/version/current_${langSafe}.json`, {})
}
export function getLatestStatistics () {
  return fetch('https://api.airtable.com/v0/app64wWREXGzJWXNJ/Table%201?view=Grid%20view', {
    headers: new Headers({
      Authorization: 'Bearer key8fwuOvrtxO9J7J'
    })
  })
}
export function checkSymptoms (request, lang) {
  let langSafe = new Set(['el', 'en']).has(lang) ? lang : 'en'
  // Endpoint accepts gr, not el
  langSafe = langSafe === 'el' ? 'gr' : langSafe
  return fetchSafe(`http://coronatest.ucy.ac.cy/api/records/${langSafe}/store`, {
    method: 'POST',
    body: JSON.stringify(request)
  })
}

function fetchSafe (url, options) {
  return fetch(url, options).then(r => {
    if (r.status >= 200 && r.status <= 299) {
      return r.json()
    }
    return r.json().then(payload => {
      throw payload
    })
  })
}
