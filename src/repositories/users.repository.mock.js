export function createMockUsersRepository() {
    const users = [];

    return {
        async findAll() {
            return users;
        },

        async findById(id) {
            return users.find((u) => u.id === id) || null;
        },

        async findByName(name) {
            const needle = name.trim().toLowerCase();
            return users.find((u) => u.name.trim().toLowerCase() === needle) || null;
        },

        async create(user) {
            users.push(user);
            return user;
        },

        async removeById(id) {
            const idx = users.findIndex((u) => u.id === id);
            if (idx === -1) return false;
            users.splice(idx, 1);
            return true;
        },

        getNextId() {
            return users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
        },
    };
}
