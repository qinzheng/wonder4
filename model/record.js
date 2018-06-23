module.exports = {
  name: 'record',
  fields: [
    {
      name: '_id',      //唯一标识
      type: 'String',
      length: 256,
      not_null: true,
      index: true
    },
    {
      name: 'p_id',     //关联项目
      type: 'String',
      length: 256,
      not_null: true
    },
    {
      name: 'money',    //捐款金额
      type: 'Number',
      not_null: true
    },
    {
      name: 'd_id',     //捐款人
      type: 'String',
      length: 256,
      not_null: true
    }
  ]
}