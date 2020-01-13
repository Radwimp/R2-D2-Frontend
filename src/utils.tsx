const hardcodedAddress: string = '//192.168.0.104/';

async function fetchData(link: string, attr: string = link) {
  return await fetch(hardcodedAddress + link)
    .then(res => res.json())
    .then(res => res[attr]);
}

export { fetchData };
