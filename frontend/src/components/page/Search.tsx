import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: "82px"
  },
  typography: {},
  paper: {},
  table: {
    minWidth: 650
  }
}));

interface Data {
  name: string;
  address: string;
  type: string;
  id: number;
}

export const Search: React.FC = () => {
  const classes = useStyles();

  const [zipCode, setZipCode] = useState<number>(0);
  const [doctorData, setDoctorData] = useState<Data[]>([]);

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let zipCodeString = Number(event.currentTarget.value);
    if (isNaN(zipCodeString)) {
      console.log(`zip code is not a number: ${zipCodeString}`);
      return;
    }

    setZipCode(zipCodeString);
  };

  const renderDoctorDataTable = (data: Data[]) => {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
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
                  <Link href={`/doctor/${row.id}`}>{row.name}</Link>
                </TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  useEffect(() => {
    if (zipCode === 22307) {
      setDoctorData([
        {
          name: "Dr. Max Müller",
          address: "Fuhlsbüttler Straße 123",
          type: "Dentist",
          id: 1
        },
        {
          name: "Dr. Herbert Wagner",
          address: "Hermann-Kaufmann-Straße 23",
          type: "Internist",
          id: 2
        },
        {
          name: "Dr. med. Klaus Braun",
          address: "Emil-Janßen-Straße 33",
          type: "Psychologist",
          id: 3
        }
      ]);
    }
  }, [zipCode]);

  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <Grid className={classes.grid} container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h2">{t("search.headline")}</Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <form noValidate autoComplete="off">
            <TextField
              id="standard-password-input"
              label="Enter postal code"
              onChange={handleZipCodeChange}
              fullWidth
            />
          </form>
        </Grid>

        <Grid item xs={12} sm={12}>
          {renderDoctorDataTable(doctorData)}
        </Grid>
      </Grid>
    </Container>
  );
};
