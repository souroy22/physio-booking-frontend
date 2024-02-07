import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../apis/authApis";
import { logoutUser } from "../../store/auth/authReducer";
import LOGO_PATH from "../../assets/images/_26ff86d0-8e48-4572-92c9-e7fb02b47805.jpg";
import "./style.css";

const pages = [
  {
    name: "Login",
    url: "/signin",
    private: false,
    accessRoles: [""],
  },
  {
    name: "Signup",
    url: "/signup",
    private: false,
    accessRoles: [""],
  },
  // {
  //   name: "Doctor",
  //   url: "/doctor",
  //   private: true,
  //   accessRoles: ["Saler"],
  // },
  {
    name: "Book Appointment",
    url: "/book-appointment",
    private: true,
    accessRoles: ["Saler"],
  },
  {
    name: "Choose Slots",
    url: "/choose-slots",
    private: true,
    accessRoles: ["Doctor"],
  },
  {
    name: "My Slots",
    url: "/my-slots",
    private: true,
    accessRoles: ["Doctor"],
  },
  {
    name: "Appointments",
    url: "/appointments",
    private: true,
    accessRoles: ["User"],
  },
];

const settings = [
  { name: "Profile", url: "/profile" },
  { name: "Logout", url: null },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector(
    (state: RootState) => state.authReducer
  );
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page: { name: string; url: string }) => {
    navigate(page.url);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = async (value: { name: string; url: string | null }) => {
    if (value.name === "Logout") {
      await handleLogout();
      await dispatch(logoutUser());
      navigate("/signin");
    } else if (value.name === "Book Appointment") {
      navigate("/book-appointment");
    } else if (value.url !== null) {
      navigate(value.url);
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar
      position="fixed"
      sx={{ height: "65px", backgroundColor: "#000043" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            alt="Logo"
            src={LOGO_PATH}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            <Link to="/" className="logo-text">
              Physio
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <React.Fragment key={page.name}>
                  {isLoggedIn === page.private &&
                    page.accessRoles?.includes(user.isAdmin) && (
                      <MenuItem
                        key={page.name}
                        onClick={() => handleCloseNavMenu(page)}
                      >
                        <Typography textAlign="center">{page.name}</Typography>
                      </MenuItem>
                    )}
                </React.Fragment>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            <Link to="/" className="logo-text">
              Physio
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <React.Fragment key={page.name}>
                {isLoggedIn === page.private &&
                  page.accessRoles?.includes(user.isAdmin) && (
                    <Button
                      key={page.name}
                      onClick={() => handleCloseNavMenu(page)}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page.name}
                    </Button>
                  )}
              </React.Fragment>
            ))}
          </Box>
          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Click">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name} src={user.avatar || ""}>
                    {user.name.split("")[0]}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => handleClick(setting)}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
