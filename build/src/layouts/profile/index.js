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
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useContext } from 'react';
import { manageFunc } from 'App';
import { getAchievements } from "api/fetchUserFood";
import { useEffect } from 'react';
import { useState } from 'react';

function Overview({}) {
  const{ wallet ,balance} = useContext(manageFunc);
  useEffect(() => {
      getBal()
  },[wallet])

    const [result, setResult] = useState(null);

    async function getBal() {
      const res = await getAchievements(wallet);
      setResult(res)
    }

  return (
    <DashboardLayout>
      <MDBox mb={2} />
      <Header wallet={wallet}>
        
        <MDBox pt={2} px={2} lineHeight={1.25}>
        <MDBox my={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
            <DefaultInfoCard
              icon="account_balance"
              title="Semester Allowance"
              description="Available"
              value="+200 NCUT"
            />
            <MDBox  my={1}>
            <MDButton variant="gradient" color="info" fullWidth>Claim</MDButton>
            </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
            <DefaultInfoCard
              icon="account_balance"
              title="Dean's List Allowance"
              description="Not Available"
              value="+200 NCUT"
            />
            <MDBox  my={1}>
            <MDButton variant="gradient" color="info" fullWidth>Claim</MDButton>
            </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
            <DefaultInfoCard
              icon="account_balance"
              title="Special Allowance"
              description="Not Available"
              value="+500 NCUT"
            />
            <MDBox  my={1}>
            <MDButton variant="gradient" color="info" fullWidth>Claim</MDButton>
            </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
            <DefaultInfoCard
              icon="account_balance"
              title="Special Allowance"
              description="Not Available"
              value="+1000 NCUT"
            />
            <MDBox  my={1}>
            <MDButton variant="gradient" color="info" fullWidth>Claim</MDButton>
            </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        </MDBox>
          <MDTypography variant="h6" fontWeight="medium">
            Achievements
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Collection
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor4}
                label="project #4"
                title="gothic"
                description="Why would anyone pick blue over pink? Pink is obviously a better color."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view on blockchain",
                }}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
