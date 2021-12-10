function QueryBuilder() {
    this.selectType = '';
    this.tableName = '';
    this.sqlQuery = '';
    this.attributeList = [];
}

QueryBuilder.prototype.select = function () {
    const selectKeyword = 'SELECT';
    this.sqlQuery = selectKeyword;
    return this;
}

QueryBuilder.prototype.distinct = function () {
    const distinctKeyword = 'distinct' || 'DISTINCT';
    this.sqlQuery = `${this.sqlQuery} ${distinctKeyword}`;
    return this;
}

QueryBuilder.prototype.from = function (tableName) {
    this.tableName = tableName
    this.sqlQuery = this.sqlQuery + ` FROM ${this.tableName}`;
    return this;
}

QueryBuilder.prototype.attributes = function (attributeList) {
    this.attributeList = attributeList.toString();
    if (attributeList != '*' || (attributeList != 'all' || attributes != 'ALL')) {
        this.sqlQuery = this.sqlQuery + ' ' + this.attributeList;
    }
    else {
        this.allKeyword = '*'
        this.sqlQuery = this.sqlQuery + ' ' + this.allKeyword;
    }
    return this;
}

QueryBuilder.prototype.where = function (conditionPayload) {
    const whereKeyword = 'WHERE';
    const andKeyword = 'AND';
    let isWhereKeywordFound = false;
    this.sqlQuery = `${this.sqlQuery} ${whereKeyword}`;
    
    if(this.sqlQuery.includes('where') === true || this.sqlQuery.includes('WHERE') === true) {
        isWhereKeywordFound = true;
    }

    if(isWhereKeywordFound) {
        if(conditionPayload.lte) {
            for(let lteAttribute in conditionPayload.lte) {
                this.sqlQuery = this.sqlQuery + ` ${lteAttribute}<="${conditionPayload.lte[lteAttribute]}" ${andKeyword}`;
            }
        }
        if(conditionPayload.gte) {
            for(let gteAttribute in conditionPayload.gte) {
                this.sqlQuery = this.sqlQuery + ` ${gteAttribute}>="${conditionPayload.gte[gteAttribute]}" ${andKeyword}`;
            }
        }
        delete conditionPayload['gte'];
        delete conditionPayload['lte'];
        for(let attribute in conditionPayload) {
            if(!conditionPayload.gte || !conditionPayload.lte) {
                this.sqlQuery = this.sqlQuery + ` ${attribute}=${typeof conditionPayload[attribute] == "number" ? Number(conditionPayload[attribute]) : `"${conditionPayload[attribute]}"`} ${andKeyword}`;
            }
        }
        this.sqlQuery = this.sqlQuery.slice(0,-4);
    }
    return this;
}


QueryBuilder.prototype.join = function (tableName, condition = null) {
    const innerJoinKeyboard = 'INNER JOIN';
    const onKeyword = 'ON'
    if (condition === null) {
        this.sqlQuery = `${this.sqlQuery} ${innerJoinKeyboard} ${tableName}`;
    }
    else {
        this.sqlQuery = `${this.sqlQuery} ${innerJoinKeyboard} ${tableName} ${onKeyword} ${condition}`
    }
    return this;
}


QueryBuilder.prototype.left_outer_join = function (tableName, condition = null) {
    const leftOuterJoinKeyword = 'LEFT OUTER JOIN';
    const onKeyword = 'ON';
    if (condition === null) {
        this.sqlQuery = `${this.sqlQuery} ${leftOuterJoinKeyword} ${tableName}`;
    }
    else {
        this.sqlQuery = `${this.sqlQuery} ${leftOuterJoinKeyword} ${tableName} ${onKeyword} ${condition}`

    }
    return this;
}


QueryBuilder.prototype.to_string = function () {
    this.sqlQuery = this.sqlQuery.toString()
    return this;
}


QueryBuilder.prototype.order_by = function (tableName = null, attribute, format) {
    const orderByKeyword = 'ORDER BY'
    this.orderByQuery = `${orderByKeyword} ${tableName ? tableName + '.' : ""}${attribute} ${format ? format.toUpperCase() : ""}`;
    this.sqlQuery = this.sqlQuery +' '+ this.orderByQuery;
    return this;
}


QueryBuilder.prototype.limit = function (limit) {
    const limitKeyword = 'LIMIT'
    this.limitQuery = `${limitKeyword} ${limit}`;
    this.sqlQuery = `${this.sqlQuery} ${this.limitQuery}`;
    return this;
}

QueryBuilder.prototype.offset = function (offset) {
    const offsetKeyword = 'OFFSET'
    this.offsetQuery = `${offsetKeyword} ${offset}`;
    this.sqlQuery = `${this.sqlQuery} ${this.offsetQuery}`;
    return this;
}

QueryBuilder.prototype.limit_and_offset = function (offset, limit) {
    const limitKeyword = 'LIMIT'
    this.limitOffsetQuery = `${limitKeyword} ${offset}, ${limit}`;
    this.sqlQuery = `${this.sqlQuery} ${this.limitOffsetQuery}`;
    return this;
}

let query = new QueryBuilder();

module.exports = query;