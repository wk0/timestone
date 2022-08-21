import nextConnect from 'next-connect'
import multiparty from 'multiparty'
import type { NextApiRequest, NextApiResponse } from 'next'

const middleware = nextConnect()

middleware.use(async (req: any, res: NextApiResponse, next: any) => {
  const form = new multiparty.Form()

  await form.parse(req, function (err, fields, files) {
    req.body = fields
    req.files = files
    next()
  })
})

export default middleware