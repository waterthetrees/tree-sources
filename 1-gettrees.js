const fs = require('fs');
const download = require('download');
const childProcess = require('child_process');
const { inspect } = require('util');
const { info, error, debug } = require('./logger');
const sources = require('./sources');
const { extensionForSource } = require('./utils');
const {insertCity, updateCity }= require('./models-area');
const featureFlag = { longError: false };
const dataPath = 'data';
const unzipPath = `${dataPath}/unzip`;

function unzipper(filename, source) {
  debug(`Unzipping: ${filename}`);
  try {
    childProcess.execSync(
      `unzip -d ${process.cwd()}${unzipPath}/${source.id} "${dataPath}/${filename}"`,
      { stdio: 'inherit' },
    );
    debug(`Unzipped: ${filename}`);
    return filename;
  } catch (err) {
    error(`CATCH unzipping ${filename}: ${err}`);
    return false;
  }
}

// function removeFile(filename, err) {
// //   error(`${err} file not saved`);
// //   childProcess.execSync(`mv "${filename}" "${filename}.bad"`);
//   unlink(`${dataPath}/${filename}`);
//   return filename;
// }
saveToDb(filename, source, index, sourceLength) {
  const stringCondition = ` WHERE id_city = ${id_city} AND city = ${city} 
    RETURNING id_tree AS "idTree", common, health, notes`;

}

async function downloader(filename, source, url, index, sourceLength) {
  debug(`Downloading: ${filename}`);
  try {
    const data = await download(url);
    // fs.writeFileSync(filename, data);
    // fs.writeFile(filename, data, 'utf8', (err) => ((err)
    //   ? removeFile(filename, err)
    //   : debug(`${filename} saved`)));

    const fileWritten = await fs.writeFile(`${dataPath}/${filename}`, data,
      'utf8', (err) => {
        if (err) {
          error(`${err} file not saved`);
          return false;
        }
        return filename;
      });

    if (!fileWritten) return false;
    info(`${fileWritten} ${filename} saved`);
    const savedToDb = await saveToDb(filename, source, index, sourceLength);
    // const file = await fs.readFile(`${dataPath}/${filename}`, 'utf8');
    return fileWritten;
  } catch (err) {
    if (featureFlag.longError) {
      error(`${index}/${sourceLength} CATCH ${err} ${url} ${source.id}
        location: ${source.short}, ${source.country} 
        info: ${source.info}
        url: `);
    } else {
      error(`${index}/${sourceLength} CATCH ${err} ${source.id}`);
    }
    // removeFile(filename, err);
    return false;
  }
}

function makeDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return dir;
}

function iterateDirectories(dirs) {
  dirs.forEach(makeDirectory);
  return dirs;
}

// async function iterateSources() {
//   try {
//     const sourceLength = sources.length;
//     info(`${sourceLength} sources`);
//     const badArray = [];
//     sources.forEach(async (source, index) => {
//       const url = source.download;
//       const extension = extensionForSource(source);
//       const filename = `${source.id}.${extension}`;
//       if (fs.existsSync(`${dataPath}/${filename}`)) {
//         info(`${index}/${sourceLength} ${url} downloaded already`);
//         return { ...source, downloaded: true };
//       }
//       const downloaded = await downloader(filename, source, url);
//       if (await downloaded) {
//         info(`${index}/${sourceLength} ${url} downloaded now`);
//         if (downloaded && extension === 'zip') unzipper(filename, source);
//         return { ...source, downloaded: true };
//       }
//       badArray.push(source);
//       error(`${index}/${sourceLength} ${url} download fail`);
//       return { ...source, downloaded: false };
//     });
//     info(`badArray : ${badArray.length}`);
//     // if (await sourcesDone) return badArray;
//     return badArray;
//   } catch (err) {
//     error(`CATCH ${err}`);
//     return err;
//   }
// }

// eslint-disable-next-line consistent-return
async function iterateSources2() {
  const functionNAme = 'iterateSources2';
  try {
    const badUrls = [];
    const goodUrls = [];
    const count = 0;
    const sourceLength = sources.length;

    // eslint-disable-next-line no-restricted-syntax
    for await (const [index, source] of sources.entries()) {
      const url = source.download;
      const extension = extensionForSource(source);
      const filename = `${source.id}.${extension}`;

      if (fs.existsSync(`${dataPath}/${filename}`)) {
        info(`${index}/${sourceLength} DL pre ${url} ${source.id}`);
        goodUrls.push({ ...source, downloaded: true });
      } else {
        const downloaded = await downloader(filename, source, url, index, sourceLength);
        if (await downloaded) {
          info(`${index}/${sourceLength} DL now ${url} ${source.id}`);
          if (downloaded && extension === 'zip') unzipper(filename, source);
          goodUrls.push({ ...source, downloaded: true });
        }
        if (!downloaded) {
          badUrls.push({ ...source, downloaded: false });
          error(`${index}/${sourceLength} DL fail ${url} ${source.id}`);
        }
      }
    }
    if (count >= sourceLength) {
      return { badUrls, goodUrls };
    }
  } catch (err) {
    error(`CATCH ${inspect(err, false, 2, true)} ${functionNAme}`);
    return err;
  }
}

async function start() {
  try {
    await iterateDirectories([dataPath, unzipPath]);

    const badArray = await iterateSources2();
    info(`badArray : ${inspect(await badArray, true, 5, true)}`);
    if (await badArray) setTimeout(() => process.exit(1), 30000);
  } catch (e) {
    error(`CATCH ${e}`);
  }
}

start();
process.on('exit', (code) => info(`Exiting with code ${code}\n`));
