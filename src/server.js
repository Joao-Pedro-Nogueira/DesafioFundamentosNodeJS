import { randomUUID } from 'node:crypto'
import http from 'node:http'
import { Database } from './database.js'
import { json } from './middlewares/json.js'

const database = new Database()

const server = http.createServer(async (request, response) => {
  const { method, url } = request

  await json(request, response)

  if (method === 'GET' && url === '/tasks') {
    const tasks = database.select('tasks')
    return response.end(JSON.stringify(tasks))
  }

  if (method === 'POST' && url === '/tasks') {
    const { title, description } = request.body

    const newTask = {
      id: randomUUID(),
      title,
      description,
      date: new Date()
    }

    database.insert('tasks', newTask)

    return response.writeHead(201).end()
  }

  return response.end(404)
})

server.listen(3333)
