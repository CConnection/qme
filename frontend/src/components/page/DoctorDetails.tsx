import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Queue } from "./Queue";

const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: "40px"
  }
}));

const doctorDatas = new Map<string, Data>([
  [
    "1",
    {
      name: "Dr. med. Max Müller",
      address: "Fuhlsbüttler Straße 123",
      type: "Dentist",
      id: 1
    }
  ],
  [
    "2",
    {
      name: "Dr. Herbert Wagner",
      address: "Hermann-Kaufmann-Straße 23",
      type: "Internist",
      id: 2
    }
  ],
  [
    "3",
    {
      name: "Dr. med. Klaus Braun",
      address: "Emil-Janßen-Straße 33",
      type: "Psychologist",
      id: 3
    }
  ]
]);

interface Data {
  name: string;
  address: string;
  type: string;
  id: number;
}

export const DoctorDetails: React.FC = () => {
  let { id } = useParams();
  const classes = useStyles();
  const { t } = useTranslation();

  const [doctorData, setDoctorData] = useState<Data | undefined>(undefined);

  useEffect(() => {
    if (id) {
      setDoctorData(doctorDatas.get(id));
    }
  }, [id]);

  return (
    <Container maxWidth="md">
      <Grid className={classes.grid} container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h1"> {t("register.headline")}</Typography>
        </Grid>
        {doctorData && (
          <Grid item xs={12} sm={12}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="body1">{doctorData.name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{doctorData.address}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{doctorData.type}</Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12} sm={12}>
          <Queue />
        </Grid>
      </Grid>
    </Container>
  );
};
