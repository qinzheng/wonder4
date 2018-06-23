//查询单个交易记录
app.route.get('/records/:id', async (req) => {
  let id = req.params.id
  let key = 'record' + id
  if (app.custom.cache.has(key)) {
    return app.custom.cache.get(key)
  }
  let record = await app.model.Record.findOne({
    condition: { id: id }
  })
  if (!record) throw new Error('Record not found')
  let account = await app.model.Account.findOne({
    condition: { address: article.authorId }
  })
  if (account) {
    record.nickname = account.str1
  }
  let result = { record: record }
  app.custom.cache.set(key, result)
  return result
})