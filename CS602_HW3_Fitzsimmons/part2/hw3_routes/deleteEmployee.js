const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports = async (req , res , next) => {
  let id = req.params.id;
  // Fill in the code
  Employee.findById(id, (err, employee) => {
      if (err)
          console.log("Error selecting: %s", err)
      if (!employee) return res.render('404', {title: "No Employee Record Found"});
      res.render('deleteEmployeeView', {title: "Delete Employee?", data: {
          id: employee._id,
          firstName: employee.firstName,
          lastName: employee.lastName
      }})
  })
          
  };

  