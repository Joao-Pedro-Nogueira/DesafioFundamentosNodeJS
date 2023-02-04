import http from 'node:http'
import crypto, { randomUUID } from 'node:crypto'

const tasks = []

const server = http.createServer((request, response) => {
  const { method, url } = request

  if (method === 'GET' && url === '/tasks') {
    return response
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(tasks))
  }

  if (method === 'POST' && url === '/tasks') {
    const newTask = {
      id: randomUUID(),
      title: 'Finalizar desafio de Node',
      description:
        'Finalizar desafio de criação de servidor da trilha de NodeJS',
      created_at: new Date()
    }

    tasks.push(newTask)

    return response.end('Usuário criado')
  }

  return response.end(404)
})

server.listen(3333)
