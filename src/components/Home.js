import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from 'react-bootstrap/Card';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube'
import './Movie.css'



const Home = () => {
  const [movie, setMovie] = useState([])
  const [query, setQuery] = useState('')
  const [trailerUrl, setTrailerUrl] = useState('')
  const values = [true, 'xxl-down'];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [movieName, setMovieName] = useState('');

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
 
  
  const searchMovies = async(e)=>{
    e.preventDefault()
    console.log("search");
    try{
      const url = `https://api.themoviedb.org/3/search/movie?api_key=050ef506cb4501e1587b5dc3679c0915&query=${query}`
      const res = await fetch(url)
      const data = await res.json()
      setMovie(data.results)
    }
    catch(error){
      console.log("Error");
    }
  }

  const handleChange = (e)=>{
    setQuery(e.target.value)
  }

  useEffect(()=>{
    fetch ('https://api.themoviedb.org/3/movie/popular?api_key=050ef506cb4501e1587b5dc3679c0915&language=en-US&page=1')
    .then(res=>res.json())
    .then(data=>setMovie(data.results))
  },[])

  const handleClick = (item) => {
    setMovieName(item.title);
    movieTrailer(item.title)
    .then((url) => {
      const urlParams = new URLSearchParams(new URL(url).search);
      setTrailerUrl(urlParams.get('v'));
      handleShow(values)
    })
    .catch((error) => {
      console.log('Error fetching trailer:', error);
    });
  };

  const opts = {
    height: "505px",
    width: "100%",
    playerVars: {
        autoplay: 1,
    }
}


  return (
    <div style={{backgroundColor:'black'}}>
    <Navbar bg="light" expand="lg">
    <Container fluid>
      <Navbar.Brand href="/">RK Movies</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="/">Movies</Nav.Link>
          <Nav.Link href="/tvshow">Tvshow</Nav.Link>
        </Nav>
        <Form className="d-flex" onSubmit={searchMovies}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value = {query}
            onChange={handleChange}
          />
          <Button variant="outline-success" type={'submit'}>Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>


  <Carousel>
     {movie && movie.map((item)=>{
        return(
          <header key={item.id} className='Homeheader' style={{height:'500px'}}>
            <div className='headerdiv'>
            <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt=''></img>
              <div className='legend'>
                <h1>{item.original_title}</h1>
                <p>{item.overview})</p>        
                <p>TMDB Rating: {item.vote_average} <i className="fa-sharp fa-solid fa-star" style={{color:"gold"}}></i></p> 
                <Button onClick={()=>handleClick(item)} variant="primary" style={{backgroundColor: 'white', color:'black'}}>Watch Trailer</Button>       
             </div>
          </div>
        </header>
     )
    })}
    </Carousel>
    
  <div className='carddiv'>
    {movie && movie.map((item)=>{
      return(
        <Card  onClick={() => handleClick(item)}  key={item.id} style={{ width: '18rem', backgroundColor:"grey", color:"white", marginBottom:"3px", textAlign:"center", cursor:'pointer'}}>
          <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt='' />
          <Card.Body>
          <Card.Title>{item.original_title}</Card.Title>
          <Card.Text>
            TMDB Rating: {item.vote_average} <i className="fa-sharp fa-solid fa-star" style={{color:"gold"}}></i>
          </Card.Text>
          <Button variant="primary" style={{backgroundColor: 'white', color:'black'}} >Watch Trailer</Button>
          </Card.Body>
          </Card>
        )
    })}
  </div>
  <div>
    <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)} >
    <Modal.Header closeButton>
    <Modal.Title>{movieName} Trailer</Modal.Title>
    </Modal.Header>
    <Modal.Body  className='Modal'> {trailerUrl && <YouTube videoId = {trailerUrl} opts = {opts}/> }</Modal.Body>
    </Modal>
  </div>

    <div class="footer">
      <div class="share" style={{backgroundColor:"#605E5E"}}>
        <a href="https://www.facebook.com/" target="_blank" style={{color:'white', textDecoration:'none', paddingLeft:'3%', paddingRight:'3%'}}> <i class="fab fa-facebook-f"></i> facebook </a>
        <a href="https://twitter.com/" target="_blank" style={{color:'white', textDecoration:'none', paddingLeft:'3%', paddingRight:'3%'}}> <i class="fab fa-twitter"></i> twitter </a>
        <a href="https://www.instagram.com/" target="_blank" style={{color:'white', textDecoration:'none', paddingLeft:'3%', paddingRight:'3%'}}> <i class="fab fa-instagram"></i> instagram </a>
        <a href="https://in.linkedin.com/" target="_blank" style={{color:'white', textDecoration:'none', paddingLeft:'3%', paddingRight:'3%'}}> <i class="fab fa-linkedin"></i> linkedin </a>
        <a href="https://wa.me/+91" target="_blank" style={{color:'white', textDecoration:'none', paddingLeft:'3%', paddingRight:'3%'}}> <i class="fab fa-whatsapp"></i> whatsapp </a>
        <a href="tel:+91" target="_blank" style={{color:'white', textDecoration:'none', paddingLeft:'3%', paddingRight:'3%'}}> <i class="fab fa-teamspeak"></i> Call us </a>
      </div>
    </div>

    </div>
    )
  }

export default Home