import client from './client'

const defaultTSYM = 'USD'

export const fetchCryptocurrencies = (options = {}) => {
  let url = `/data/top/mktcapfull?tsym=${options.tsym || defaultTSYM}`
  options.page && (url += `&page=${options.page}`)
  options.sign && (url += `&page=${options.sign}`)
  options.limit && (url += `&limit=${options.limit}`)
  return client.get(url).then(response => response.data)
}

export const refreshCryptocurrencies = (total = 10) => {
  const data = []
  const blockSize = 100
  return new Promise(resolve => {
    let k = Math.ceil(total / blockSize)
    let n = k
    while (k--) {
      (async page => {
        fetchCryptocurrencies({
          page, tsym: defaultTSYM, limit: blockSize
        }).then(response => {
          data.push(...response['Data'])
          if (!--n) resolve(data)
        })
      })(k)
    }
  })
}
