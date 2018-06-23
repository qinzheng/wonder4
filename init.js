module.exports = async function () {
  console.log('enter dapp init')

  app.registerContract(1000, 'project.createProject')

  app.events.on('newBlock', (block) => {
    console.log('new block received', block.height)
  })
}