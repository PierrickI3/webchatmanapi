import { Router } from 'express'

const router = new Router()

/**
 * @api {post} /chats Create chats
 * @apiName CreateChats
 * @apiGroup Chats
 * @apiParam firstName Chats's firstName.
 * @apiParam lastName Chats's lastName.
 * @apiParam guest Chats's guest.
 * @apiParam queue Chats's queue.
 * @apiParam skills Chats's skills.
 * @apiParam priority Chats's priority.
 * @apiParam language Chats's language.
 * @apiParam attributes Chats's attributes.
 * @apiSuccess {Object} chats Chats's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Chats not found.
 */
router.post('/', function(request, response) {
    response.end('create chat here');
})

/**
 * @api {get} /chats Retrieve chats
 * @apiName RetrieveChats
 * @apiGroup Chats
 * @apiUse listParams
 * @apiSuccess {Object[]} chats List of chats.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', function(request, response) {
    response.end('list here');
})

/**
 * @api {get} /chats/:id Retrieve chats
 * @apiName RetrieveChats
 * @apiGroup Chats
 * @apiSuccess {Object} chats Chats's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Chats not found.
 */
router.get('/:id', function(request, response) {
    response.end('get chat id here')
})

/**
 * @api {put} /chats/:id Update chats
 * @apiName UpdateChats
 * @apiGroup Chats
 * @apiParam firstName Chats's firstName.
 * @apiParam lastName Chats's lastName.
 * @apiParam guest Chats's guest.
 * @apiParam queue Chats's queue.
 * @apiParam skills Chats's skills.
 * @apiParam priority Chats's priority.
 * @apiParam language Chats's language.
 * @apiParam attributes Chats's attributes.
 * @apiSuccess {Object} chats Chats's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Chats not found.
 */
router.put('/:id', function(request, response) {
    response.end('set composing here');
})

/**
 * @api {delete} /chats/:id Delete chats
 * @apiName DeleteChats
 * @apiGroup Chats
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Chats not found.
 */
router.delete('/:id', function(request, response) {
    response.end('delete chat here')
})

export default router