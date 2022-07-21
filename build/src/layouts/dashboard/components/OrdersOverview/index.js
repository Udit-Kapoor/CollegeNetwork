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

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Add Food Item
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox my={1} mx={2} >
        <MDInput type="text" label="Item Name"  fullWidth/>
      </MDBox>
      <MDBox my={1} mx={2} mb={0}>
        <MDInput type="text" label="Item Price"  fullWidth/>
      </MDBox>
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

export default OrdersOverview;
