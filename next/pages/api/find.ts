// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type DataRes = {
  pageHtml: string
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
  if (!(req.method == 'GET')) { 
    res.status(405).json({ message: "Method not allowed"});
  }

  const { url } = req.query
  const externalUrl = url as string

  if (checkURL(externalUrl)) {
    try {
      const response = await fetch(externalUrl)
      const pageHtml = await response.text();
      // const pageStatus = response.status 
      res.status(200).send({pageHtml})
    }
    catch (e) {
      return res.status(500);
    }
  }
  return res.status(400);
}
