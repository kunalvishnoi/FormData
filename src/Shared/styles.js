import styled from 'styled-components';

export const Card = styled.div `
box-shadow: 0 1px 25px rgba(0, 0, 0, 0.15), 0 0 0 0 rgba(13, 13, 13, 0.29);    
background: #fff;
max-width: 500px;
padding: 2rem 0;
margin: 0 auto;
position: relative;
top: 50%;
transform: translateY(-50%)
`;


export const Form = styled.form `
max-width: 500px;
margin: 0 2rem;
background-color: #fff;
padding-bottom: 3rem !important;
`;

export const Button = styled.button `
background: #7367F0;
border:0;
display:flex;
margin: auto;
margin-top: 2rem;
&:hover {
    background: #CE9FFC;
}
`

export const Heading = styled.h3 `
font-family: 'Playfair Display', serif;
color: #7367F0;
text-align: center;
text-transform: uppercase;
margin-bottom:2rem;
margin-top:.25rem;
letter-spacing: 5px;
font-weight: 600;
`