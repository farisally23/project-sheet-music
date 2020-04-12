# C09 Project GraphQL Documentation

## Queries
 

### getUsersFriends
- description: retrieve a list of the users friends
- request:
    - content-type: `application/json`
<pre><code>
query {
  getUsersFriends(username: String!) {
    _id: String!
    username: String!
    email: String!
  }
}
</code></pre>

- response: 200
    - content-type: `application/json`
    - data: list of users
<pre><code>
{
"data": {
    "getUsersFriends": [User!]
  }
}
</code></pre>
- Curl Example:
``` 
$ curl --location --request POST 'http://localhost:4000/' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query { getUsersFriends(username: \"new\") { _id username email}}","variables":{}}'
``` 

### getUserFiles
- description: retrieve a list of the users audio files
- request:
    - content-type: `application/json`
<pre><code>
query {
  getUsersFiles(username: String!) {
    _id: String!
    title: String!
    owner: String!
    filename: String!
  }
}
</code></pre>

- response: 200
    - content-type: `application/json`
    - data: list of the users files
<pre><code>
{
"data": {
    "getUsersFiles": [UploadedFile!]
  }
}
</code></pre>
- Curl Example:
``` 
$ curl --location --request POST 'http://localhost:4000/' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query { getUserFiles(username: \"new\") { _id title owner filename}}","variables":{}}'
``` 

### getFriendsFiles
- description: retrieve a list of audio files belonging to friends of the user
- request:
    - content-type: `application/json`
<pre><code>
query {
  getFriendsFiles(username: String!) {
    _id: String!
    title: String!
    owner: String!
    filename: String!
  }
}
</code></pre>

- response: 200
    - content-type: `application/json`
    - data: list of the users friends files
<pre><code>
{
"data": {
    "getFriendsFiles": [UploadedFile!]
  }
}
</code></pre>
- Curl Example:
``` 
$ curl --location --request POST 'http://localhost:4000/' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query { getFriendsFiles(username: \"new\") { _id title owner filename}}","variables":{}}'
``` 

## Mutations

### login
- description: log the user into the application
- request:
    - content-type: `application/json`
<pre><code>
mutation {
  login(username: String!, password: String!) {
     path
     message
  }
}
</code></pre>

- response: 200
    - content-type: `application/json`
    - data: return an error if one occured, otherwise null return
<pre><code>
{
"data": {
    "login": [Error!]
  }
}
</code></pre>
- Curl Example:
``` 
$ curl --location --request POST 'http://localhost:4000/' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation { login (username: \"new\", password: \"new\") {path message}}","variables":{}}'
``` 

### signup
- description: signup for the application
- request:
    - content-type: `application/json`
<pre><code>
mutation {
  signup(username: String!, email: String!, password: String!) {
     path
     message
  }
}
</code></pre>

- response: 200
    - content-type: `application/json`
    - data: return an error if one occured, otherwise null return
<pre><code>
{
"data": {
    "signup": [Error!]
  }
}
</code></pre>
- Curl Example:
``` 
$ curl --location --request POST 'http://localhost:4000/' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation {signup(username: \"newguy\", email: \"newguy@gmail.com\"  password: \"newguy\") {path message}}","variables":{}}'
``` 

### addFriend
- description: add another user as a friend
- request:
    - content-type: `application/json`
<pre><code>
mutation {
  addFriend(username: String!, friend: String!) {
     path
     message
  }
}
</code></pre>

- response: 200
    - content-type: `application/json`
    - data: return an error if one occured, otherwise null return (friend added successfully)
<pre><code>
{
"data": {
    "addFriend": [Error!]
  }
}
</code></pre>
- Curl Example:
``` 
$ curl --location --request POST 'http://localhost:4000/' \
--header 'Content-Type: application/json' \
--data-raw '{"query": "mutation {addFriend(username: \"newguy\" friend:\"new\") {path message}}","variables":{}}'
``` 
