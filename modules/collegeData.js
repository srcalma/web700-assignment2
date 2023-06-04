const fs = require('fs')

class Data {
    constructor(students, courses) {
        this.students = students
        this.courses = courses
    }
}
  
let dataCollection = null

function initialize() {
    const initData = new Promise((resolve, reject) => {
        fs.readFile('./data/students.json', 'utf8', (err, studentDataFromFile) => {
            if (err) {
                reject('Unable to read students.json')
                return
            }

            fs.readFile('./data/courses.json', 'utf8', (err, courseDataFromFile) => {
                if (err) {
                    reject('Unable to read courses.json')
                    return
                }
                let studentData = JSON.parse(studentDataFromFile)
                let courseData = JSON.parse(courseDataFromFile)
                dataCollection = new Data(studentData, courseData)
                resolve()       
            })
        })            
    })

    return initData
}

function getAllStudents() {
    const studData = new Promise((resolve, reject) => {
        if (dataCollection.students.length === 0) {
            reject("No results returned")
        } 
        
        else {
            resolve(dataCollection.students)
        }
    })

    return studData
  }
  
  function getTAs() {
    const TAProperty = new Promise((resolve, reject) => {
        const tas = dataCollection.students.filter(student => student.TA === true)
        if (tas.length === 0) {
            reject("No results returned")
        } 
        
        else {
            resolve(tas)
        }
    })

    return TAProperty
  }
  
  function getCourses() {
    const courseData = new Promise((resolve, reject) => {
        if (dataCollection.courses.length === 0) {
            reject("No results returned")
        } 
        
        else {
            resolve(dataCollection.courses)
        }
    })

    return courseData
  }
  
  module.exports = {
    initialize,
    getAllStudents,
    getTAs,
    getCourses
  }