import vine from '@vinejs/vine'

export const createTaskValidator = vine.compile(
  vine.object({
    title: vine.string().trim().maxLength(64),
    description: vine.string().trim().maxLength(256).escape(),
    filePath: vine.string().optional(),
  })
)

export const updateTaskValidator = vine.compile(
  vine.object({
    id: vine.number(),
    title: vine.string().trim().maxLength(64),
    description: vine.string().trim().maxLength(256).escape(),
    filePath: vine.string().optional(),
  })
)

export const getTasksValidator = vine.compile(
  vine.object({
    limit: vine.number().min(0).optional(),
    offset: vine.number().min(0).optional(),
  })
)

export const uploadTaskFileValidator = vine.compile(
  vine.object({
    file: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'pdf'],
    }),
  })
)
