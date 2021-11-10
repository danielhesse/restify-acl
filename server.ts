import restify from 'restify'

const server = restify.createServer()

server.get('/', (_, response) => {
  return response.json({ message: 'Hello World!' })
})

server.listen(8080, () => {
  console.log('🚀 Server running on port 8080!')
})