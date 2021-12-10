const QueryBuilder = require('./sqlGeneratorV3');

const { sqlQuery: findAllEmployees } = QueryBuilder.select()
    .attributes('*')
    .from('employees')
    .join('departments', 'employees.deptid=departments.deptid')
    .where({
        'employees.name': 'zahid rahman'
    })

console.log(findAllEmployees)
console.log('************************');

const { sqlQuery: orderMonitoringSqlQueryString } = QueryBuilder.select()
    .distinct()
    .attributes(['orders.bar_code', 'orders.uuid, orders.createdAt'])
    .from('orders')
    .left_outer_join('items', 'orders.uuid=items.orderUuid')
    .left_outer_join('scanActivities', 'items.bar_code=scanActivities.object_id')
    .where({
        lte: {
            'orders.createdAt': new Date().toISOString(),
        },
        gte: {
            'orders.createdAt': new Date().toISOString(),
        },
        'scanActivities.object_type': 'item',
        'orders.origin': 'omex',
        'scanActivities.branch_id': 28,
        'scanActivities.branch_type': 'sub',
        'scanActivities.responseCode': 200
    })
    .order_by('orders', 'createdAt', 'desc')
    .limit_and_offset(0, 10)

console.log(orderMonitoringSqlQueryString)