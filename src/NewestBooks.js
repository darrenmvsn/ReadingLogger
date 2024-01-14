import React from 'react';
import { Container, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './displaybooks.css';

const NewestBooks = ({ displayBooks }) => {
  return (
    <div className='book-list-container'>
      <Container>
        <h1 style={{textAlign:"center"}}>Most recent books released</h1>
        {displayBooks.length > 0 ? (
          <Grid container spacing={3}>
            {displayBooks.map((book, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={book.image}
                      alt="Book Cover"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {book.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {book.subtitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {book.authors}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>Loading..</p>
        )}
      </Container>
    </div>
  );
};

export default NewestBooks;
