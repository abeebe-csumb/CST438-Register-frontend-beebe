import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import {SERVER_URL} from '../constants.js'

// properties email address & student name are required
class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false, email: "", name: "" };
      };

      handleClickOpen = () => {
        this.setState( {open:true} );
      };
  
      handleClose = () => {
        this.setState( {open:false} );
      };

      handleChange = (event) => {
        const value = event.target.value;
        this.setState({
          ...this.state,
          [event.target.name]: value
        });
      }

      handleAdd = () => {
        const student = {"email": this.state.email, "name": this.state.name};
        this.addStudent(student);
        this.handleClose();
     }

      // Add student
      addStudent = (student) => {
        const token = Cookies.get('XSRF-TOKEN');
    
        fetch(`${SERVER_URL}/student/addStudent`,
          { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json',
                      'X-XSRF-TOKEN': token  }, 
            body: JSON.stringify(student)
          })
        .then(res => {
            if (res.ok) {
              toast.success("Student successfully added", {
                  position: toast.POSITION.BOTTOM_LEFT
              });
            } else {
              toast.error("Error when adding", {
                  position: toast.POSITION.BOTTOM_LEFT
              });
              console.error('Post http status =' + res.status);
            }})
        .catch(err => {
          toast.error("Error when adding", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            console.error(err);
        })
      } 

      render() {
          return (
            <div>
              <Button variant="outlined" color="secondary" style={{margin: 10}} onClick={this.handleClickOpen}>
                Add Student
              </Button>
              <Dialog open={this.state.open} onClose={this.handleClose}>
                  <DialogTitle>Add Student</DialogTitle>
                  <DialogContent>
                    <TextField autoFocus fullWidth label="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    <TextField autoFocus fullWidth label="name" name="name" value={this.state.name} onChange={this.handleChange} />
                  </DialogContent>
                  <DialogActions>
                    <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                    <Button color="primary" onClick={this.handleAdd}>Add</Button>
                  </DialogActions>
                </Dialog>
                <ToastContainer autoClose={1500} />    
            </div>
          );
      }

}

export default AddStudent;