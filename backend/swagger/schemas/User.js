module.exports = {
    User: {
      type: 'object',
      required: ['id', 'name', 'email'],
      properties: {
        id: {
          type: 'string',
          description: 'The unique identifier for the user',
        },
        name: {
          type: 'string',
          description: 'The name of the user',
        },
        email: {
          type: 'string',
          description: 'The email of the user',
        },
        // Add additional fields as necessary
      },
    },
  };
  