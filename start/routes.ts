/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import TasksController from '#controllers/tasks_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.get('', [TasksController, 'getTasks'])
    router.post('', [TasksController, 'createTask'])
    router.put('', [TasksController, 'updateTask'])
    router.delete(':id', [TasksController, 'deleteTaskById'])
    router.get(':id', [TasksController, 'getTaskById'])
    router.post('file', [TasksController, 'uploadFile'])
  })
  .prefix('/api/task')
