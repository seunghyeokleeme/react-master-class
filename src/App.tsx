import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
`;

const Box = styled(motion.div)`
  height: 340px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  background-color: white;
  width: 100px;
  height: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  border-radius: 50%;
`;

const Btn = styled(motion.button)``;

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked(prev => !prev);
  const [id, setId] = useState<null | string>(null);
  return (
    <Wrapper>
      <Grid>
        <Box
          onClick={() => setId("1")}
          layoutId="1"
          whileHover={{ x: -10, y: -10 }}
        ></Box>
        <Box
          onClick={() => setId("2")}
          layoutId="2"
          whileHover={{ x: 10, y: -10 }}
        >
          {!clicked ? <Circle layoutId="circle" /> : null}
        </Box>
        <Box
          onClick={() => setId("3")}
          layoutId="3"
          whileHover={{ x: -10, y: 10 }}
        >
          {clicked ? <Circle layoutId="circle" /> : null}
        </Box>
        <Box
          onClick={() => setId("4")}
          layoutId="4"
          whileHover={{ x: 10, y: 10 }}
        ></Box>
      </Grid>
      <Btn
        onClick={toggleClicked}
        style={{
          background: "white",
          border: "none",
          borderRadius: 10,
          width: 80,
          height: 30,
        }}
        initial={{ color: "rgb(0, 0, 255)", scale: 1 }}
        whileTap={{ color: "rgb(255, 165, 0)", scale: 1.5 }}
      >
        Switch
      </Btn>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <Box
              layoutId={id}
              style={{ width: 400, height: 400, background: "white" }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
