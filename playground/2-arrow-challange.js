

//Challange
const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    }, {
        text: 'Clean yard',
        completed: false
    }, {
        text: 'Film course',
        completed: false
    }],
    getTasksTodo: function () {
        const filteredTasks = this.tasks.filter((task) => {
            return task.completed === false
        })
        return filteredTasks
    }
}

console.log(tasks.getTasksTodo());