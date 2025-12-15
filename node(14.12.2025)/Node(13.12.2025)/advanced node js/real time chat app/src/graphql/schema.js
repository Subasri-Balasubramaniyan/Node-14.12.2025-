const { gql } = require("apollo-server-express");

module.exports = gql`
  type Message {
    id: ID!
    text: String
  }

  type Query {
    messages: [Message]
  }

  type Subscription {
    messageAdded: Message
  }
`;
