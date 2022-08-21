// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Pageres from 'pageres';
import { readFileSync } from 'fs';
import path from 'path';
import datauri from 'datauri'
import { v4 as uuidv4 } from 'uuid';

type DataRes = {
  snapshot: string
  // pageStatus: number
}

type Error = {
  message: string
}


const checkURL = (input: string)=> {
  const url = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!url.test(input);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataRes | Error>
) {
  if (!(req.method == 'POST')) { 
    res.status(405).json({ message: "Method not allowed"});
  }

  const { url } = req.body
  console.log('url', url)
  const externalUrl = url as string

  const id = uuidv4();
  const write = path.join(__dirname, '/snapshots')
  console.log(write)
  if (checkURL(externalUrl)) {
    try {
      await new Pageres({
        delay: 1,
        //beforeScreenshot: async (page, browser) => {
        //}
      })
        .src(externalUrl, ['800x600'])
        .dest(path.join(__dirname, '/snapshots'))
        .run();

            
      const trimmedUrl = url.split('//')[1]
      const outputPath = path.join(__dirname, '/snapshots', `/${trimmedUrl}-800x600.png`);
      const uri = await datauri(outputPath);
      if (uri) {
        res.status(201).send({ snapshot: uri })
      }
      res.status(500);
    }
    catch (e) {
      return res.status(500);
    }
  }
  return res.status(400);
}
