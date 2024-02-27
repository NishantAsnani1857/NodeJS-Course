const fs=require('fs');


const getNotes = (title) => {
    const notes=loadNotes()
    const requiredNote=notes.find((note)=>note.title===title)
    if(requiredNote) return requiredNote;
    else return "Note not found"
    
}

const listnotes=()=>{
    const listnote = loadNotes()

        listnote.forEach(element => {
            console.log(element.title);
        });
        console.log(listnote);
}

const addNotes = (title, body) => {
    const notes=loadNotes()
    const duplicate=notes.find((ele)=>ele.title===title)
    if(duplicate===undefined)
    {
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
    }
    else
    {
        console.log("Note with same title already present");
    }
    
}

//Challange
const removeNotes = (title) => {
    const notes=loadNotes()
    const index=notes.findIndex((note)=>note.title===title)
    if (index!=-1)
    {
    notes.splice(index,1)
    saveNotes(notes)
    } 
    else
    {
        return "Note not found"
    }
}

const saveNotes=(notes)=>{
    const jsonData=JSON.stringify(notes)
    fs.writeFileSync('notes.json',jsonData)
}

//Challange
const loadNotes=()=>{
    try{
        const bufferData=fs.readFileSync('notes.json')
        const jsonData=bufferData.toString()
        return JSON.parse(jsonData)
    }catch(e){
        return []
    }
}

module.exports = 
{
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes:removeNotes,
    listnotes:listnotes
}

