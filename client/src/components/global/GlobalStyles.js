import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
    font-family: sans-serif;
    font-family: 'Poppins', sans-serif;

}

body:not(header){
    
    background-color:#EAEDED;
    margin:auto;
  

}



input {
    border-style: none;
    border-bottom: 1px solid lightgrey;
    fill:none;
    margin: 2% auto 2% auto;
    background: transparent;
    font-size: 1em;
 


    
}

ul, li {
    list-style: none;

}

li:hover {
    background-color: lightyellow;
}

`;
