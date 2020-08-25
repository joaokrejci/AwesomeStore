import { ApolloServer } from 'apollo-server-express';
import { WebApp } from 'meteor/webapp';
import { getUser } from 'meteor/apollo';
import { Products } from '/imports/api/products';
import typeDefs from '/imports/apollo/schema.graphql';

const resolvers = {
  Query: {
    product: (obj, { id }) => Products.findOne(id),
    products: () => Products.find().fetch(),
    cart: (obj, variables, { user }) => {
      let userCart = Meteor.users.findOne(user._id).cart
      return Products.find({ _id: { $in: userCart } }).fetch()
    }
  },
  Mutation: {
    insertProduct(obj, { input }, context) {
      Products.insert({ ...input })
    },
    insertIntoCart(obj, { id }, { user }) {
      if (!user) return
      Meteor.users.update(
        { _id: user._id },
        {
          $push: { "cart": id }
        }
      )
    },
    removeFromCart(obj, { id }, { user }) {
      if (!user) return
      Meteor.users.update(
        { _id: user._id },
        {
          $pull: { "cart": id }
        }
      )
    },
    emptyCart(obj, {id}, {user}){
      if (!user) return
      Meteor.users.update(
        { _id: user._id },
        {
          $set: { "cart": [] }
        }
      )
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization)
  })
});

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql',
  bodyParserConfig: {
    limit: '100mb',
  },
});

WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end();
  }
});
