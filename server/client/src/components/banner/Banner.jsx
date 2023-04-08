
import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    position:relative;
    width: 100%;
    background: url(https://images.pexels.com/photos/267367/pexels-photo-267367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2) center/55% no-repeat #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-size: cover;
    

`;

const Heading = styled(Typography)`
    position:absolute;
    bottom:8px;
    font-size: 16px;
    letter-spacing:9px;
    color: #FFFFFF;
    line-height: 1
`;


const Banner = () => {
    
    return (
        <Image>
        <Heading>HAPPY BLOGGING 😍 </Heading>
        </Image>
    )
}

export default Banner;