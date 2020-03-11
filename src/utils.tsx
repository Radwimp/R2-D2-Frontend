const hardcodedAddress: string = '//192.168.0.144/';

async function fetchData(link: string, attr: string = link) {
  return await fetch(hardcodedAddress + link)
    .then(res => res.json())
    .then(res => res[attr]);
}

async function post(link: string, body: object) {
  return await fetch(hardcodedAddress + link, {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

export { fetchData, post };
