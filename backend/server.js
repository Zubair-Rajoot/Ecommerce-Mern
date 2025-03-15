const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require('./config/database')


process.on("uncaughtException", (err)=>{
    console.log(`Error ${err.message}`);
    console.log(`shutting down the server due to uncaught exception `);

    server.close(()=>{
        process.exit(1)
    });
})



dotenv.config({path: "backend/config/config.env"})

connectDatabase();

let server = app.listen(process.env.PORT, ()=>{
    console.log(`server is working on Port http://localhost:${process.env.PORT}`)
});



process.on('unhandledRejection', (err)=>{
    console.log(`Error ${err.message}`);
    console.log(`shutting down the server due to unhandled rejection `);

    server.close(()=>{
        process.exit(1)
    });
});