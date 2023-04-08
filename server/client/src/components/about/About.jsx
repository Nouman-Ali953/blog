import { Box, styled, Typography, Link } from "@mui/material";
import { GitHub, Instagram, Email } from "@mui/icons-material";

const Banner = styled(Box)`
  background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
  width: 100%;
  height: 50vh;
  background-position: left 0px bottom 0px;
  background-size: cover;
`;

const Wrapper = styled(Box)`
  padding: 20px;
  text-align: center;
  & > h3,
  & > h5 {
    margin-top: 20px;
    text-align: center;
  }
`;

const Text = styled(Typography)`
  color: #878787;
  text-align: center;
`;

const Name = styled(Typography)`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 30px;
  padding-bottom: 10px;
  text-align:center;
  letter-spacing: 2px;
`;
const About = () => {
  return (
    <Box>
      <Banner />
      <Wrapper>
        <Name variant="h3">Nouman Mukhtar🙂</Name>
        <Text variant="h6">
          I'm a MERN STACK DEVELOPER from Pakistan. I've built websites, desktop
          applications and corporate software.
          <br />
          If you are interested, you can view some of my favorite projects
          here&nbsp;
          <Box component="span" style={{ marginLeft: 5 }}>
            <Link
              href="https://github.com/Nouman-Ali953"
              color="inherit"
              target="_blank"
            >
              <GitHub />
            </Link>
          </Box>
        </Text>
        <Text variant="h5">
          &nbsp;Need something built or simply want to have chat? Reach out to
          me on&nbsp;
          <Box component="span" style={{ marginLeft: 5 }}>
            <Link href="#" color="inherit" target="_blank">
              <Instagram />
            </Link>
          </Box>
          &nbsp;or send me an Email&nbsp;
          <Link
            href="mailto:nauman.9533@gmail.com?Subject=This is a subject"
            target="_blank"
            color="inherit"
          >
            <Email />
          </Link>
          .
        </Text>
      </Wrapper>
    </Box>
  );
};

export default About;
