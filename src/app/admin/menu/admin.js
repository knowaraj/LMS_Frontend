"use client";
import { AccessTime, Add, ExpandLess, ExpandMore, ListAlt, Logout, Menu, Person } from "@mui/icons-material";
import { Box, Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import BookIcon from '@mui/icons-material/Book';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { removeToken } from "../../util/authUtil";
import Image from "next/image"; 

export default function AdminSidebar({ drawerOpen, toggleDrawer }) {
  const [openUser, setOpenUser] = useState(true); 
  const [openBooks, setOpenBooks] = useState(false);
  const [openIssued, setOpenIssued] = useState(false);  

  const router = useRouter();

  const routToPage = (url) => {
    router.push(url);
  };

  // Toggle the "User" menu
  const toggleUserMenu = () => setOpenUser(!openUser);

  // Toggle the "Books" menu
  const toggleBooksMenu = () => setOpenBooks(!openBooks);

  // Toggle the "Issued" menu
  const toggleIssuedMenu = () => setOpenIssued(!openIssued);

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerOpen ? 240 : 60,
        flexShrink: 0,
        backgroundColor: '#1976d2', 
        "& .MuiDrawer-paper": {
          width: drawerOpen ? 240 : 60,
          boxSizing: "border-box",
          transition: "width 0.3s ease",
          backgroundColor: '#1976d2',
        },
      }}
    >
      <Box
        sx={{
          width: drawerOpen ? 240 : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerOpen ? 240 : 60,
            boxSizing: "border-box",
            transition: "width 0.3s",
            backgroundColor: '#1976d2', 
          },
        }}
      >
        {/* Clickable Logo */}
        <Box sx={{ textAlign: "center", marginBottom: 4, cursor: 'pointer' }} onClick={toggleDrawer}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={120} 
            height={120}
            layout="intrinsic"
          />
        </Box>

        {/* Project Name */}
        {drawerOpen && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "white",
              marginBottom: 8,
              paddingLeft: 8, 
            }}
          >
            BookVault
          </Typography>
        )}

      </Box>

      {/* Space before the menu items */}
      <Box sx={{ paddingTop: 4 }} />

      <List>
        {/* User Menu */}
        <ListItem onClick={toggleUserMenu} sx={{ color: "white" }}>
          <ListItemIcon>
            <Person sx={{ color: "white" }} />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="User" sx={{ color: "white" }} />}
          {openUser ? <ExpandLess sx={{ color: "white" }} /> : <ExpandMore sx={{ color: "white" }} />}
        </ListItem>
        <Collapse in={openUser} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon onClick={() => routToPage("/adduser")}>
                <Add sx={{ color: "white" }} />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Add" sx={{ color: "white" }} />}
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon onClick={() => routToPage("/listall")}>
                <ListAlt sx={{ color: "white" }} />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="List" sx={{ color: "white" }} />}
            </ListItem>
          </List>
        </Collapse>

        <Divider sx={{ backgroundColor: "white" }} />

        {/* Books Menu */}
        <ListItem onClick={toggleBooksMenu} sx={{ color: "white" }}>
          <ListItemIcon>
            <BookIcon sx={{ color: "white" }} />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Books" sx={{ color: "white" }} />}
          {openBooks ? <ExpandLess sx={{ color: "white" }} /> : <ExpandMore sx={{ color: "white" }} />}
        </ListItem>
        <Collapse in={openBooks} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon onClick={() => routToPage("/books/addbook")}>
                <Add sx={{ color: "white" }} />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Add Book" sx={{ color: "white" }} />}
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon onClick={() => routToPage("/books/list")}>
                <ListAlt sx={{ color: "white" }} />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Book List" sx={{ color: "white" }} />}
            </ListItem>
          </List>
        </Collapse>

        <Divider sx={{ backgroundColor: "white" }} />

        {/* Issued Menu */}
        <ListItem onClick={toggleIssuedMenu} sx={{ color: "white" }}>
          <ListItemIcon>
            <AccessTime sx={{ color: "white" }} />
          </ListItemIcon>
          {drawerOpen && <ListItemText primary="Issued" sx={{ color: "white" }} />}
          {openIssued ? <ExpandLess sx={{ color: "white" }} /> : <ExpandMore sx={{ color: "white" }} />}
        </ListItem>
        <Collapse in={openIssued} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon onClick={() => routToPage("/issue/ibook")}>
                <Add sx={{ color: "white" }} />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Issue Book" sx={{ color: "white" }} />}
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon onClick={() => routToPage("/issue/ilist")}>
                <ListAlt sx={{ color: "white" }} />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Issued List" sx={{ color: "white" }} />}
            </ListItem>
          </List>
        </Collapse>

        <Divider sx={{ backgroundColor: "white" }} />
      </List>

      {/* Logout Menu */}
      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Divider sx={{ backgroundColor: "white" }} />
        <List>
          <ListItem alignItems="right">
            <Logout sx={{ color: "white" }} onClick={handleLogout} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
