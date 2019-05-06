import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 345,
    //marginTop: 400,
    // position: "relative"
  },
  media: {
    height: 100,
  },
};

function MediaCard(props) {
  const { classes, image, name, rating, address, handleClick, listId } = props;
  return (
    <Card className={classes.card} onClick={() => handleClick(listId)}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Google Place"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography component="p">
            {address}
          </Typography>
          <Typography component="p">
            {"Rating: " + rating}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);