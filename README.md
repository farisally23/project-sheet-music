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
-Curl Example:
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
-Curl Example:
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
-Curl Example:
``` 
$ curl --location --request POST 'http://localhost:4000/' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query { getFriendsFiles(username: \"new\") { _id title owner filename}}","variables":{}}'
``` 

## Mutations

