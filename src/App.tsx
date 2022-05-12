import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material"
import { useState } from "react"
import { AutoForm } from "./components/AutoForm"

export default function App() {
  const [data, setData] = useState({
    name: "Name",
    age: 18,
    dateOfBirth: new Date(1995, 11, 20),
  })

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box m={2}>
        <AutoForm
          data={data}
          onChange={(prop, value) => setData({ ...data, [prop]: value })}
          onValidate={() => {}}
        />
      </Box>
    </ThemeProvider>
  )
}
