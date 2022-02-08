const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notePath = path.join(__dirname, 'db.json')

async function addNote(title){
const notes = await getNotes()
    console.log(notes)
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)

    await fs.writeFile(notePath, JSON.stringify(notes))
    console.log(chalk.green('Note was added! Yey!'))
}

async function getNotes(){
    const notes = await fs.readFile(notePath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes(){
    const notes = await getNotes()
    console.log(chalk.bgBlue("Your notes are:"))
    notes.forEach(note => {
        console.log( chalk.red(note.id), chalk.blue(note.title))
    })
}

async function removeNote(id){
    const notes = await getNotes()
    const newNotes = notes.filter(note => note.id!=id)

    await fs.writeFile(notePath, JSON.stringify(newNotes))
    console.log(chalk.red('Note removed'))
}

module.exports = {
    addNote, printNotes, removeNote
}