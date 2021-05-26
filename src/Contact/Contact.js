import react, { useEffect, useState } from "react";
import { Avatar, Card, Typography, CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";

const useStyles = makeStyles((theme) => ({
  cardMatched: {
    backgroundColor: "#ffeb00",
    lign: "left",
  },
  avatar: {
    margin: "auto",
    marginTop: 16,
  },
  EmailIcon: { marginLeft: 16, marginRight: 16 },
  PhoneIcon: { marginLeft: 16, marginRight: 16 },
}));

function Contact(props) {
  const classes = useStyles();

  const [isMatched, setIsMatched] = useState(false);

  const contact = props.contact;
  const search = props.search;
  const gender = props.gender;

  useEffect(() => {
    setIsMatched(isSearchMatched() && isGenderMatched());

    function isSearchMatched() {
      const regex = new RegExp(search, "i");
      return (
        search.length > 0 &&
        (regex.test(contact.name.first) || regex.test(contact.name.last))
      );
    }

    function isGenderMatched() {
      return (
        gender === "All Genders" ||
        (gender === "Male" && contact.gender === "male") ||
        (gender === "Female" && contact.gender === "female")
      );
    }
  }, [search, gender, contact.gender, contact.name.first, contact.name.last]);

  return (
    <react.Fragment>
      <Card className={isMatched ? classes.cardMatched : ""}>
        <Avatar
          className={classes.avatar}
          alt="Remy Sharp"
          src={contact.picture.thumbnail}
        />
        <CardHeader
          paddingBottom={0}
          align="center"
          className={classes.CardHeader}
          title={
            <center>
              <span>
                {" "}
                {contact.name.first} {contact.name.last}
              </span>
              <span>
                {" "}
                {contact.gender === "female" ? (
                  <span
                    class="iconify"
                    data-icon="mdi-gender-female"
                    data-inline="false"
                  ></span>
                ) : (
                  <span
                    class="iconify"
                    data-icon="mdi:gender-male"
                    data-inline="false"
                  ></span>
                )}
              </span>
            </center>
          }
        />

        <Typography>
          <EmailIcon className={classes.EmailIcon} />
          {contact.email}
          <br></br>
          <PhoneIcon className={classes.PhoneIcon} />
          {contact.phone}
        </Typography>
      </Card>
    </react.Fragment>
  );
}
export default Contact;
