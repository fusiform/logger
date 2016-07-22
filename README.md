# Error Reporting and Logging

### How to use...

For **User** errors, post to `/user/`, with a request **body** as follows:
```
{
  "user_id": "XXXXX",
  "message": "Uh oh. Something went wrong"
}
```

For **Server** errors, post to `/service/`, with a request **body** as follows:
```
{
  "server_id":  "XXXXX",
  "app_name":   "Application name"
  "message":    "Uh oh. Something broke"
}
```

For **TrueVault** errors, post to `/truevault/`, with a request **body** as follows:
```
{
  "address":  "XXXXX",
  "message":  "Uh oh. Something broke"
  "error":    "Error description"
}
```
### Analytics Document Schema

```
ANALYTICS : {
  "name": "analytics",
  "fields": [
    {
      "name": "event",
      "index": true,
      "type": "string"
    },
    {
      "name": "details",
      "index": true,
      "type": "string"
    },
    {
      "name": "timestamp",
      "index": true,
      "type": "string"
    },
    {
      "name": "user",
      "index": true,
      "type": "string"
    }
  ]
}
```

### Analytics Endpoints

`POST /analytics/internal`: Report an event

Authorization: Internal

Request body:
- `event`: event name
- `user`: user id
- `details`: [optional] whatever details you want to store

Response:
- `success`: was the request successful?
- `message`: analytics document

`POST /analytics/user`: Report an event

Authorization: User

Request body:
- `event`: event name
- `details`: [optional] whatever details you want to store

Response:
- `success`: was the request successful?
- `message`: analytics document


`POST /analytics/summary/internal`: Receive a summary of number of events a user has done

Authorization: Internal

Request body:
- `event`: event name
- `user`: [optional] user id. If not provided, will count all of that type.
- `since`: [optional] number of days to go back

Response:
- `success`: was the request successful?
- `message`: number of events


`POST /analytics/summary/user`: Receive a summary of number of events a user has done

Authorization: User

Request body:
- `event`: event name
- `since`: [optional] number of days to go back

Response:
- `success`: was the request successful?
- `message`: number of events
