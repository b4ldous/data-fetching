import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { CircularProgress, Typography } from "@mui/material";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null); // ⬅️ nueva variable de estado para guardar un mensaje de error

  useEffect(() => {
    if (isLoading) {
      async function fetchData() {
        try {
          const response = await fetch(
            "https://dog.ceo/api/breeds/image/random"
          );
          if (response.ok) {
            const dog = await response.json();
            setImageUrl(dog.message);
            setError(null);
            setIsLoading(false);
          } else {
            setError("Hubo un error al obtener el perrito");
          }
        } catch (error) {
          setError("No pudimos hacer la solicitud para obtener el perrito");
        }
      }
      fetchData();
    }
  }, [isLoading]);
  const randomDog = () => {
    setIsLoading(true); // ⬅️ simplemente actualizamos isLoading a true
  };
  if (isLoading) {
    return (
      <div>
         <Paper elevation={24} sx={{ width: "500px", height: "400px", margin: "auto" }}>
         <CircularProgress color="inherit" /> loading... 
            </Paper>
        
          
          
        
      </div>
    );
  }
  if (error) {
    // ⬅️ mostramos el error (si es que existe)
    return (
      <div className="App">
        <h1>{error}</h1>
        <button onClick={randomDog}>Volver a intentarlo</button>
      </div>
    );
  }
  return (
    <>
      <CssBaseline />
      <Box>
        <Box sx={{ overflow: "auto" }}>
          <Box>
            <Typography sx={{ fontWeight: 1000 }} align="center" variant="h4">
              Random Dog
            </Typography>
            <Paper elevation={24} sx={{ width: "500px", margin: "auto" }}>
              <Box sx={{ padding: "auto" }}>
                {" "}
                <img
                  style={{
                    width: "500px",
                    height: "400px",
                    objectFit: "cover",
                  }}
                  src={imageUrl}
                  alt="Random dog"
                />
              </Box>
              <Box sx={{ textAlign: "center", padding: "20px" }}>
                <Button
                  sx={{
                    width: "200px",
                    color: "white",
                    borderRadius: "25px",
                    background:
                      "linear-gradient(90deg, rgba(9,9,121,1) 17%, rgba(0,212,255,1) 100%)",
                  }}
                  onClick={randomDog}
                >
                  Random
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
}
