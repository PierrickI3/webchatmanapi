import http from 'http'
import { env, port, ip } from './config'
import express from './services/express'
import uuid from 'uuid'
import api from './api'
import request from 'request'
import requireFromUrl from 'require-from-url/sync'
import mockBrowser from 'mock-browser'

const app = express(api)
const server = http.createServer(app)

// =================
// =- MockBrowser -=
// =================
const MockBrowser = mockBrowser.mocks.MockBrowser
const mock = new MockBrowser()

const placeholderAgentUserInformation = {
    name: "Pierrick Agent Name",
    profileImage: {}
}

// ==============
// =- Realtime -=
// ==============
let devConfig = {}, _realtime = {}, conversation, gotAgentInformation, pausedTimeoutId, activeTyping = false
devConfig.baseURL = "mypurecloud.ie";
devConfig.roomAttributes = {
    purecloud: true,
    orgName: "purecloud-poland",
    toUserEmail: 'pierrick.lozach@inin.com',
    priority: "0",
    firstName: "Test",
    lastName: "Customer"
}
devConfig.realtimeOptions = {
    orgId: 8859,
    jidResource: 'webchat-chatman',
    jidRouting: true,
    focusV2: true,
    roomsV2: true,
    offlineJoinNotifications: true,
    host: `https://realtime.${devConfig.baseURL}:443`,
    guest: true,

    // NOTE: Use boolean true value to log everything
    // Possible array values: connect, stanza
    // debug: logger.isDebugEnabled() ? ['connect', 'stanza'] : []
    debug: ['connect', 'stanza']
};

/*
import fs from 'fs'
function getRealtimeScript() {
    request(`https://realtime.${devConfig.baseURL}:443`).pipe(fs.createWriteStream('./src/realtime.js'))
}
getRealtimeScript()
*/

// This is a workaround to make realtime think we actually have a window (and jQuery too)
require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    var $ = require("jquery")(window);
    global.window = mock.getWindow()
    global.navigator = mock.getNavigator()
    global.document = mock.getDocument()
    global.$ = $
    
    require('./realtime')
});

const loadRealtime = (callback) => {
    _realtime = new global.window.Realtime(devConfig.realtimeOptions)
    setupRealtime(_realtime, callback)
}

const setupRealtime = (realtime, callback) => {
    //console.log('Realtime', realtime)
    
    realtime.onMessage(message => realtimeEventHandlers.handleOnMessage(conversation, message))
    realtime.onChatState(message => realtimeEventHandlers.handleOnChatState(conversation, event))
    realtime.onPresence(message => realtimeEventHandlers.handleOnPresence(conversation, event))
    realtime.onOccupantChange(message => realtimeEventHandlers.handleOnOccupantChange(conversation, event))
    realtime.onConnect(() => {
        // connected
        console.info('Connected to realtime service...')
        
        conversation = new ChatConversation()
        conversation.me.id = realtime.jid.bare().toString()
        conversation.domain = realtime.jid.domain
        var jid = 'acd-' + uuid.v4()
        let pos = ('acd-' + uuid.v4()).indexOf('@')
        conversation.jid = (pos === -1) ? id + '@conference.' + conversation.domain() : id
        
        realtime.joinRoom(conversation.jid, (err) => {
            if (err) {
                console.error('failed to join room', err)
                callback(err)
                return;
            }
            realtime.setAttributes(conversation.jid, devConfig.roomAttributes)
            //grabAgentInformation()
            callback()
        })
    })
    realtime.connect()
}

setImmediate(() => {
    server.listen(port, ip, () => {
        console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
        loadRealtime()
    })
})

export default app