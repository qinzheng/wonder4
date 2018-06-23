module.exports = {
  name: 'improves',
  fields: [
    {
      name: '_id',          //唯一标识
      type: 'String',
      not_null: true,
      primary_key: true,
      length: 256,
      index: true
    },
    {
      name: 'p_id',         //关联项目
      type: 'String',
      length: 256,
      not_null: true
    },
    {
      name: 'improver_id',   //证明人标识
      type: 'String',
      length: 256,
      not_null: true
    },
    {
      name: 'improve_msg',   //证明词
      type: 'String',
      length: 256,
      not_null: true
    },
    {
      name: 'timestamp',
      type: 'Number',
      not_null: true
    }
  ]
}