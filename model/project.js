module.exports = {
  name: 'projects',
  fields: [
    {
      name: '_id',      //唯一标识
      type: 'String',
      not_null: true,
      length: 256,
      primary_key: true,
      index: true
    },
    {
      name: 'p_name',   //项目名称
      type: 'String',
      length: 100,
      not_null: true,
      index: true
    },
    {
      name: 'p_money',  //目标金额
      type: 'Number',
      not_null: true
    },
    {
      name: 'p_desc',   //项目描述
      type: 'String',
      not_null: true,
      length: 256
    },
    {
      name: 'author_id', //发起人
      type: 'String',
      not_null: true,
      length: 256
    },
    {
      name: 'p_image', //项目图片
      type: 'String',
      length: 512
    },
    {
      name: 'timestamp',
      type: 'Number',
      not_null: true
    }
  ]
}