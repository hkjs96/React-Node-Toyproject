module.exports = {
    HOST: "localhost",
    USER: "alba", 
    PASSWORD: "1111",
    DB: "alba",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};