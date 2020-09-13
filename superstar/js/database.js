/**
 * 本地数据库的增、删、改、查操作
 **/
(function ($, database, global) {

	  const MY_DBLIST = 'MY_DBLIST'; // 数据库本身保留字

    // 初始化数据库状态， 包括数据库列表等
    database.init = function() {
      // 获取数据库列表
      let dbList = localStorage.getItem(MY_DBLIST);
      if (!dbList) { // 第一次运行， 不存在数据库列表
        localStorage.setItem(MY_DBLIST, '{}');
        dbList = {};
      }
      return dbList;
    }
    
    database.end = function(dbList) {
      // 操作完数据库的最后应该保存数据到本地
      localStorage.setItem(MY_DBLIST, JSON.stringify(dbList));
    }
    
    // 清空所有数据
    database.clear = function() {
      localStorage.setItem(MY_DBLIST, '');
    }
    
    // 保存当前db到dblist中
    database.saveDBListItem = function(dbList, db, dbName) {
      dbList[dbName] = db;
    }
    
    // 使用一个数据库，如果该数据库不存在则创建为新的数据库
    database.use = function(dbList, dbName) {
      let db = dbList[dbName];
      if (!db) {
        db = {
          _name: dbName
        }; // 空数据库
        database.saveDBListItem(dbList, db, dbName);
      }
      return db;
    }
    
    // 打印所有数据库名称
    database.showDbs = function(dbList) {
      for (let key in dbList) {
        console.log(dbList[key]._name);
      }
    }
    
    // 删除当前数据库
    database.dropDatabase = function(dbList, db) {
      if (db) {
        console.error('you should use db first');
        return;
      }
      delete dbList[db._name];
    }
    
    // 创建集合
    database.createCollection = function(db, name, options) {
      db[name] = {
        _name: name,
        _data: options
      };
    }
    
    // 获得集合
    database.getCollection = function(db, name) {
      return db[name];
    }
    
    // 删除集合
    database.drop = function(db, name) {
      if (!!db && !!db[name]) {
        delete db[name];
      }
    }
    
    // 插入数据
    database.insert = function(db, name, data) {
      if (!db[name]) database.createCollection(name); // 不存在集合时自动创建集合
      let id = uuid(20);
      if(!data._id) data._id = id;
      db[name]._data.push(data);
    }
    
    // 根据某一条件查询数据
    // { id: 101 }
    database.find = function(name, condition, options) {
      let data = this.db[name]._data; // 获取该集合中的数据
      let res = [];
      let conditionString = JSON.stringify(condition);
      data.forEach(item => {
        let arr = obj2Arr(item);
        for(let i = 0; i< arr.length; i++) {
          if(JSON.stringify(arr[i]) === conditionString) {
            res.push(item);
            break;
          }
        }
      })
      return res;
    }
    
    database.remove = function(name, condition, options) {
      let data = this.db[name]._data;
      let res = [];
      let conditionString = JSON.stringify(condition);
      let idxs = [];
      data.forEach((item, index) => {
        let arr = obj2Arr(item);
        let flag = false;
        for(let i = 0; i< arr.length; i++) {
          if(JSON.stringify(arr[i]) === conditionString) {
            res.push(item);
            idxs.push(index);
          }
        }
      })
      this.db[name]._data = deleteArrByIdxs(data, idxs);
      return res;
    }
    
    //更新数据库里的数据
    database.update = function(name, condition, newData) {
      let data = this.db[name]._data;
      let conditionString = JSON.stringify(condition);
      this.db[name]._data = data.map((item) => {
        let arr = obj2Arr(item);
        for(let i = 0; i< arr.length; i++) {
          if(JSON.stringify(arr[i]) === conditionString) {
            if(!newData._id) newData._id = uuid(20);
            item = newData;
            break;
          }
        }
        return item;
      })
      return true;
    }
    
  //根据索引删除集合
  function deleteArrByIdxs(arr, idxs) {
    let res = arr.filter((item, index) => {
      let flag = true;
      idxs.forEach(idx => {
        if(index === idx) {
          flag = false;
        }
      })
      return flag;
    });
    return res; 
  }
  
  //对象转换成集合
  function obj2Arr(obj) {
    let res = [];
    for(let key in obj) {
      res.push({
        [key]: obj[key]
      })
    }
    return res;
  }

  function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
  }
  
  //随机生成id
  function uuid(len) {
    let str = "",
      range = len,
      pos = "",
      arr = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',];
    for (let i = 0; i < range; i++) {
      pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  }
  
}(mui, window.database = {}), this)