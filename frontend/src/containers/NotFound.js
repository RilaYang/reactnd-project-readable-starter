import React from "react";
import { Container, Grid, Image } from "semantic-ui-react";
import logo from "../assets/404.svg";
import { Link } from "react-router-dom";

const styles = {
  h1: {
    fontSize: '80px',
    fontWeight: 'bold',
    color: 'grey'
  }
}

export const NotFound = () => {
  return (
    <Container style={{ marginTop: "5rem" }}>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Image src={logo} />
          </Grid.Column>
          <Grid.Column>
            <h1 style={styles.h1}>404</h1>
            <p>Sorry, we can't seem to find the page you are looking for.</p>
            <Link to="/">Go to home</Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default NotFound;
