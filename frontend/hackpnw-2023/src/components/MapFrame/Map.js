const mapTheme = createTheme({
    palette: {
      primary: {
        main: "#35a02a",
      },
      secondary: {
        main: "#f4d4d9"
      }
    }
  });

function Map() {
    return (
        <>
            <ThemeProvider theme={mapTheme}>
            </ThemeProvider>
        </>
    );
}

export default Map;
