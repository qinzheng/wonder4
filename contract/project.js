
module.exports = {
    createProject: function (name, money, desc) {
        if (!name) {
            return '名称不能为空！'
        }

        if (!money || money < 0) {
            return '额度不能为空！'
        }

        if (!desc) {
            return '描述不能为空'
        }

        app.sdb.create('Project', {
            _id: app.autoID.increment('project_max_id'),
            p_name: name,
            p_money: money,
            p_desc: desc,
            timestamp: this.trs.timestamp,
            author_id:this.trs.senderId
        })
    }
}