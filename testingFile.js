const queryBuilder = require('./sqlGenaratorV2');

let { sqlQuery: orderMonitoringQuery } = queryBuilder.select()
    .attributes('*')
    .from('orders')
    .left_outer_join('items', 'orders.uuid = items.orderUuid')
    .left_outer_join('scanActivities', 'scanActivities.object_id = items.bar_code')
    .where('orders.uuid', 10)
    .where('orders.origin', 'parcel')
    .orderBy('orders', 'createdAt', 'DESC')
    .limitAndOffset(0, 10);

console.log(orderMonitoringQuery);

let { sqlQuery: fakeOrderQuery } = queryBuilder.select()
    .attributes('*')
    .from('orders')
    .where("exitBranchId", 29)
    .where("origin", "omex")

console.log(fakeOrderQuery);


let {sqlQuery: findEmployeeQuery} = queryBuilder.select()
                                    .attributes(['name'])
                                    .from('employees')
                                    .join('departments','employees.id = departments.id')
                                    .where('employee.location', 'dhaka')

console.log(findEmployeeQuery);   


