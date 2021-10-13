import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Box from '@material-ui/core/Box';
import { DataGrid } from '@material-ui/data-grid';
import { SEMESTER_LIST } from '../constants.js'
import 'react-toastify/dist/ReactToastify.css';

import AddStudent from './AddStudent';

// user selects from a list of  (year, semester) values
class Semester extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: SEMESTER_LIST.length - 1, shouldHide: 'hidden'};
  }

  componentDidMount() {
    if(this.props.is_admin) {
      this.updateShouldHide(undefined);
    } else {
      this.updateShouldHide('hidden');
    }
  }

  updateShouldHide(attr) {
    this.setState({
      ...this.state,
      shouldHide: attr
    });
  }

  onRadioClick = (event) => {
    this.setState({ selected: event.target.value });
  }

  render() {
    const icolumns = [
      {
        field: 'id',
        headerName: 'Year',
        width: 200,
        renderCell: (params) => (
          <div>
            <Radio
              checked={params.row.id === this.state.selected}
              onChange={this.onRadioClick}
              value={params.row.id}
              color="default"
              size="small"
            />
            {SEMESTER_LIST[params.row.id].year}
          </div>
        )
      },
      { field: 'name', headerName: 'Semester', width: 200 }
    ];
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Schedule - Select a Term
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="h6" color="inherit">
              {(this.props.is_admin ? "Logged in as ADMIN" : "Logged in" )}
            </Typography>
          </Toolbar>
        </AppBar>
        <div align="left" >
          <div style={{ height: 400, width: '100%', align: "left" }}>
            <DataGrid rows={SEMESTER_LIST} columns={icolumns} />
          </div>
          <Button component={Link}
            to={{
              pathname: '/schedule',
              year: SEMESTER_LIST[this.state.selected].year,
              semester: SEMESTER_LIST[this.state.selected].name
            }}
            variant="outlined" color="primary" style={{ margin: 10 }}>
            Get Schedule
          </Button>

          <AddStudent addStudent={this.AddStudent} className={this.state.shouldHide} />

        </div>
      </div>
    )
  }
}

Semester.propTypes = {
  location: (properties, propertyName, componentName) => {
       if ( (!Number.isInteger(properties.location.year)) || !(typeof properties.location.semester === 'string') || (properties.location.semester instanceof String )) {
         return new Error('AddCourse: Missing or invalid property year or semester.');
       }
    }
  }

export default Semester;