import fs from 'fs/promises'
const db = './tasks.json'

export const readTasks = async (req, res) => {
    const data = await fs.readFile(db)
    const tasks = JSON.parse(data)
    res.send({
        success: true,
        tasks: tasks
    })
}