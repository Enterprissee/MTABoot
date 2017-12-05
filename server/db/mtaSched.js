const mysql = require('mysql');
const textParser = require('../lib/txt');

const connection = mysql.createConnection({
  user: 'root',
<<<<<<< HEAD
  database: 'loco_mta'
=======
  database: 'loco_mta',
  password : 'plantlife'
>>>>>>> Functional Loco
});

connection.connect((error) => {
  if (error) { return console.log(error); }
  console.log(`connected with id ${connection.threadId}`);
});

const CREATE_STOPTIMES = `
  CREATE TABLE stop_times (
    id int NOT NULL AUTO_INCREMENT,
    route_id varchar(10) NOT NULL,
    route_type varchar(10) NOT NULL,
    arrival_time varchar(20) NOT NULL,
    stop_id varchar(10) NOT NULL,
    PRIMARY KEY (id)
  )`;

const CREATE_STOPS = `
  CREATE TABLE stops (
    id int NOT NULL AUTO_INCREMENT,
    stop_id varchar(10) NOT NULL,
    stop_name varchar(50) NOT NULL,
    stop_lat varchar(20) NOT NULL,
    stop_lon varchar(20) NOT NULL,
    PRIMARY KEY (id)
  )`;

const CREATE_ROUTES = `
  CREATE TABLE routes (
    id int NOT NULL AUTO_INCREMENT,
    route_id varchar(10) NOT NULL,
    route_desc varchar(2000) NOT NULL,
    PRIMARY KEY (id)
  )`;

const DROP_TABLE = 'DROP TABLE IF EXISTS stops, stop_times, routes';

const INSERT_INTO_STOPTIMES = 'INSERT INTO stop_times (route_id, route_type, arrival_time, stop_id) VALUES ?';
const INSERT_INTO_STOPS = 'INSERT INTO stops (stop_id, stop_name, stop_lat, stop_lon) VALUES ?';
const INSERT_INTO_ROUTES = 'INSERT INTO routes (route_id, route_desc) VALUES ?';

const _dropTables = () => new Promise((resolve, reject) => {
  connection.query(DROP_TABLE, (error, result) => {
    if (error) { return reject(error); }
    resolve(result);
  });
});

const _createTable = (query) => new Promise((resolve, reject) => {
  connection.query(query, (error, result) => {
    if (error) { return reject(error); }
    resolve(result);
  });
});

const _createTables = () => new Promise((resolve, reject) => {
  _createTable(CREATE_STOPS)
  .then((result) => _createTable(CREATE_ROUTES))
  .then((result) => _createTable(CREATE_STOPTIMES))
  .then((result) => resolve(result))
  .catch((error) => {
    console.log;
    reject(error);
  });
});

const _insertStopTimes = (data) => new Promise((resolve, reject) => {
  let query = (data) => {
    let newData = data.splice(0, 10000);
    connection.query(INSERT_INTO_STOPTIMES, [newData], (error, result) => {
      if (error) { return reject(error); }
      if (data.length) { return query(data); }
      resolve(result);
    });
  }
  query(data);
});

const _insertStops = (data) => new Promise((resolve, reject) => {
  connection.query(INSERT_INTO_STOPS, [data], (error, result) => {
    if (error) { return reject(error); }
    resolve(result);
  });
});

const _insertRoutes = (data) => new Promise ((resolve, reject) => {
  connection.query(INSERT_INTO_ROUTES, [data], (error, result) => {
    if (error) { return reject(error); }
    resolve(result);
  });
});

const updateMtaSchedule = () => new Promise((resolve, reject) => {
  let data;
  textParser.getAll()
  .then((parsedData) => {
    if (!parsedData.stoptimes.length) { throw 'Error parsing stoptimes'; }
    if (!parsedData.stops.length) { throw 'Error parsing stops'; }
    if (!parsedData.routes.length) { throw 'Error parsing routes'; }
    data = parsedData;
    return _dropTables();
  })
  .then((result) => {
    return _createTables();
  })
  .then((result) => {
    return _insertStopTimes(data.stoptimes);
  })
  .then((result) => {
    return _insertStops(data.stops);
  })
  .then((result) => {
    return _insertRoutes(data.routes);
  })
  .then((result) => {
    console.log('successfully updated MTA schedule');
    resolve(result);
  })
  .catch((error) => {
    console.log(error)
    reject(error);
  });
});

const getScheduleByStop = (stopId, routeType = 'WKD') => new Promise((resolve, reject) => {
  let query = 'SELECT * FROM `stop_times` WHERE `stop_id` = ? AND `route_type` = ?';
  connection.query(query, [stopId, routeType], (error, result) => {
    if (error) { return reject(error); }
<<<<<<< HEAD
=======
    textParser.timeSort(result)
>>>>>>> Functional Loco
    resolve(result);
  });
});

const getScheduleByRoute = (routeId, routeType = 'WKD') => new Promise((resolve, reject) => {
  let query = 'SELECT * FROM `stop_times` WHERE `route_id` = ? AND `route_type` = ?';
  connection.query(query, [routeId, routeType], (error, result) => {
    if (error) { return reject(error); }
<<<<<<< HEAD
=======
    textParser.timeSort(result)
>>>>>>> Functional Loco
    resolve(result);
  });
});

const getScheduleByStopAndRoute = (stopId, routeId, routeType = 'WKD') => new Promise((resolve, reject) => {
  let query = 'SELECT * FROM `stop_times` WHERE `stop_id` = ? AND `route_id` = ? AND `route_type` = ?'
  connection.query(query, [stopId, routeId, routeType], (error, result) => {
    if (error) { return reject(error); }
<<<<<<< HEAD
=======
    textParser.timeSort(result)
>>>>>>> Functional Loco
    resolve(result);
  });
});

<<<<<<< HEAD
const getStops = () => new Promise((resolve, reject) => {
=======
const getStops = () => new Promise ((resolve, reject) => {
>>>>>>> Functional Loco
  let query = 'SELECT * FROM `stops`';
  connection.query(query, (error, result) => {
    if (error) { return reject(error); }
    resolve(result);
  });
});

const getStop = (stopId) => new Promise ((resolve, reject) => {
  let query = 'SELECT * from `stops` WHERE `stop_id` = ?';
  connection.query(query, stopId, (error, result) => {
    if (error) { return reject(error); }
    resolve(result);
  });
});

const getRoutes = () => new Promise((resolve, reject) => {
  let query = 'SELECT * FROM `routes`';
  connection.query(query, (error, result) => {
    if (error) { return reject(error); }
    resolve(result);
  });
});

const getRoute = (routeId) => new Promise((resolve, reject) => {
  let query = 'SELECT * FROM `routes` WHERE `route_id` = ?';
  connection.query(query, routeId, (error, result) => {
    if (error) { return reject(error); }
    resolve(result);
  });
});

<<<<<<< HEAD
=======
const getStopsByRoute = (routeId) => new Promise ((resolve, reject) => {
  let query =
  `SELECT DISTINCT
  st.stop_id,
  s.stop_name
  FROM stop_times st
  LEFT JOIN stops s
  ON st.stop_id = s.stop_id
  WHERE route_id = ?`;
  //let truequery = 'SELECT `stops.stop_name` FROM `stops` INNER JOIN `stop_times` on `stops.stop_id` = ? '
  connection.query(query, routeId, (error, result) => {
    if (error) { return reject(error); }
    let work = textParser.directionSort(result)
    resolve(work)
  });
});

>>>>>>> Functional Loco
module.exports = {
  updateMtaSchedule,
  getScheduleByStop,
  getScheduleByRoute,
  getScheduleByStopAndRoute,
  getStops,
  getStop,
  getRoutes,
<<<<<<< HEAD
  getRoute
=======
  getRoute,
  getStopsByRoute
>>>>>>> Functional Loco
};
