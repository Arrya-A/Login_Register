import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";
import ShowModal from "./popup";
import EditModal from "./popup";
// const theme = createTheme({
//   palette: {
//     primary: white,
//     secondary: black,
//   },
// });

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const [open, setOpen] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
    const handleOpenCancel = () => {
    setOpenCancel(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenCancel(false)
  };
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const email = getValues("email");
    const password = getValues("password");

    const matchedUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      alert("Login successful!");
      navigate("/home", { state: { username: matchedUser.username } });
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <div
        style={{
          height: "100vh",
          backgroundColor: "#060a2e",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              // height: "100%",
              width: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              backgroundColor: "#01031a",
              py: 5,
            }}
          >
            <Grid container>
              <Grid item sx={0} md={2} lg={0}></Grid>
              <Grid item sx={12} md={8} lg={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">Sign In</Typography>

                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    color="success"
                    size="small"
                    // value={userData.email}
                    // onChange={e=>setUserData({...userData, email:e.target.value})}
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{
                      input: { color: "white" }, // Text color
                      label: { color: "white" }, // Label color
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "white" }, // Border color
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    size="small"
                    // value={userData.password}
                    // onChange={e=>setUserData({...userData, password:e.target.value})}
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{
                      input: { color: "white" }, // Text color
                      label: { color: "white" }, // Label color
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "white" }, // Border color
                      },
                    }}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label="Remember me"
                  />

                  <Button variant="contained" type="submit" size="small">
                    Sign in
                  </Button>
                  <Typography variant="h6" fontSize={"0.75rem"}>
                    <Link to={"/"}>Forgot your password</Link>
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "0.75rem" }}>
                    <Divider>or</Divider>
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Icon icon="flat-color-icons:google" />}
                  >
                    Sign in with Google
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Icon icon="logos:facebook" />}
                  >
                    Sign in with Facebook
                  </Button>
                  <Button variant="outlined" onClick={handleOpen}>
                    Show Modal
                  </Button>
                  <Button variant="outlined" onClick={handleOpenCancel}>
                    Cancel Modal
                  </Button>
                  <Typography variant="h6" fontSize={"0.75rem"}>
                    Don't have an account?{" "}
                    <Link to={"/register"}>Sign Up </Link>here.
                  </Typography>
                </Stack>
              </Grid>
              <Grid item sx={0} md={2} lg={0}></Grid>
            </Grid>
          </Box>
        </form>
      </div>
      {/* </ThemeProvider> */}

      <ShowModal
        open={open}
        handleClose={handleClose}
        title="show popup"
        description="show description"
      />
      <EditModal
        open={openCancel}
        handleClose={handleClose}
        title="cancel popup"
        description="cancel description"
      />
      
    </>
  );
};

export default Login;
