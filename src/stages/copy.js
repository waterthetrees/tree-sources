import fs from 'fs';
import fse from 'fs-extra';
import { inspect } from 'util';
import axios from 'axios';

const dataNew = './data/raw/';
const dataOld = './data-old/';

/**
 * copyAllFiles
 * list all files in the directory
 * @param {string} dir
 * */
export const copyAllFiles = async (dir) => {
  const dataDir = dir || dataOld;
  try {
    const fileList = await fs.readdirSync(dataDir);
    fileList.forEach(fileName => copyFile(fileName, dataDir, dataNew));
  } catch (err) {
    console.error('copyAllFiles', err);
  }
}

/**
 * copyFile
 * copies all files in the directory to new directory
 * @param {string} fileName
 * @param {string} fromDir
 * @param {string} toDir
 * */
async function copyFile(fileName, fromDir, toDir) {
  try {
    const exists = await fse.pathExists(`${toDir}${fileName}`);
    if (exists) return;
    await fse.copy(`${fromDir}${fileName}`, `${toDir}${fileName}`);
    console.log(`success copying from ${fromDir}${fileName} to ${toDir}${fileName}`);
  } catch (err) {
    console.error('copyFiles', err);
  }
}

/**
 * getOldData
 * @param {object} url - url
 * @param {string} basePath - basePath
 * @returns {Promise}
 * */
export const getOldData = async (basePath) => {
  const options = {
    'method': 'GET',
    'url': 'https://blog.waterthetrees.com/wp-content/data-old.tar.gzip',
    'headers': {
      // 'Accept': 'gzip',
      // 'Accept-Encoding': 'gzip',
      // 'responseType': 'stream',
      responseType: 'buffer',
      // "Content-Disposition": "attachment;filename=$gz",
      // 'Content-Type': 'application/x-gzip',
      // 'content-Type': 'application/octet-stream',
      // 'content-Length': '1280137728',
    },
  }
  const writeToFile = fs.createWriteStream(`${basePath}/data-old.tar.gzip`);
  try {
    const { data, headers } = await fetch(options.url, options);
    const contentLength = await headers['content-length'];
    console.log(await headers, 'headers');
    console.log(await data, 'data');
    // data.pipe(writeToFile);
    // data.on('data', (chunk) => {
    //     console.log(chunk)
    // })

    await data.pipe(fs.createWriteStream(`${basePath}/data-old.tar.gzip`))
    // writeToFile.write(await data);
    // writeToFile.end();
    return await data;
  } catch(error) {
    console.error('\n\n==> getOldData CATCH:', inspect(error, true, 3, true))
  }
}
const basePath = './data';
// getOldData(basePath) 

import got from 'got';
import gunzip from 'gunzip-maybe';

const SITEMAP_URL =
'https://blog.waterthetrees.com/wp-content/data-old.tar.gzip';

// fetch file
const { data, headers } = await fetch(SITEMAP_URL, {
    responseType: 'buffer',
  });
  
// unzip the buffered gzipped sitemap
const sitemap = (await gunzip(data)).toString();