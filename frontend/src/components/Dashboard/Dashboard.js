import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/analytics/dashboard"
      );

      setDashboard(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!dashboard) return <Typography>No Data Found</Typography>;

  const StatCard = ({ title, value }) => (
    <Grid item xs={12} sm={6} md={3}>
      <Card elevation={4}>
        <CardContent>
          <Typography color="text.secondary">{title}</Typography>

          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}   sx={{ marginBottom: '20px' }}
>
        Employee Dashboard
      </Typography>

      <Grid container spacing={3}>
        <StatCard
          title="Total Employees"
          value={dashboard.totalEmployees}
        />

        <StatCard
          title="Active Employees"
          value={dashboard.activeEmployees}
        />

        <StatCard
          title="Inactive Employees"
          value={dashboard.inactiveEmployees}
        />

        <StatCard
          title="Recent Employees"
          value={dashboard.recentEmployees}
        />

        <StatCard
          title="Average Salary"
          value={`₹${Number(
            dashboard.averageSalary._avg.salary
          ).toLocaleString()}`}
        />

        <StatCard
          title="Highest Salary"
          value={`₹${Number(
            dashboard.highestSalary._max.salary
          ).toLocaleString()}`}
        />

        <StatCard
          title="Lowest Salary"
          value={`₹${Number(
            dashboard.lowestSalary._min.salary
          ).toLocaleString()}`}
        />
      </Grid>

      <Box mt={5}>
        <Typography variant="h5" mb={3}   sx={{ marginBottom: '20px' }}
>
          Salary by Department
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Department</TableCell>
                <TableCell>Employees</TableCell>
                <TableCell>Average</TableCell>
                <TableCell>Minimum</TableCell>
                <TableCell>Maximum</TableCell>
                <TableCell>Total Salary</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {dashboard.salaryByDepartment.map((dept) => (
                <TableRow key={dept.departmentId}>
                  <TableCell>{dept.departmentName}</TableCell>

                  <TableCell>{dept._count._all}</TableCell>

                  <TableCell>
                    ₹{Number(dept._avg.salary).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    ₹{Number(dept._min.salary).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    ₹{Number(dept._max.salary).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    ₹{Number(dept._sum.salary).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box mt={5}>
        <Typography variant="h5" mb={3}   sx={{ marginBottom: '20px', marginTop: '20px' }}
>
          Salary by Designation
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Designation</TableCell>
                <TableCell>Employees</TableCell>
                <TableCell>Average</TableCell>
                <TableCell>Minimum</TableCell>
                <TableCell>Maximum</TableCell>
                <TableCell>Total Salary</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {dashboard.salaryByDesignation.map((item) => (
                <TableRow key={item.designationId}>
                  <TableCell>{item.designationName}</TableCell>

                  <TableCell>{item._count._all}</TableCell>

                  <TableCell>
                    ₹{Number(item._avg.salary).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    ₹{Number(item._min.salary).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    ₹{Number(item._max.salary).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    ₹{Number(item._sum.salary).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}