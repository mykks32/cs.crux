// Insert Into RequestAccepted
db.RequestAccepted.insertMany([
    { requester_id: 1, accepter_id: 2, accept_date: new Date("2016-06-03") },
    { requester_id: 1, accepter_id: 3, accept_date: new Date("2016-06-08") },
    { requester_id: 2, accepter_id: 3, accept_date: new Date("2016-06-08") },
    { requester_id: 3, accepter_id: 4, accept_date: new Date("2016-06-09") }
    ]);