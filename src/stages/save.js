import { inspect } from 'util';
import pLimit from 'p-limit';

/**
 * saveSource
 * @param source
 * @returns
 */
export const saveSource = async (source) => {
  const { destinations, ...restSource } = source;
  const options = {
		method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(restSource)
  };
	try {
    const basePath = process.env.API_URL || 'http://localhost:3002';
    const url = `${basePath}/api/sources`;
		const response = await fetch(url, options);
    const body = await response.json();
		return body;
	} catch (error) {
		console.error('\n\n==> saveSource CATCH error:', inspect(error, true, 2, true));
		throw error;
	}
};

export const saveSources = async (list) => {
  const test = false; // set to true to test smaller list
  const listArray = (test) ? list.slice(0, 1) : list;
  const limit = pLimit(10);
  const promises = listArray.map((source) => limit(() => saveSource(source)));
  const results = await Promise.allSettled(promises);
  console.log('\n\n==> Finished saving', await results);
};
