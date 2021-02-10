
const currentDate = () => new Date().toUTCString();

const log = console.log;
const error = console.error;
console.log = (...data) => log(`${currentDate()}    `, ...data);
console.info = (...data) => log(`${currentDate()}    `, ...data);
console.error = (...data) => error(`${currentDate()}    `, ...data);
