const mongoose = require('mongoose');
const UsersSchema = require('./users-schema');

class DB {
    constructor(){
        mongoose.connect('mongodb://localhost:27017/usersdb', {useNewUrlParser: true});
        this.connection = mongoose.connection;
        this.UsersModel = mongoose.model('User', UsersSchema);
    }

    async getUsersSorted(sortBy){
        return await this.UsersModel.find({}).sort({[sortBy]: 'asc'})
    }

    async getUsersLimit(limit){
        return await this.UsersModel.find({})
        .skip(0)
        .limit(parseInt(limit));
    }

    async getUsersPagination(page){
        if(page < 1)
            return "Page number must be positive number";
        return await this.UsersModel.find({})
            .skip((page - 1) * 2)
            .limit(2);
    }

    async getUsersByMultipleCriteria(obj){
        let data;
        if (obj.search && obj.sortBy && obj.limit){
            data = await this.UsersModel.find()
                .or([{name: obj.search}, {email: obj.search}])
                .sort({[obj.sortBy]: 'asc'})
                .skip(0)
                .limit(parseInt(obj.limit));
        }
        else {
            if(!obj.search && !obj.sortBy && !obj.limit)
                return "No users for such criteria";
            if(!obj.search){
                data = await this.UsersModel.find({})
                    .sort({[obj.sortBy]: 'asc'})
                    .skip(0)
                    .limit(parseInt(obj.limit));
    
            }
            else if(!obj.sortBy){
                data = await this.UsersModel.find()
                    .or([{name: obj.search}, {email: obj.search}])
                    .skip(0)
                    .limit(parseInt(obj.limit));
            }
            else if(!obj.limit){
                data = await this.UsersModel.find()
                    .or([{name: obj.search}, {email: obj.search}])
                    .sort({[obj.sortBy]: 'asc'})
            }
        }
        return data;
    }

    async getAllUsers(){
        return await this.UsersModel.find({});
    }

    async getUsersBySearch(q){
        return await this.UsersModel.find().or([{name: q}, {email:q}]);
    }
}

module.exports = DB;