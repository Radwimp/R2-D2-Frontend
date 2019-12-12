const hardcodedAddress: string = '//192.168.0.102/';

async function fetchData(link: string, attr: string = link, callback?: (val: any) => void) {
  return await fetch(hardcodedAddress + link)
    .then(res => res.json())
    .then(res => {
      callback && callback(res[attr]);
      return res[attr];
    });
}

export { fetchData };
