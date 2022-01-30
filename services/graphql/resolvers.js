const db = require('./db');

const Query = {
    user: async (root, input) => {
        let { data } = await db.user.details(input);
        return data;
    },
    users: async () => {
        let { data } = await db.user.list();
        return data;
    }
};

const Mutation = {
    registerUser: async (root, { name, userId, email, password, userType }) => {
        const id = await db.user.register({ name, userId, email, password, userType })
        return id.data.result.toObject();
    }
}

module.exports = { Query, Mutation };