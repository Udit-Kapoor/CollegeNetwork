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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
// import ProjectsTableData from "layouts/tables/data/ProjectsTableData";

// 

import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";

function Tables() {
  const { columns, rows } = authorsTableData();
  // const { columns: pColumns, rows: pRows } = projectsTableData();

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Canteen Items
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Your Items
                </MDTypography>
              </MDBox>
              <MDBox pt={2} mx={2} py={3}
                px={2}>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6} xl={3}>
                    <DefaultProjectCard
                      image={homeDecor1}
                      label="Canteen Item"
                      title="Burger"
                      description="Burn this to get a Burger invoice. (Valid for an hour)"
                      action={{
                        type: "internal",
                        route: "/pages/profile/profile-overview",
                        color: "info",
                        label: "Burn Now",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    <DefaultProjectCard
                      image={homeDecor4}
                      label="Canteen Item"
                      title="Pizza"
                      description="Burn this to get a Pizza invoice. (Valid for an hour)"
                      action={{
                        type: "internal",
                        route: "/pages/profile/profile-overview",
                        color: "info",
                        label: "Burn Now",
                      }}
                    />
                  </Grid>
                  {/* <Grid item xs={12} md={6} xl={3}>
                    <DefaultProjectCard
                      image={homeDecor1}
                      label="project #2"
                      title="modern"
                      description="As Uber works through a huge amount of internal management."
                      action={{
                        type: "internal",
                        route: "/pages/profile/profile-overview",
                        color: "info",
                        label: "view on blockchain",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    <DefaultProjectCard
                      image={homeDecor2}
                      label="project #1"
                      title="scandinavian"
                      description="Music is something that everyone has their own specific opinion about."
                      action={{
                        type: "internal",
                        route: "/pages/profile/profile-overview",
                        color: "info",
                        label: "view on blockchain",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    <DefaultProjectCard
                      image={homeDecor3}
                      label="project #3"
                      title="minimalist"
                      description="Different people have different taste, and various types of music."
                      action={{
                        type: "internal",
                        route: "/pages/profile/profile-overview",
                        color: "info",
                        label: "view on blockchain",
                      }}
                    />
                  </Grid> */}
                  
                </Grid>
{/*  */}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
