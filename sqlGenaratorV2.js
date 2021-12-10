function QueryBuilder() {
    this.selectType = '';
    this.tableName = '';
    this.sqlQuery = '';
}

QueryBuilder.prototype.select = function () {
    this.selectKeyword = 'SELECT';
    this.sqlQuery = this.selectKeyword;
    return this;
}

QueryBuilder.prototype.from = function (tableName) {
    this.tableName = tableName
    this.sqlQuery = this.sqlQuery + ` FROM ${this.tableName}`;
    return this;
}

QueryBuilder.prototype.attributes = function (attributeList) {
    this.attributeList = attributeList.toString();
    if(attributeList != '*' || (attributeList != 'all' || attributes != 'ALL')) {
        this.sqlQuery = this.sqlQuery + ' ' + this.attributeList;
    }
    else {
        this.allKeyword = '*'
        this.sqlQuery = this.sqlQuery + ' ' + this.allKeyword;
    }
    return this;
}

QueryBuilder.prototype.where = function (conditionAttribute, value) {
    this.conditions = ` WHERE ${conditionAttribute} = ${value}`;

    if(this.sqlQuery.includes('where') === true || this.sqlQuery.includes('WHERE') === true) {
        this.sqlQuery = this.sqlQuery + ` and ${conditionAttribute} = ${value} `;
    }
    else {
        this.sqlQuery = this.sqlQuery + this.conditions;
    }
    return this;
}


QueryBuilder.prototype.join = function (tableName, condition = null) {
    if (condition === null) {
        this.sqlQuery = this.sqlQuery + ' INNER JOIN ' + tableName;
    }
    else {
        this.sqlQuery = this.sqlQuery + ' INNER JOIN ' + tableName + ' ON ' + condition;
    }
    return this;
}


QueryBuilder.prototype.left_outer_join = function (tableName, condition = null) {
    if (condition === null) {
        this.sqlQuery = this.sqlQuery + ' LEFT OUTER JOIN ' + tableName;
    }
    else {
        this.sqlQuery = this.sqlQuery + ' LEFT OUTER JOIN ' + tableName + ' ON ' + condition;
    }
    return this;
}


QueryBuilder.prototype.toString = function () {
    this.sqlQuery = this.sqlQuery.toString()
    return this;
}


QueryBuilder.prototype.orderBy = function (tableName = null, attribute, format) {
    this.orderByQuery = `order by ${tableName ? tableName + '.' : ""}${attribute} ${format ? format : ""}`;
    this.sqlQuery = this.sqlQuery + this.orderByQuery;
    return this;
}


QueryBuilder.prototype.limit = function (limit) {
    this.limitQuery = ` LIMIT ${limit}`;
    this.sqlQuery = this.sqlQuery + this.limitQuery;
    return this;
}

QueryBuilder.prototype.offset = function (offset) {
    this.offsetQuery = ` OFFSET ${offset}`;
    this.sqlQuery = this.sqlQuery + this.offsetQuery;
    return this;
}

QueryBuilder.prototype.limitAndOffset = function(offset, limit) {
    this.limitOffsetQuery = ` LIMIT ${offset}, ${limit}`;
    this.sqlQuery = this.sqlQuery + this.limitOffsetQuery;
    return this;
}


let query = new QueryBuilder();
module.exports = query;