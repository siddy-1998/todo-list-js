(function () {
    let tasks = [];
    let incompleteTasks= [];
    let completeTasks = [];
    const tasksList = document.getElementById('task-list');
    const addTaskInput = document.getElementById('input-todo');
    const tasksCounter = document.getElementById('tasks-counter');
    const toastContainer = document.getElementById('toast');

    function addTaskToDOM(task) {
        const div = document.createElement('div');

        div.innerHTML = `<input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox check">
                              <label for="${task.id} class="todo-text">${task.text}</label>
                              <i class="far fa-window-close todo-del-btn" data-id="${task.id}"></i>
                              `;
        tasksList.appendChild(div);
    }

    function renderList() {
        // first empty out the list
        tasksList.innerHTML = '';

        for (let i = 0; i < tasks.length; i++) {
            addTaskToDOM(tasks[i]);
        }

        // set tasks count
        tasksCounter.innerHTML = tasks.length;
    }

     function renderListOfIncompleteTasks() {
         // first empty out the list
         tasksList.innerHTML = '';

         for (let i = 0; i < incompleteTasks.length; i++) {
             addTaskToDOM(incompleteTasks[i]);
         }

         // set tasks count
         tasksCounter.innerHTML = incompleteTasks.length;
     }

     function renderListOfCompleteTasks() {
         // first empty out the list
         tasksList.innerHTML = '';

         for (let i = 0; i < completeTasks.length; i++) {
             addTaskToDOM(completeTasks[i]);
         }

         // set tasks count
         tasksCounter.innerHTML = completeTasks.length;
     }


    function deleteTask(taskId) {
        // filter out the tasks
        const newTasks = tasks.filter(function (task) {
            return task.id !== taskId;
        });

        tasks = newTasks;
        renderList();
        showNotification('error', 'Task deleted successfully!');
    }

    function markTaskAsComplete(taskId) {
        // find the task
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        if (taskIndex > -1) {
            // update the task
            tasks[taskIndex].done = !tasks[taskIndex].done;
            renderList();
            showNotification('success', `Task ${tasks[taskIndex].done ? 'checked' : 'unchecked'} successfully!`);
            return;
        }


    }

    function deleteTask(taskId) {
        // filter out the tasks
        const newTasks = tasks.filter(function (task) {
            return task.id !== taskId;
        });

        tasks = newTasks;
        renderList();
        showNotification('error', 'Task deleted successfully!');
    }


    function addTask(task) {
        if (task != null) {
            tasks.push(task);
            renderList();
            showNotification('success', 'Task added successfully!');
            return;
        }

        // show error
        showNotification('error', 'Task can not be empty!');
    }

    function addItemsOnClick()
    {
         const text = addTaskInput.value;
         if (!text) {
             showNotification('error', 'Task text can not be empty!');
             return;
         }

         const task = {
             text,
             id: Date.now().toString(),
             done: false
         }

         addTaskInput.value = '';
         addTask(task);

    }

    function markAllTaskComplete()
    {
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].done = true;
            document.getElementById(tasks[i].id).checked = true;

        }

        if (tasks.length > 0)
            showNotification('success', 'All tasks checked successfully!');
        else
            showNotification('error', 'No task to mark as complete!')

        // console.log(tasks);

    }

    function clearCompletedTasks(){
       const newTasks = tasks.filter(function (task) {
           return task.done !== true;
       });

       const len = tasks.length;
       tasks = newTasks;
       renderList();

       if (len === tasks.length) {
           showNotification('error', 'No task is marked as complete!');
       } else {
           showNotification('error', 'Deleted all checked tasks successfully!')
       }
    }

    function showIncompleteTasks(){
        const newTasks = tasks.filter(function (task) {
            return task.done !== true;
        });

        incompleteTasks = newTasks;

        renderListOfIncompleteTasks();

        if (incompleteTasks.length > 0)
            showNotification('success', 'Displaying completed tasks!');
        else
            showNotification('error', 'No incompleted task to display!');

    }

    function showCompleteTasks(){
          const newTasks = tasks.filter(function (task) {
              return task.done !== false;
          });

          completeTasks = newTasks;

          renderListOfCompleteTasks();

          if (completeTasks.length > 0)
              showNotification('success', 'Displaying incomplete tasks!');
          else
              showNotification('error', 'No completed task to display!');
    }


    function handleClickLisetner(e) {

        if (e.target.className === 'far fa-window-close todo-del-btn') {
            // handle delete task click
            const taskId = e.target.dataset.id;
            deleteTask(taskId);

            return;
        } else if (e.target.className === 'custom-checkbox check') {
            // handle marking task as complete
            const taskId = e.target.id;
            markTaskAsComplete(taskId);

            return;
        } else if (e.target.id === 'add-btn' || e.target.className === 'fas fa-plus-circle todo second') {
            
            //adding items through button
            addItemsOnClick();  

            return;
        } 
        else if (e.target.className === 'complt-all-task' || e.target.className === 'fas fa-check-double')
        {
            //mark all task as complete
            markAllTaskComplete();
            
            return;
        }else if(e.target.className==='clear-complt')
        {
            //clearing completed tasks
            clearCompletedTasks();
            
            return;
        }
        else if(e.target.id==='all')
        {
            renderList();
            if(tasks.length>0)
               showNotification('success','Displaying all tasks!');
            else
               showNotification('error','No task to show!');

            return;

        }else if(e.target.id==='incomplete')
        {

            //showing incomplete tasks
            showIncompleteTasks();            
            return;
 
        }
        else if(e.target.id==='completed')
        {

            //showing completed tasks
            showCompleteTasks();          
            return;
        }

    }

    function handleInputKeypress(e) {
        if (event.key === 'Enter') {
            const text = e.target.value;

            if (!text) {
                showNotification('error', 'Task text can not be empty!');
                return;
            }

            const task = {
                text,
                id: Date.now().toString(),
                done: false
            }
            e.target.value = '';
            addTask(task);
        }
    }


    function initializeTodoList() {
        document.addEventListener('click', handleClickLisetner);
        addTaskInput.addEventListener('keyup', handleInputKeypress);
    }

    function showNotification(type, message) {
        if (type === 'error') {
            toastContainer.classList.remove('toast-success');
            toastContainer.classList.add('toast-error');
        } else if (type === 'success') {
            toastContainer.classList.remove('toast-error');
            toastContainer.classList.add('toast-success');
        }

        toastContainer.style.display = 'block';
        toastContainer.innerText = message;

        setTimeout(() => {
            toastContainer.style.display = 'none';
        }, 1500)
    }

    initializeTodoList();
})();