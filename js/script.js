// CREATE AN ARRAY OF EMPLOYEES
import init from './modules/init.js'

// GET DOM ELEMENTS
let empTable    = document.querySelector('#employees')
let empCount    = document.querySelector('#empCount')

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid(init)

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        // CONFIRM THE DELETE
        if (confirm('Are you sure you want to delete this employee?')) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let rowIndex = e.target.parentNode.parentNode.rowIndex
            // REMOVE EMPLOYEE FROM ARRAY
            empTable.deleteRow(rowIndex)
        }
    }
})

// BUILD THE EMPLOYEES GRID
function buildGrid(arrEmployees) {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove()
    // REBUILD THE TBODY FROM SCRATCH
    let tbody = document.createElement('tbody')
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
        
    arrEmployees
    .then (json => {
        let data=[];
        console.log(json)
        for (let employee of json) {
            const each = [employee.id, employee.name, employee.ext, employee.email, employee.title];
            data.push(each)}
            for (let employee of data) {
                tbody.innerHTML += 
                `
                <tr>
                    <td>${employee[0]}</td>
                    <td>${employee[1]}</td>
                    <td>${employee[2]}</td>
                    <td><a href="mailto:${employee[3]}">${employee[3]}</a></td>
                    <td>${employee[4]}</td>
                    <td><button class="btn btn-sm btn-danger delete">X</button></td>
                </tr>
                `
            }


            // UPDATE EMPLOYEE COUNT
            empCount.value = `(${data.length})`
           })
    .catch(err=>console.error(err))
    
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody)
    
}