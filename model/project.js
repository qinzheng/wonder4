module.exports = {
  name: 'project',
  fields: [
    {
      name: '_id',      //唯一标识
      type: 'Number',
      not_null: true,
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
      length: 100
    },
    {
      name: 'u_id',     //用款人
      type: 'Number',
      not_null: true
    }
  ]
}