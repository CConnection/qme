import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import FaceIcon from "@material-ui/icons/Face";

const useStyles = makeStyles({
  spaceBottom: {
    marginBottom: "1.5rem !important"
  },

  spaceTop: {
    marginTop: "4rem !important"
  },

  spaceBottom2: {
    marginBottom: "1rem !important"
  },
  paper: {
    marginTop: "40px",
    padding: "32px"
  },
  headline: {
    marginBottom: "16px"
  },

  gridItem: {
    marginBottom: "16px"
  },
  grid: {
    display: "flex",
    justifyContent: "space-between"
  },
  buttons: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "space-between"
  }
});

export const QueueClient: React.FC = () => {
  let { enqueueId } = useParams();
  const { t } = useTranslation();
  const classes = useStyles();

  const [enqueueState, setEnqueueState] = useState({
    name: "-",
    type: "-",
    address: "-",
    slotNo: 0,
    estimatedTime: "00:00"
  });

  useEffect(() => {
    // console.log('get data from backend here, hopp hopp :D (PS: dont forget to use param variable!)');
    console.log(enqueueId);
    setEnqueueState({
      name: "Dr. med. Max Müller",
      type: "Dentist",
      address: "Fuhlsbüttler Straße 123, 22307 Hamburg",
      slotNo: 5,
      estimatedTime: "10:00"
    });
  }, [enqueueId]);

  // TODO implement loading animation
  return (
    <Container maxWidth="sm" className={classes.paper}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} className={classes.spaceBottom}>
          <Typography variant="h4" align="center" color="primary">
            {t("enqueued.queue_slot", { queueSlot: enqueueState?.slotNo })}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.spaceBottom}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12}>
              <FaceIcon fontSize="large" style={{ fontSize: "10rem" }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">{enqueueState?.name}</Typography>
              <hr />
              <Typography variant="h5">
                {enqueueState?.type}
                <br />
                {enqueueState?.address}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h2"
            align="center"
            className={classes.spaceBottom2}
          >
            {t("enqueued.appointment_info")}
          </Typography>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <Typography variant="h2" align="center" color="primary">
                {enqueueState?.estimatedTime}
              </Typography>
            </Grid>
            <Grid item>
              <AlarmOnIcon fontSize="large" color="primary" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
