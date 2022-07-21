/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import * as React from 'react';
import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Data

function Projects() {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Send Achievement NFT
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox my={1} mx={2} >
        <MDInput type="text" label="Send to"  fullWidth/>
      </MDBox>
      <MDBox my={1} mx={2} mb={0}>
      <FormControl fullWidth style={{height:"45px"}} >
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          style={{height:"45px"}}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      </MDBox>
      {/* { fields['revenueGenerated'] === 'Yes' ?
                   <>
                       <label htmlFor="numberOfUsers">Sample Yes</label>
                       <input type="text"
                           name="numberOfUsers"
                       />
                   </>
                   : null
      }  */}

      <MDBox my={1} mx={2} >
        <MDTypography variant="caption">
          Add Food Image
        </MDTypography>
        <MDInput type="file" fullWidth/>
      </MDBox>
      <MDBox my={2} mx={2}  >
          <MDButton variant="gradient" color="info" fullWidth>Add</MDButton>
      </MDBox>
    </Card>

  );
}

export default Projects;
