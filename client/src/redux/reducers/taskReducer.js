const initState = {
    tasks: []
}

const taskReducer = (state = initState, action) => {
    switch (action.type) {
        case 'tasks/add':
            var newTasks = [...state.tasks]
            var taskIsExists = newTasks.find(task => task.title == action.payload)
            if (taskIsExists) {
                var itemIndex = newTasks.findIndex(task => task.title == action.payload)
                newTasks[itemIndex].repeatence = newTasks[itemIndex].repeatence + 1
                return {
                    tasks: newTasks
                }
            } else {
                newTasks.push({
                    title: action.payload,
                    repeatence: 1
                })
                return {
                    tasks: newTasks
                }
            }
        case 'tasks/delete':
            // const updatedTasks = state.tasks.filter(task => task.title != action.payload)
            var updatedTasks = [...state.tasks]
            var itemIndex = updatedTasks.findIndex(task => task.title == action.payload)
            if (itemIndex != -1) {
                if (updatedTasks[itemIndex].repeatence > 1) {
                    updatedTasks[itemIndex].repeatence = updatedTasks[itemIndex].repeatence - 1
                } else {
                    updatedTasks = state.tasks.filter(task => task.title != action.payload)
                }
            } 
            return {
                tasks: updatedTasks
            }
        default:
            return state
    }
}

export default taskReducer