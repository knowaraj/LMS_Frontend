"use client";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { getUsers, deleteUser, updateUser } from '../util/api';  // Added updateUser import
import { IconButton, CircularProgress, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { RemoveRedEye } from '@mui/icons-material';
import Image from 'next/image';

export default function BasicTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await getUsers(); 
      setUsers(response); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchUsers(); 
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteUser(id);
      if (response) {
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (user) => {
    setEditUser({ ...user });
    setOpenEditDialog(true);
  };

  const handleUpdateUser = async () => {
    try {
      const response = await updateUser(editUser.id, editUser);
      if (response) {
        setUsers(prevUsers =>
          prevUsers.map(user => user.id === editUser.id ? editUser : user)
        );
        setOpenEditDialog(false);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please check the console for details.");
    }
  };
  

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const filteredUsers = users.filter(user => {
    const searchTerm = filterText.toLowerCase().trim();
    return (
      user.id.toString().includes(searchTerm) ||
      user.firstName.toLowerCase().includes(searchTerm) ||
      user.lastName.toLowerCase().includes(searchTerm)
    );
  });

  const rows = filteredUsers.map((user) => ({
    id: user.id, 
    firstName: user.firstName, 
    lastName: user.lastName, 
    address: user.address,
    email: user.email, 
    role: user.role, 
    username: user.username, 
    password: user.password, 
  }));

  return (
    <Box sx={{
      padding: 3,
      backgroundImage: 'url("/bg2.jpg")',
      backgroundSize: 'cover',
      minHeight: '100vh',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      {/* Logo and Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={150}
          height={150}
          style={{ borderRadius: '50%', marginRight: 3 }}
        />
        <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
          BV USERS
        </Typography>
      </Box>

      {/* Search Filter */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Filter by ID or Name"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        sx={{
          mb: 3,
          backgroundColor: 'white',
          borderRadius: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
          }
        }}
      />

      {/* Table Container */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 5 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#34495e', color: 'white' }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#5d6d7e' }}>ID</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#5d6d7e' }}>First Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#5d6d7e' }}>Last Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#5d6d7e' }}>Address</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#5d6d7e' }}>Email</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#5d6d7e' }}>Role</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#5d6d7e' }}>Username</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#5d6d7e' }}>Password</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#5d6d7e' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : rows.length > 0 ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:hover': { backgroundColor: '#ecf0f1' },
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.firstName}</TableCell>
                  <TableCell align="center">{row.lastName}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.role}</TableCell>
                  <TableCell align="center">{row.username}</TableCell>
                  <TableCell align="center">{row.password}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleDelete(row.id)}
                      color="error"
                      title="Delete User"
                      sx={{
                        '&:hover': { backgroundColor: '#f44336', color: 'white' },
                        marginRight: 1,
                      }}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      color="primary"
                      title="Edit User"
                      sx={{
                        '&:hover': { backgroundColor: '#2196f3', color: 'white' },
                        marginRight: 1,
                      }}
                      onClick={() => handleEditUser(row)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="info"
                      title="View User"
                      sx={{
                        '&:hover': { backgroundColor: '#00bcd4', color: 'white' },
                        marginRight: 1,
                      }}
                      onClick={() => handleViewUser(row)}
                    >
                      <RemoveRedEye />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  {users.length === 0 ? 'No users available.' : 'No matching users found.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser ? (
            <>
              <Typography><strong>ID:</strong> {selectedUser.id}</Typography>
              <Typography><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</Typography>
              <Typography><strong>Address:</strong> {selectedUser.address}</Typography>
              <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
              <Typography><strong>Role:</strong> {selectedUser.role}</Typography>
              <Typography><strong>Username:</strong> {selectedUser.username}</Typography>
            </>
          ) : (
            <Typography>No user selected.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {editUser && (
            <>
              <TextField
                margin="dense"
                label="First Name"
                fullWidth
                value={editUser.firstName}
                onChange={(e) => setEditUser({...editUser, firstName: e.target.value})}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Last Name"
                fullWidth
                value={editUser.lastName}
                onChange={(e) => setEditUser({...editUser, lastName: e.target.value})}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Address"
                fullWidth
                value={editUser.address}
                onChange={(e) => setEditUser({...editUser, address: e.target.value})}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                value={editUser.email}
                onChange={(e) => setEditUser({...editUser, email: e.target.value})}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Role"
                fullWidth
                value={editUser.role}
                onChange={(e) => setEditUser({...editUser, role: e.target.value})}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Username"
                fullWidth
                value={editUser.username}
                onChange={(e) => setEditUser({...editUser, username: e.target.value})}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Password"
                fullWidth
                value={editUser.password}
                onChange={(e) => setEditUser({...editUser, password: e.target.value})}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateUser} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}