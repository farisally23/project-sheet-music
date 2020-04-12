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

## Mutations

