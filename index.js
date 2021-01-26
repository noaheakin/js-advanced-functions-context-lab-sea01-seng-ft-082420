let createEmployeeRecord = function(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

let createTimeInEvent = function(dateStamp) {
    let dateArr = dateStamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateArr[1]),
        date: dateArr[0]
    })
    return this
}

let createTimeOutEvent = function(dateStamp) {
    let dateArr = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateArr[1]),
        date: dateArr[0]
    })
    return this
}

let hoursWorkedOnDate = function(dateStamp) {
    let clockOut = this.timeOutEvents.find(shift => shift.date === dateStamp).hour
    let clockIn = this.timeInEvents.find(shift => shift.date === dateStamp).hour
    return (clockOut - clockIn) / 100

}

let wagesEarnedOnDate = function(dateStamp) {
    let hoursWorked = hoursWorkedOnDate.call(this, dateStamp) 
    return hoursWorked * this.payPerHour
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(employees, name) {
    return employees.find(employee => employee.firstName === name)
}

let calculatePayroll = function(employees) {
    let total = 0
    for (let i = 0; i < employees.length; i ++) {
        total += allWagesFor.call(employees[i])
    }
    return total
}