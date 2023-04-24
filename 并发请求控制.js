const requsetXhr = (urls, num) => {
  return new Promise((resolve) => {
    if (urls.length == 0) {
      resolve([])
      return
    }
    const res = []
    let index = 0, count = 0
    async function request () {
      if (index == urls.length) return
      const i = index
      const url = urls[index]
      index++
      try {
        const resp = await fetch(url)
        res[i] = resp
      } catch (err) {
        res[i] = err
      } finally {
        count++
        if (count == urls.length) {
          resolve(res)
        }
      }
      request()
    }
    const sum = Math.min(num, urls.length)
    for (let i = 0; i < sum; i++) {
      request()
    }
  })
}
const urls = []
for (let i = 1; i <= 20; i++) {
  urls.push(`https://jsonplaceholder.typicode.com/todos/${i}`)
}
requsetXhr(urls, 1).then(res => {
  console.log(res)
})