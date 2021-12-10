const QueryBuilder = require('./sqlGenaratorV2.js');

const { sqlQuery: findAnOrderByMobileNumber } = QueryBuilder.select()
                                                .attributes(['bar_code','package_id','booking_item_code'])
                                                .from('orders')
                                                .where({
                                                    "mobile_number":"01795715448"
                                                })
                                                .orderBy('created_at');

console.log(findAnOrderByMobileNumber)