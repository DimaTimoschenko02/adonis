// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import TaskService from '#services/task_service'
import {
  createTaskValidator,
  getTasksValidator,
  updateTaskValidator,
  uploadTaskFileValidator,
} from '#validators/task'

@inject()
export default class TasksController {
  constructor(protected taskService: TaskService) {}

  public async getTasks({ request }: HttpContext) {
    const pagination = request.qs()
    const payload = await getTasksValidator.validate(pagination)

    return this.taskService.getTasks(payload?.limit, payload?.offset)
  }

  public async createTask({ request }: HttpContext) {
    const payload = await request.validateUsing(createTaskValidator)

    return this.taskService.createTask(payload)
  }

  public async updateTask({ request }: HttpContext) {
    const payload = await request.validateUsing(updateTaskValidator)

    return this.taskService.updateTask(payload)
  }

  public async getTaskById({ params }: HttpContext) {
    return this.taskService.getTaskById(params.id)
  }

  public async deleteTaskById({ params }: HttpContext) {
    return this.taskService.deleteTasksById(params.id)
  }

  public async uploadFile({ request }: HttpContext) {
    const { file } = await request.validateUsing(uploadTaskFileValidator)

    return this.taskService.saveFile(file)
  }
}
