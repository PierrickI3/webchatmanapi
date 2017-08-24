import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Chats } from '.'

const app = () => express(routes)

let chats

beforeEach(async () => {
  chats = await Chats.create({})
})

test('POST /chats 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ firstName: 'test', lastName: 'test', guest: 'test', queue: 'test', skills: 'test', priority: 'test', language: 'test', attributes: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.firstName).toEqual('test')
  expect(body.lastName).toEqual('test')
  expect(body.guest).toEqual('test')
  expect(body.queue).toEqual('test')
  expect(body.skills).toEqual('test')
  expect(body.priority).toEqual('test')
  expect(body.language).toEqual('test')
  expect(body.attributes).toEqual('test')
})

test('GET /chats 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /chats/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${chats.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(chats.id)
})

test('GET /chats/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /chats/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${chats.id}`)
    .send({ firstName: 'test', lastName: 'test', guest: 'test', queue: 'test', skills: 'test', priority: 'test', language: 'test', attributes: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(chats.id)
  expect(body.firstName).toEqual('test')
  expect(body.lastName).toEqual('test')
  expect(body.guest).toEqual('test')
  expect(body.queue).toEqual('test')
  expect(body.skills).toEqual('test')
  expect(body.priority).toEqual('test')
  expect(body.language).toEqual('test')
  expect(body.attributes).toEqual('test')
})

test('PUT /chats/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ firstName: 'test', lastName: 'test', guest: 'test', queue: 'test', skills: 'test', priority: 'test', language: 'test', attributes: 'test' })
  expect(status).toBe(404)
})

test('DELETE /chats/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${chats.id}`)
  expect(status).toBe(204)
})

test('DELETE /chats/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
