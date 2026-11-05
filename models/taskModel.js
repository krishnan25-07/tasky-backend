import fs from 'fs/promises';

const DB_PATH = './tasks.json';

export const readTasksFromFile = async () => {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

export const writeTasksToFile = async (tasks) => {
    await fs.writeFile(DB_PATH, JSON.stringify(tasks, null, 4));
};