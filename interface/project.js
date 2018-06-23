//查询所有项目
app.route.get('/projects', async (req) => {
  let query = req.query
  if (!query.sortBy) {
    query.sortBy = 'timestamp'
  }
  let key = ['projects', query.sortBy, query.limit, query.offset].join('_')
  if (app.custom.cache.has(key)) {
    return app.custom.cache.get(key)
  }
  let res = null
  if (query.sortBy === 'timestamp') {
    res = await getProjectsByTime(query)
  } else {
    throw new Error('Sort field not supported')
  }
  let addresses = res.projects.map((a) => a.authorId)
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
  for (let project of res.projects) {
    let account = accountMap.get(project.authorId)
    if (account) {
      project.nickname = account.str1
    }
  }
  app.custom.cache.set(key, res)
  return res
})

//按照id查询项目
app.route.get('/projects/:id', async (req) => {
  let id = req.params.id
  let key = 'project' + id
  if (app.custom.cache.has(key)) {
    return app.custom.cache.get(key)
  }
  let project = await app.model.Project.findOne({
    condition: { id: id }
  })
  if (!project) throw new Error('Project not found')

  //查询关联的证明
  let improves = await getImprovesById(id)
  //查询关联的记录
  let records = await getRecordsById(id)

  let account = await app.model.Account.findOne({
    condition: { address: article.authorId }
  })
  if (account) {
    project.nickname = account.str1
  }
  let result = { project: project }
  if (!improves) {
    result.improves = improves
  }
  if (!records) {
    result.records = records
  }
  app.custom.cache.set(key, result)
  return result
})

async function getProjectsByTime(options) {
  let projects = await app.model.Project.findAll({
    limit: options.limit || 50,
    offset: options.offset || 0,
    sort: { timestamp: -1 }
  })
  return { projects: projects }
}

async function getImprovesById(p_id) {
  let improves = await app.model.Improve.findAll({
    condition: [
      { p_id: p_id}
    ],
    limit: options.limit || 50,
    offset: options.offset || 0,
    sort: { timestamp: -1 }
  })
  return { improves: improves }
}

async function getRecordsById(p_id) {
  //捐款总人数
  let count = await app.model.Record.count()
  let records = await app.model.Record.findAll({
    condition: [
      { p_id: p_id}
    ],
    limit: options.limit || 50,
    offset: options.offset || 0,
    sort: { timestamp: -1 }
  })
  //捐款总金额
  let moneySum = 0
  if (records) {
    for (let record of records) {
      moneySum += record.money
    }
  }
  return { count: count, moneySum: moneySum, records: records }
}