const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports = async (req, res, next) => {
    let id = req.body.id;
    // Fill in the code
    Employee.findById(id, (err, employee) => {
        if (err) {console.log("Error selecting: %s", err)}
    //    if (!employee) {return res.render('404', {title: "No Record Updated"})}

        employee.firstName = req.body.fname;
        employee.lastName = req.body.lname;

        employee.save({_id: req.body.id}, (err) => {
            if (err)
              console.log("Error: %s", err);
            res.redirect('/employees');
          })
        });
};
