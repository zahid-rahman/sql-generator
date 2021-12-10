const _ = require('lodash');

const findAllData = (
    singleQueryConfigs,
    dbJoiningConfigs  
) => {
    let sqlString = null;
    let joiningSqlString = null;
    if (singleQueryConfigs && !dbJoiningConfigs) {

        let { queryType, attributes, whereConditions, baseTableName} = singleQueryConfigs;

        if (queryType == 'SELECT' || queryType == 'select') {
            sqlString = queryType;
        }

        sqlString = setAttributesToSqlString(attributes, sqlString);

        sqlString = addFromKeyWord(sqlString);
        sqlString = addTableName(sqlString, baseTableName);
        sqlString = addWhereCondition(sqlString, whereConditions);
    }
    else if(dbJoiningConfigs && !singleQueryConfigs){
        const seperateQuery = [];
        const joiningInfos = dbJoiningConfigs.joiningTableInfos;
        joiningSqlString = dbJoiningConfigs.queryType
        joiningSqlString = setAttributesToSqlString(dbJoiningConfigs.attributes, joiningSqlString);
        joiningSqlString = addFromKeyWord(joiningSqlString);
   // let joiningString = `${joiningInfos[index].table} ${joiningInfos[index].joiningType} ${joiningInfos[index+1].table} on ${joiningInfos[index]['table']}.${joiningInfos[index].targetedKey} = ${joiningInfos[index+1].table}.${joiningInfos[index+1].foreignKey}`
        joiningInfos.map((tableInfos, index) => {
            let joiningString = `${joiningInfos[index].table} ${joiningInfos[index].joiningType} ${joiningInfos[index+1].table} on ${joiningInfos[index]['table']}.${joiningInfos[index].targetedKey} = ${joiningInfos[index+1].table}.${joiningInfos[index+1].foreignKey}`
        })

        console.log(joiningSqlString);
        console.log(seperateQuery)
        return 0;

    }
    else if(!dbJoiningConfigs && !singleQueryConfigs) {
        return 'Something went wrong';
    }
    else if(dbJoiningConfigs && singleQueryConfigs) {
        return 'Something went wrong';
    }


    return sqlString;
}

const setAttributesToSqlString = (attributes, sqlString) => {
    let stringifyAttributes = null;
    if (attributes == null) {
        sqlString = sqlString + ' ' + '*';
    }
    else {
        stringifyAttributes = attributes.toString();
        sqlString = sqlString + ' ' + stringifyAttributes;
    }
    return sqlString;
}

const addFromKeyWord = (sqlString) => {
    sqlString = sqlString + ' ' + 'from';
    return sqlString;
}

const addTableName = (sqlString, tableName) => {
    sqlString = sqlString + ' ' + tableName;
    return sqlString;
}

const addWhereCondition = (sqlString, conditions) => {
    let length = Object.keys(conditions).length;
    sqlString = sqlString + ' where '
    let counter = 0;
    for (const columns in conditions) {
        sqlString = sqlString + columns + ' = ' + conditions[columns] + '[[]]'
        counter++;
    }
    if (counter == length) {
        sqlString = sqlString.slice(0, -4);
    }
    sqlString = sqlString.split('[[]]').join(' and ')
    return sqlString;
}

const conditions = {
    id: 'LFG-9012',
    barCode: '1203120',
    origin: 'OVX',
    merchantId: '2'
};


const singleQueryConfigs = {
    queryType: 'SELECT',
    attributes: ['id', 'name', 'value'],
    baseTableName: 'orders',
    whereConditions: conditions

}

const joiningInfos = [
    { table: 'orders', targetedKey: 'uuid', foreignKey: null, joiningType: 'left-outer-join' },
    { table: 'items', targetedKey: 'bar-code', foreignKey: 'orderUuid', joiningType: 'left-outer-join'},
    { table: 'scanActivity', targetedKey: 'id', foreignKey: 'object-item', joiningType: 'left-outer-join'}
]

const dbJoiningConfigs = {
    joiningTableInfos: joiningInfos,
    queryType: 'SELECT',
    attributes: null 
}


const result = findAllData(null, dbJoiningConfigs);

console.log(result)