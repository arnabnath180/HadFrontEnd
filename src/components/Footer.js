import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@mui/material/styles/styled';
import { Box } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

const FooterContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 50,
  width: '100%',
  backgroundColor: 'lightgrey',
  color: 'black',
  fontSize: '1rem',
  fontWeight: 'bold',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
  marginTop: '3%'
});

const LinksContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  padding: '0 50px',
});

const LinkStyled = styled(Link)({
  textDecoration: 'none',
  color: 'black',
});

const SocialIconsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  padding: '0 50px',
});

const SocialIcon = styled(Box)({
  fontSize: '2rem',
});

function Footer() {
  return (
    <FooterContainer>
      <LinksContainer>
        <LinkStyled to="/">Home</LinkStyled>
        <LinkStyled to="/about">About Us</LinkStyled>
        <LinkStyled to="/contact">Contact Us</LinkStyled>
      </LinksContainer>
      <SocialIconsContainer>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><SocialIcon component={Facebook} /></a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><SocialIcon component={Instagram} /></a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><SocialIcon component={Twitter} /></a>
      </SocialIconsContainer>
    </FooterContainer>
  );
}

export default Footer;
