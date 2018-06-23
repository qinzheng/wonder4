const IntervalCache = require('./lib/interval-cache')

module.exports = async function () {
  console.log('enter dapp init')

  app.registerContract(1000, 'project.createProject')
  app.registerContract(1001, 'project.createImprove')
  app.registerContract(1002, 'project.createRecord')

  app.events.on('newBlock', (block) => {
    console.log('new block received', block.height)
  })

  app.custom.cache = new IntervalCache(10 * 1000)
}