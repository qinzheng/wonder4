
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
            author_id: this.trs.senderId
        })
    },

    createImprove: async function (pid, msg) {
        if (!pid) {
            return '项目id不能为空!'
        }

        if (!msg) {
            return '证明词不能为空!'
        }
        let senderId = this.trs.senderId

        app.sdb.lock('project.improve@' + pid)

        let exists = await app.model.Improve.exists({ p_id: pid, improve_id: senderId })
        if (exists) return '您已经为该项目证明过！'

        app.sdb.create('Improve', {
            _id: app.autoID.increment('improve_max_id'),
            p_id: pid,
            improve_id: senderId,
            improve_msg: msg,
            timestamp: this.trs.timestamp
        })
    },

    createRecord: async function (pid, money) {
        if (!pid) {
            return '项目id不能为空!'
        }

        if (!money) {
            return '捐款金额不能为空!'
        }

        money = parseFloat(money)
        let senderId = this.trs.senderId

        app.sdb.create('Record', {
            _id: app.autoID.increment('record_max_id'),
            p_id: pid,
            money: money,
            d_id: senderId,
            timestamp: this.trs.timestamp
        })
    }

}