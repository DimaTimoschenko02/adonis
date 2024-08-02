import { CreateTask } from '../../contracts/task/create-task.type.js'
import Task from '#models/task'
import { Exception } from '@adonisjs/core/exceptions'
import { UpdateTask } from '../../contracts/task/update-task.type.js'
import { MultipartFile } from '@adonisjs/bodyparser'
import app from '@adonisjs/core/services/app'

export default class TaskService {
  public async createTask(task: CreateTask): Promise<Task> {
    return Task.create(task)
  }

  public async deleteTasksById(id: number): Promise<{ message: string }> {
    const task = await this.getTaskById(id)

    await task.delete()

    return { message: 'Task deleted successfully.' }
  }

  public async updateTask(task: UpdateTask): Promise<Task> {
    const taskToUpdate = await this.getTaskById(task.id)

    return taskToUpdate.merge(task).save()
  }

  public async getTasks(limit = 10, offset = 0): Promise<Task[] | null> {
    return Task.query().offset(offset).limit(limit)
  }

  public async getTaskById(id: number): Promise<Task> {
    const task = await Task.find(id)

    if (!task)
      throw new Exception('Task not found', {
        status: 404,
      })

    return task
  }

  public async saveFile(
    file: MultipartFile
  ): Promise<{ fileName: string; filePath: string; message: string }> {
    const fileName = `${new Date().getTime()}.${file.extname}`
    await file.move(app.tmpPath('uploads'), {
      name: fileName,
      overwrite: true,
    })

    return {
      message: 'File uploaded successfully',
      fileName: fileName,
      filePath: `/uploads/${fileName}`,
    }
  }
}
