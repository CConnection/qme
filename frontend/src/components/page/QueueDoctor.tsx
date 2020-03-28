import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: "40px"
  }
}));

interface Data {
  name: string;
  address: string;
  phone: string;
}

export const QueueDoctor: React.FC = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [patientsData, setPatientsData] = useState<Data[]>([
    { name: "Max Müller", address: "Hauptstaße 12", phone: "0152 34841890" },
    { name: "Herbert Meyer", address: "Am Hang 44", phone: "0162 3423290" },
    { name: "Klaus Meyer", address: "Am Wald 1", phone: "0152 3209342098" }
  ]);

  const [currentPatientsData, setCurrentPatientsData] = useState<
    Data | undefined
  >({
    name: "Klaus Jensen",
    address: "Hinter dem Walde 44",
    phone: "0162 029349234"
  });

  const handleAddEmergency = () => {
    setPatientsData(
      [{ name: "EMERGENCY!", address: "", phone: "" }].concat(patientsData)
    );
  };

  const handleDoneWithPatient = () => {
    if (patientsData.length > 0) {
      if (patientsData[0].name !== "EMERGENCY!") {
        enqueueSnackbar(
          `${patientsData[0].name} will receive an email that he is the next patient!`,
          { variant: "info" }
        );
      }
      setCurrentPatientsData(patientsData[0]);
      patientsData.shift();
      return;
    }
    setCurrentPatientsData(undefined);
  };

  const renderPatientsDataTable: React.FC<Data[]> = data => {
    return (
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell align="right">address</TableCell>
              <TableCell align="right">type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderDetailsArea: React.FC = () => {
    if (currentPatientsData) {
      if (currentPatientsData.name === "EMERGENCY!") {
        return (
          <Box>
            <Typography variant="body1">
              Your patient is an emergency. The next scheduled patient was
              informed that there is one additional person in the queue.
            </Typography>
          </Box>
        );
      }
      return (
        <Box>
          <Typography variant="body1">
            Your patient is <br />
            {currentPatientsData.name} <br />
            {currentPatientsData.address} <br />
            {currentPatientsData.phone} <br />
          </Typography>
        </Box>
      );
    }
    return (
      <Box>
        <Typography variant="body1">
          There are no more patients in your queue. Thank you for your services
          in these hard times and take a break!
        </Typography>
      </Box>
    );
  };

  return (
    <Container maxWidth="md">
      <Grid container direction="column" spacing={8} className={classes.grid}>
        <Grid item xs={12} sm={12}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h4">Dr. Müller's Queue</Typography>
            </Grid>
            <Grid item>{renderDetailsArea({})}</Grid>
            <Grid item>
              <Button
                onClick={handleDoneWithPatient}
                color={"primary"}
                variant="contained"
              >
                Done with current patient
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h4">Queued Patients</Typography>
            </Grid>
            <Grid item>{renderPatientsDataTable(patientsData)}</Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            onClick={handleAddEmergency}
            color={"secondary"}
            variant={"contained"}
            fullWidth
          >
            add emergency
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
