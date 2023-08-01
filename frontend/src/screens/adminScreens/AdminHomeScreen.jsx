import TableComponent from "../../components/Table";
import React from "react";
import axios from "axios";
import { useEffect,useState } from "react"


const AdminHomeScreen = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/adminHome ");
        setUser(response.data.users);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false); 
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Data</h1>
      <>{loading}</>
      <TableComponent users={user} />
    </div>
  );
};

export default AdminHomeScreen;
