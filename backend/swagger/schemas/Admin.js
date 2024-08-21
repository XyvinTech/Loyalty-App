module.exports = {
    Admin: {
      type: 'object',
      required: ['id', 'name', 'role'],
      properties: {
        id: {
          type: 'string',
          description: 'The unique identifier for the admin',
        },
        name: {
          type: 'string',
          description: 'The name of the admin',
        },
        role: {
          type: 'string',
          description: 'The role of the admin',
        },
        // Add additional fields as necessary
      },
    },
  };
  