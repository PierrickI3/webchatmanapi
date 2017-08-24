# webchatman v0.0.0



- [Chats](#chats)
	- [Create chats](#create-chats)
	- [Delete chats](#delete-chats)
	- [Retrieve chats](#retrieve-chats)
	- [Update chats](#update-chats)
	


# Chats

## Create chats



	POST /chats


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| firstName			| 			|  <p>Chats's firstName.</p>							|
| lastName			| 			|  <p>Chats's lastName.</p>							|
| guest			| 			|  <p>Chats's guest.</p>							|
| queue			| 			|  <p>Chats's queue.</p>							|
| skills			| 			|  <p>Chats's skills.</p>							|
| priority			| 			|  <p>Chats's priority.</p>							|
| language			| 			|  <p>Chats's language.</p>							|
| attributes			| 			|  <p>Chats's attributes.</p>							|

## Delete chats



	DELETE /chats/:id


## Retrieve chats



	GET /chats


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update chats



	PUT /chats/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| firstName			| 			|  <p>Chats's firstName.</p>							|
| lastName			| 			|  <p>Chats's lastName.</p>							|
| guest			| 			|  <p>Chats's guest.</p>							|
| queue			| 			|  <p>Chats's queue.</p>							|
| skills			| 			|  <p>Chats's skills.</p>							|
| priority			| 			|  <p>Chats's priority.</p>							|
| language			| 			|  <p>Chats's language.</p>							|
| attributes			| 			|  <p>Chats's attributes.</p>							|


