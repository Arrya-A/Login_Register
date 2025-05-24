// import {
//   Box,
//   Button,
//   Checkbox,
//   Divider,
//   FormControlLabel,
//   Grid,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { Link, useNavigate } from "react-router-dom";
// import Home from "./Home";

// const schema = yup.object().shape({
//   username: yup.string().required("Username is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup
//     .string()
//     .required("Password is required")
//     .min(8, "Password must be at least 8 characters")
//     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .matches(/[a-z]/, "Must contain atlest one lowercase")
//     .matches(/[0-9]/, "Must contain atleast one number")
//     .matches(/[!@#$%^&*()_+=-]/, "must contain atleast one special character"),
// });

// const Auth = ({ insideRegister }) => {
//   // const [userData, setUserData] = useState({
//   //   username: "",
//   //   email: "",
//   //   password: "",
//   // });
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     getValues,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//     const storedData = JSON.parse(localStorage.getItem("users")) || [];
//     const username = getValues("username");
//     const email = getValues("email");
//     const password = getValues("password");
//     const registeredUser = storedData.find(
//       (user) => user.email == email && user.password == password
//     );

//     if (registeredUser) {
//       alert("Account already exixts");
//     } else {
//       storedData.push(data);
//       localStorage.setItem("users", JSON.stringify(storedData));
//       navigate("/");
//     }
//   };

//   const handleLogin = () => {
//     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
//     const email = getValues("email");
//     const password = getValues("password");

//     const matchedUser = storedUsers.find(
//       (user) => user.email === email && user.password === password
//     );

//     if (matchedUser) {
//       alert("Login successful!");
//       navigate("/home", { state: { username: matchedUser.username } });
//     } else {
//       alert("Invalid email or password");
//     }
//   };

//   return (
//     <>
//       <div
//         style={{
//           height: "100vh",
//           backgroundColor: "#060a2e",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           color: "white",
//         }}
//       >
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Box
//             sx={{
//               // height: "100%",
//               width: 400,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               borderRadius: 2,
//               backgroundColor: "#01031a",
//             }}
//           >
//             <Grid container>
//               <Grid item sx={0} md={2} lg={0}></Grid>
//               <Grid item sx={12} md={8} lg={12}>
//                 <Stack spacing={2}>
//                   <Typography variant="h6">
//                     Sign {insideRegister ? "Up" : "In"}
//                   </Typography>
//                   {insideRegister && (
//                     <TextField
//                       fullWidth
//                       label="User Name"
//                       variant="outlined"
//                       // value={userData.username}
//                       // onChange={e=>setUserData({...userData, username:e.target.value})}
//                       {...register("username")}
//                       error={!!errors.username}
//                       helperText={errors.username?.message}
//                       sx={{
//                         input: { color: "white" }, // Text color
//                         label: { color: "white" }, // Label color
//                         "& .MuiOutlinedInput-root": {
//                           "& fieldset": { borderColor: "white" }, // Border color
//                         },
//                       }}
//                     />
//                   )}

//                   <TextField
//                     fullWidth
//                     label="Email"
//                     variant="outlined"
//                     color="success"
//                     // value={userData.email}
//                     // onChange={e=>setUserData({...userData, email:e.target.value})}
//                     {...register("email")}
//                     error={!!errors.email}
//                     helperText={errors.email?.message}
//                     sx={{
//                       input: { color: "white" }, // Text color
//                       label: { color: "white" }, // Label color
//                       "& .MuiOutlinedInput-root": {
//                         "& fieldset": { borderColor: "white" }, // Border color
//                       },
//                     }}
//                   />

//                   <TextField
//                     fullWidth
//                     label="Password"
//                     variant="outlined"
//                     // value={userData.password}
//                     // onChange={e=>setUserData({...userData, password:e.target.value})}
//                     {...register("password")}
//                     error={!!errors.password}
//                     helperText={errors.password?.message}
//                     sx={{
//                       input: { color: "white" }, // Text color
//                       label: { color: "white" }, // Label color
//                       "& .MuiOutlinedInput-root": {
//                         "& fieldset": { borderColor: "white" }, // Border color
//                       },
//                     }}
//                   />
//                   {!insideRegister && (
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           sx={{
//                             color: "white",
//                             "&.Mui-checked": {
//                               color: "white",
//                             },
//                           }}
//                         />
//                       }
//                       label="Remember me"
//                     />
//                   )}

//                   {insideRegister ? (
//                     <>
//                       <Button variant="contained" type="submit">
//                         Register
//                       </Button>
//                       <Typography variant="h6">
//                         Already have an account? <Link to={"/"}>Sign In </Link>
//                         here.
//                       </Typography>
//                     </>
//                   ) : (
//                     <>
//                       <Button variant="contained"  onClick={handleLogin}>
//                         Sign in
//                       </Button>
//                       <Typography variant="h6">
//                         <Link to={"/"}>Forgot your password</Link>
//                       </Typography>
//                       <Typography variant="h6">
//                         <Divider>or</Divider>
//                       </Typography>
//                       <Button variant="contained" onClick={handleLogin}>
//                         Sign in with Google
//                       </Button>
//                       <Button variant="contained" onClick={handleLogin}>
//                         Sign in with Facebook
//                       </Button>
//                       <Typography variant="h6">
//                         Don't have an account?{" "}
//                         <Link to={"/register"}>Sign Up </Link>here.
//                       </Typography>
//                     </>
//                   )}
//                 </Stack>
//               </Grid>
//               <Grid item sx={0} md={2} lg={0}></Grid>
//             </Grid>
//           </Box>
//         </form>
//       </div>
//     </>

//     // <>
//     //   <form onSubmit={handleSubmit(onSubmit)}>
//     //     <Box
//     //       sx={{
//     //         "&>:not(style)": {
//     //           m: 1,
//     //           width: 400,
//     //           display: "flex",
//     //           justifyContent: "center",
//     //         },
//     //         p: 5,
//     //         m: 5,
//     //         height: "100%",
//     //         display: "flex",
//     //         flexDirection: "column",
//     //         alignItems: "center",
//     //       }}
//     //     >
//     //       <Typography variant="h6" gutterBottom>
//     //         Sign {insideRegister ? "Up" : "In"}
//     //       </Typography>
//     //       {insideRegister && (
//     //         <TextField
//     //           fullWidth
//     //           label="User Name"
//     //           variant="outlined"
//     //           // value={userData.username}
//     //           // onChange={e=>setUserData({...userData, username:e.target.value})}
//     //           {...register("username")}
//     //           error={!!errors.username}
//     //           helperText={errors.username?.message}
//     //         />
//     //       )}

//     //       <TextField
//     //         fullWidth
//     //         label="Email"
//     //         variant="outlined"
//     //         // value={userData.email}
//     //         // onChange={e=>setUserData({...userData, email:e.target.value})}
//     //         {...register("email")}
//     //         error={!!errors.email}
//     //         helperText={errors.email?.message}
//     //       />

//     //       <TextField
//     //         fullWidth
//     //         label="Password"
//     //         variant="outlined"
//     //         // value={userData.password}
//     //         // onChange={e=>setUserData({...userData, password:e.target.value})}
//     //         {...register("password")}
//     //         error={!!errors.password}
//     //         helperText={errors.password?.message}
//     //       />

//     //       {insideRegister ? (
//     //         <>
//     //           <Button variant="contained" type="submit">
//     //             Register
//     //           </Button>
//     //           <Typography variant="h6">
//     //             Already have an account? <Link to={"/"}>Sign In </Link>here.
//     //           </Typography>
//     //         </>
//     //       ) : (
//     //         <>
//     //           <Button variant="contained" onClick={handleLogin}>
//     //             Login
//     //           </Button>
//     //           <Typography variant="h6">
//     //             New User? <Link to={"/register"}>Sign Up </Link>here.
//     //           </Typography>
//     //         </>
//     //       )}
//     //     </Box>
//     //   </form>
//     // </>
//   );
// };

// export default Auth;
