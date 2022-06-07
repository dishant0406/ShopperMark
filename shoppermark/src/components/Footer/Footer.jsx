import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
const Footer = () => {
  return (
    <footer>
      <Container>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          Copyright &copy; Shoppermark 
        </Grid>
        </Grid>
        
      </Container>
    </footer>
  )
}

export default Footer