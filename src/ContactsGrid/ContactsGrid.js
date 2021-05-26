import React, { useEffect, useState } from "react";
import Contacts from "../Contact/Contact";
import { Typography, Button, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const NUM_OF_RESULT = 9;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: 64,
  },
  loadMore: {
    marginTop: 16,
  },
}));

export default function ContactsGrid({ search, gender }) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    try {
      const sendRequest = async () => {
        const contacts = await fetchContacts();
        setContacts((oldItems) => [...oldItems, ...contacts.results]);
      };
      sendRequest();
    } catch (err) {}

    async function fetchContacts() {
      console.log(`page = ${page}`);
      const response = await fetch(
        `https://randomuser.me/api/?page=${page}&results=${NUM_OF_RESULT}&seed=abc`
      );
      return response.json();
    }
  }, [page]);

  async function loadMore() {
    setPage((prev) => prev + 1);
  }

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <div className={classes.root}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {contacts.map((elem) => (
              <Grid item xs={4} key={contacts.indexOf(elem)}>
                <Contacts contact={elem} search={search} gender={gender} />
              </Grid>
            ))}
          </Grid>
          <Typography align="center">
            <Button
              onClick={loadMore}
              className={classes.loadMore}
              variant="contained"
              href="#contained-buttons"
              style={{
                textAlign: "center",
                backgroundColor: "#555555",
                color: "#ffffff",
              }}
            >
              Load more
            </Button>
          </Typography>
        </div>
      </Container>
    </React.Fragment>
  );
}
