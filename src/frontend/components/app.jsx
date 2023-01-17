import { useEffect, useState } from "react"
import { Home } from "./pages/Home"
import { ActivityList } from "./pages/ClassList"
import { Routes, Route, Link } from "react-router-dom"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { Blog } from "./pages/Blog"
import { NavBar } from "./NavBar"
import { CreateBlogpost } from "./pages/CreateBlogpost";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StickyFooter } from "./Footer";
import { UserList } from "./pages/UserList"
import { Logout } from "./pages/Logout"
import { AdminActivityList } from "./pages/AdminActivityList"
import { CreateActivity } from "./pages/CreateActivity"
import { EditUser } from "./pages/EditUser"
import { EditActivity } from "./pages/EditActivity"
import { CreateUser } from "./pages/CreateUser"
import { DeleteUser } from "./pages/DeleteUser"
import { Xml } from "./pages/Xml"
import { DeleteActivity } from "./pages/DeleteActivity"
import { BlogpostList } from "./pages/BlogpostList"
import { DeleteBlogpost } from "./pages/DeleteBlogpost"
import { EditBlogpost } from "./pages/EditBlogpost"
import { CreateActivityBooking } from "./pages/CreateActivityBooking"
import { ListActivityBookings } from "./pages/ListActivityBookings"
import { EditActivityBooking } from "./pages/EditActivityBooking"
import { DeleteActivityBooking } from "./pages/DeleteActivityBooking"
import { ConfirmBooking } from "./pages/ConfirmBooking"
import { ListMemberBookings } from "./pages/ListMemberBookings"
import { DeleteMemberBooking } from "./pages/DeleteMemberBooking"
import { MemberBookingsMemberView } from "./pages/MemberBookingsMemberView"

export const theme = createTheme({
    palette: {
      background: {
        default: "#212121",
      },
      primary: {
        main: '#bf360c',
      },
      secondary: {
        main: '#6a1b9a',
      },
      error: {
        main: '#f44336',
      },
      text: {
        primary: "#ffffff",
        secondary: "#997aac",
      },
    },
    typography: {
      fontFamily: 'Roboto',
    },
    overrides: {
      MuiButton: {
        root: {
          background: 'linear-gradient(#bf360c 15%, #EF6C00 85%)',
          border: 0,
          borderRadius: 11,
          boxShadow: '0 3px 5px 2px rgba(208, 64, 129, .4)',
          color: 'white',
          height: 48,
          padding: '0 30px',
        },
      },
    },
  });


export const App = () => {
  const [userRole, setUserRole] = useState ("guest")
  const [userId, setUserId] = useState("")
  console.log(userId)
    return <>
    <ThemeProvider theme={theme}>
    <CssBaseline />
        <header>
            <NavBar userRole={userRole}/>
        </header>
        {/*Page content here */}
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/create_activity_booking" element={<CreateActivityBooking />} />
            <Route path="/list_activity_bookings" element={<ListActivityBookings />} />
            <Route path="/edit_activity_booking/:activity_bookings_id" element={<EditActivityBooking />} />
            <Route path="/delete_activity_booking/:activity_bookings_id" element={<DeleteActivityBooking />} />
            <Route path="/create_class" element={<CreateActivity />} />
            <Route path="/class_list" element={<ActivityList />} setUserRole = {setUserRole} userRole = {userRole} />
            <Route path="/confirm_booking/:activity_bookings_id" element={<ConfirmBooking />} />
            <Route path="/list_member_bookings" element={<ListMemberBookings />} />
            <Route path="/member_bookings_member_view/:member_user_id" element={<MemberBookingsMemberView userRole = {userRole} />} setUserRole = {setUserRole} userRole = {userRole}/>
            <Route path="/delete_member_booking/:member_activity_bookings_id" element={<DeleteMemberBooking />} />
            <Route path="/admin_class_list" element={<AdminActivityList />} setUserRole = {setUserRole}/>
            <Route path="/edit_class/:activity_id" element={<EditActivity />}/>
            <Route path="/delete_class/:activity_id" element={<DeleteActivity />} />
            <Route path="/login" element={<Login setUserRole = {setUserRole}  setUserId = {setUserId}/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/edit_user/:user_id" element={<EditUser />} />
            <Route path="/list_users" element={<UserList />} />
            <Route path="/create_user" element={<CreateUser />} />
            <Route path="/delete_user/:user_id" element={<DeleteUser />} />
            <Route path="/blog/*" element={<Blog />} />
            <Route path="/list_blogposts" element={<BlogpostList />} />
            <Route path="/create_blogpost" element={<CreateBlogpost />} />
            <Route path="/delete_blogpost/:blogpost_id" element={<DeleteBlogpost />} />
            <Route path="/edit_blogpost/:blogpost_id" element={<EditBlogpost />} />
            <Route path="/xml" element={<Xml />} />
            <Route path="/logout" element={<Logout setUserRole = {setUserRole}/>} />
        </Routes>
        <StickyFooter/>
        </ThemeProvider>
    </>
}

// TO-DO:
// - Booking functionality
// - XML