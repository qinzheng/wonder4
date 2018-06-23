
module.exports = {
    createProject: function (name, money, desc, images) {
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
            author_id: this.trs.senderId,
            p_image: images
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

        app.sdb.lock('project.exist@' + pid)
        let exists = await app.model.Project.exists({ _id: pid})
        if (!exists) return '您要证明的项目不存在!'

        app.sdb.lock('project.improve@' + pid)
        exists = await app.model.Improve.exists({ p_id: pid, improver_id: senderId })
        if (exists) return '您已经为该项目证明过！'

        app.sdb.create('Improve', {
            _id: app.autoID.increment('improve_max_id'),
            p_id: pid,
            improver_id: senderId,
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

        app.sdb.lock('project.exist@' + pid)
        let exists = await app.model.Project.exists({ _id: pid})
        if (!exists) return '您要捐款的项目不存在!'

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