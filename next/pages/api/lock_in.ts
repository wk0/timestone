import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { NFTStorage, File, Blob } from 'nft.storage'
import multiparty from 'multiparty'

import * as fs from 'fs'


const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY;
if (!NFT_STORAGE_API_KEY) {
  throw new Error('NFT Storage API Key not found');
}
const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })


const middleware = nextConnect()

middleware.use(async (req: any, res: NextApiResponse, next: any) => {
  const form = new multiparty.Form()
  await form.parse(req, function (err, fields, files) {
    req.body = fields
    req.files = files
    next()
  })
})


const handler = nextConnect()
handler.use(middleware)


async function handleNFTStorage(image: Buffer, filename: string, contentType: string, name: string, description: string) {
  const imageFile = new File([ image ], filename, { type: contentType })
  console.log(imageFile)
  const metadata = await client.store({
    name,
    description,
    image: imageFile
  });
  console.log(metadata)
  return metadata;
}
 

handler.post(async (req: any, res: NextApiResponse) => {
  console.log(req.body)
  console.log(req.files)

  const body = req.body;

  const name = body.name[0];
  const description = body.description[0];

  console.log(name)
  console.log(description)
  console.log('req files', req.files)

  const file = req.files.file[0]
  console.log('file', file)
  fs.readFile(file.path, async (err, data) => {

    const metadata = await handleNFTStorage(
      data,
      file.originalFilename,
      file.headers['content-type'],
      name,
      description
    );
    console.log(metadata)
    res.status(201).json({ metadata })
  });
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler