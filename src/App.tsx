import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material"
import { useState } from "react"
import { AutoForm } from "./components/AutoForm"

type TestDataType = {
  firstName: string
  lastName: string
  age: number
  dateOfBirth: Date
  undefinedValue?: string
  nullValue: string | null
}

export default function App() {
  const [data, setData] = useState<TestDataType>({
    firstName: "First Name",
    lastName: "Last Name",
    age: 18,
    dateOfBirth: new Date(1995, 11, 20),
    nullValue: null,
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
        <AutoForm<TestDataType>
          data={data}
          onChange={(prop, value) => setData({ ...data, [prop]: value })}
          onValidate={() => {}}
        />
      </Box>
    </ThemeProvider>
  )
}
