import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import Container from "@mui/material/Container";

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=redux"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return (
    <>
      <CssBaseline />
      <Container>
      <Box>
        <Typography align="center" variant="h4" sx={{ fontWeight: 1000 }}>
          {" "}
          Hacking news
        </Typography>
        <Box
          sx={{
           
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            
          }}
        >
          <Box
            component="form"
            onSubmit={(event) => {
              setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);

              event.preventDefault();
            }}
          >
            <Box
              component="input"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search..."
              sx={{ borderRadius: "5px", fontSize: "1rem", padding: "12px" }}
            />
            <Box
              component="button"
              sx={{ borderRadius: "5px", fontSize: "1rem", padding: "12px" }}
              type="submit"
            >
              Search
            </Box>
          </Box>
        </Box>

        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <Box>
            <List>
              {data.hits.map((item) => (
                <ListItem
                  component="a"
                  key={item.objectID}
                  target="_blank"
                  rel="noreferrer"
                  href={item.url}
               >
                  {item.title}
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>



      </Container>
     
    </>
  );
}

export default App;
