import type { NextApiRequest, NextApiResponse } from 'next'
import formdata from '../middleware/formdata'
import nextConnect from 'next-connect'
import { NFTStorage, File, Blob } from 'nft.storage'

import * as fs from 'fs'


const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY;
if (!NFT_STORAGE_API_KEY) {
  throw new Error('NFT Storage API Key not found');
}
const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })


const handler = nextConnect()
handler.use(formdata)


async function handleNFTStorage(image: Buffer, filename: string, contentType: string, name: string, description: string) {
  const imageFile = new File([ image ], filename, { type: contentType })
  const metadata = await client.store({
    name,
    description,
    image: imageFile
  });
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

  const file = req.files.file[0]
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