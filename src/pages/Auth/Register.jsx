import {
  Box,
  Button,
  Divider,
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

const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain atlest one lowercase")
    .matches(/[0-9]/, "Must contain atleast one number")
    .matches(/[!@#$%^&*()_+=-]/, "must contain atleast one special character"),
});

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    const storedData = JSON.parse(localStorage.getItem("users")) || [];
    const username = getValues("username");
    const email = getValues("email");
    const password = getValues("password");
    const registeredUser = storedData.find(
      (user) => user.email == email && user.password == password
    );

    if (registeredUser) {
      alert("Account already exixts");
    } else {
      storedData.push(data);
      localStorage.setItem("users", JSON.stringify(storedData));
      navigate("/");
    }
  };

  return (
    <>
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
              height: "100%",
              width: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              backgroundColor: "#01031a",
              py:5
            }}
          >
            <Grid container>
              <Grid item sx={0} md={2} lg={0}></Grid>
              <Grid item sx={12} md={8} lg={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">Sign Up</Typography>

                  <TextField
                    fullWidth
                    label="User Name"
                    variant="outlined"
                    size="small"
                    // value={userData.username}
                    // onChange={e=>setUserData({...userData, username:e.target.value})}
                    {...register("username")}
                    error={!!errors.username}
                    helperText={errors.username?.message}
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

                  <Button size="small" variant="contained" type="submit" >
                    Sign Up
                  </Button>
                  <Typography sx={{ fontSize: "0.75rem" }} variant="h6">
                    Already have an account? <Link to={"/"}>Sign In </Link>
                    here.
                  </Typography>

                  <Typography sx={{ fontSize: "0.75rem" }} variant="h6">
                    <Divider>or</Divider>
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<Icon icon="flat-color-icons:google" />}
                  >
                    Sign up with Google
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<Icon icon="logos:facebook" />}
                  >
                    Sign up with Facebook
                  </Button>
                </Stack>
              </Grid>
              <Grid item sx={0} md={2} lg={0}></Grid>
            </Grid>
          </Box>
        </form>
      </div>
    </>
  );
};

export default Register;
