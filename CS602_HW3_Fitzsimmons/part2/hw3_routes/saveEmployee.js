const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports = async (req , res , next) => {
 
    // Fill in the code
    let employee = new Employee( {
      firstName: req.body.fname,
      lastName: req.body.lname
    });

    employee.save(err => {
      if (err)
        console.log("Error: %s", err);
      res.redirect('/employees');
    })
  };
