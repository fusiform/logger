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


### Analytics Endpoints

`POST /analytics/`: Report an event

Request body:
- `event`: event name
- `user`: user id

`POST /analytics/summary`: Report an event

Request body:
- `event`: event name
- `user`: user id
- `since`: [optional] number of days to go back
