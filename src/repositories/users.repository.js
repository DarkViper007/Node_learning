const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
];

export async function findAll() {
    await asyncEmulation();
    return users;
}

export async function findById(id) {
    await asyncEmulation();
    return users.find((u) => u.id === id) || null;
}

export async function findByName(name) {
    await asyncEmulation();
    const needle = name.trim().toLowerCase();
    return users.find((u) => u.name.trim().toLowerCase() === needle) || null;
}

export async function create(user) {
    await asyncEmulation();
    users.push(user);
    return user;
}

export async function removeById(id) {
    await asyncEmulation();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return false;
    users.splice(idx, 1);
    return true;
}

export function getNextId() {
    return users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
}

async function asyncEmulation() {
    await new Promise((r) => setTimeout(r, 200));
}

