export function getLatestVersion(lang) {
  const langSafe = new Set(['el', 'en']).has(lang) ? lang : 'en';
  return fetchSafe(
    `http://covid-19.rise.org.cy/version/current_${langSafe}.json`,
    {},
  );
}
export function checkSymptoms(request, lang) {
  const langSafe = new Set(['el', 'en']).has(lang) ? lang : 'en';
  return fetchSafe(
    `http://coronatest.ucy.ac.cy/api/records/${langSafe}/store`,
    {
      method: 'POST',
      body: JSON.stringify(request),
    },
  );
}

function fetchSafe(url, options) {
  return fetch(url, options).then(r => {
    if (r.status >= 200 && r.status <= 299) {
      return r.json();
    }
    return r.json().then(payload => {
      throw payload;
    });
  });
}
