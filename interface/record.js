async function getRecordsByTime(options) {
  let records = await app.model.Record.findAll({
    limit: options.limit || 50,
    offset: options.offset || 0,
    sort: { timestamp: -1 }
  })
  return { records: records }
}
//查询所有交易记录
app.route.get('/records', async (req) => {
  let query = req.query
  if (!query.sortBy) {
    query.sortBy = 'timestamp'
  }
  let key = ['records', query.sortBy, query.limit, query.offset].join('_')
  if (app.custom.cache.has(key)) {
    return app.custom.cache.get(key)
  }
  let res = null
  if (query.sortBy === 'timestamp') {
    res = await getRecordsByTime(query)
  } else {
    throw new Error('Sort field not supported')
  }
  let addresses = res.records.map((a) => a.authorId)
  let accounts = await app.model.Account.findAll({
    condition: {
      address: { $in: addresses }
    },
    fields: ['str1', 'address']
  })
  let accountMap = new Map
  for (let account of accounts) {
    accountMap.set(account.address, account)
  }
  for (let record of res.records) {
    let account = accountMap.get(record.authorId)
    if (account) {
      record.nickname = account.str1
    }
  }
  app.custom.cache.set(key, res)
  return res
})

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