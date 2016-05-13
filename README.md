# Error Reporting and Logging

### How to use...

For **User** errors, post to `/user/push`, with a request body as follows:
```
{
  "user_id": "XXXXX",
  "message": "Uh oh. Something went wrong"
}
```

For **Server** errors, post to `/service/push`, with a request body as follows:
```
{
  "server_id":  "XXXXX",
  "app_name":   "Application name"
  "message":    "Uh oh. Something broke"
}
```
