import { useEffect, useState } from "react"

const checkURL = (input: string)=> {
  const url = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!url.test(input);
}

export const useIsValidURL = (url: string) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (url) {
      const _valid = checkURL(url);
      setIsValid(_valid);
    }
  }, [url])

  return isValid;
}