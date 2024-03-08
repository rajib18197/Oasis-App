import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Collapse } from "@mui/material";

export default function Test() {
  const [isShow, setIsShow] = React.useState(true);

  return (
    <div>
      <button onClick={() => setIsShow((show) => !show)}>Toggle</button>
      {isShow && <ControlledAccordions>nice</ControlledAccordions>}
    </div>
  );
}

function ControlledAccordions({ children }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    console.log(isExpanded, event);
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          bgcolor: "purple",
          alignItems: "center",
          justifyItems: "end",
          position: "relative",
        }}
      >
        <div>Column 1</div>
        <div>Column 2</div>
        <div>Column 3</div>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          disableGutters={true}
          sx={{
            width: "max-content",
            bgcolor: "orange",
            ".Mui-disabled": { bgcolor: "black" },
            position: "static",
          }}
          slotProps={{ transition: { unmountOnExit: true } }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{ height: "2rem" }}
          />

          <Box
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              padding: "2rem",
              bgcolor: "#73a5fc",
            }}
          >
            <AccordionDetails sx={{ bgcolor: "#727829" }}>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography>
            </AccordionDetails>
          </Box>
        </Accordion>

        {/* <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{ bgcolor: "orangered" }}
        // disableGutters={true}
        >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Users</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Personal data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          bgcolor: "purple",
          alignItems: "center",
          justifyItems: "end",
          position: "relative",
        }}
      >
        <div>Column 1</div>
        <div>Column 2</div>
        <div>Column 3</div>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          disableGutters={true}
          sx={{
            width: "max-content",
            bgcolor: "orange",
            ".Mui-disabled": { bgcolor: "black" },
            position: "static",
          }}
          slotProps={{ transition: { unmountOnExit: true } }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{ height: "2rem" }}
          />

          <Box
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              padding: "2rem",
              bgcolor: "#73a5fc",
            }}
          >
            <AccordionDetails sx={{ bgcolor: "#727829" }}>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography>
            </AccordionDetails>
          </Box>
        </Accordion>
      </Box>
    </div>
  );
}
