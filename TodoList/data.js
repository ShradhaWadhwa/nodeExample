/**
 * Created by championswimmer on 13/06/17.
 */
const Sequelize = require('sequelize');
const db = new Sequelize('ngrdb', 'bootcamp', 'mypass', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 5000
    }
});
/*sequelize.authenticate().complete(function (err) {
 if (err) {
    console.log('There is connection in ERROR');
 } else {
    console.log('Connection has been established successfully');
 }
});
*/
const Todo = db.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    task: Sequelize.STRING,
    done: Sequelize.BOOLEAN
});

db.sync({});

function getTodos () {
    return Todo.findAll({
        where: {
            done: false
        }
    })
}

function addTodo (todo) {
    return Todo.create({
        task: todo,
        done: false
    })
}

module.exports = {
    getTodos,
    addTodo
};