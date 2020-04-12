# C09 Project GraphQL Documentation

## Queries
 

### getUsersFriends
- description: retrieve a list of the users friends
- request: 
<pre><code>This is a code block.
</code></pre>
- content-type: `application/json`
- response: 200
    - content-type: `application/json`
    - body: list of objects
      - _id: (string) the user id
``` 
$ curl --location --request GET 'http://localhost:3000/api/users/1' \
--header 'Content-Type: application/json' \
``` 

## Mutations

