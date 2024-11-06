import { useEffect, useState } from 'react';
import { axiosAdmin } from '../../../service/axios/axiosAdmin';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Table, Pagination } from 'antd';

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: number;
  userImage: string;
  isVerified: string;
  verificationDetails: VerificationDetails;
}

interface VerificationDetails {
  govIdType: string;
  govIdNumber: string;
  document: string;
}

const UserVerification = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data } = await axiosAdmin().get('/getUsers');
      if (data) {
        const filteredUsers = data.filter((user: User) =>
          user.isVerified === 'true' ||
          user.isVerified === 'pending' ||
          user.isVerified === 'rejected'
        );

        // Sort users with 'pending' status first
        const sortedUsers = filteredUsers.sort((a: User, b: User) => {
          if (a.isVerified === 'pending' && b.isVerified !== 'pending') return -1;
          if (a.isVerified !== 'pending' && b.isVerified === 'pending') return 1;
          return 0;
        });

        setUsers(sortedUsers);
      } else {
        toast.error('No Users Found');
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: 'UserName',
      dataIndex: 'name',
      key: 'name',
      width: 160, // Adjust width as needed
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 230, // Adjust width as needed
    },
    {
      title: 'ID Type',
      dataIndex: ['verificationDetails', 'govIdType'], // Use array notation for nested properties
      key: 'govIdType',
      width: 150, // Adjust width as needed
    },
    {
      title: 'ID Number',
      dataIndex: ['verificationDetails', 'govIdNumber'], // Use array notation for nested properties
      key: 'govIdNumber',
      width: 200, // Adjust width as needed
    },
    {
      title: 'Verification Status',
      dataIndex: 'isVerified',
      key: 'isVerified',
      render: (isVerified: string) => {
        if (isVerified === 'pending') return <span className='text-orange-500'>Pending</span>;
        if (isVerified === 'true') return <span className='text-green-500'>Verified</span>;
        if (isVerified === 'rejected') return <span className='text-red-500'>Rejected</span>;
        return <span className='text-gray-500'>Not Requested</span>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (_text: string, user: User) => (
        <Link to={`/admin/users/${user._id}`}>
          <p className='text-blue-600 underline'>View more...</p>
        </Link>
      ),
    },
  ];

  const paginatedUsers = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <div className="ml-60 mt-16 p-8 overflow-y-auto bg-gray-200 w-[80%] min-h-[600px] mx-auto">
      {users.length === 0 ? (
        <div>
          <h1 className="flex justify-center items-center text-grey-800 text-3xl pt-3 mt-7">
            No User to be verified today.
          </h1>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col w-full">
          <h1 className='p-2 m-2 text-3xl font-medium'>User ID Approval</h1>
          <Table
            dataSource={paginatedUsers}
            columns={columns}
            pagination={false}
            rowKey="_id"
            className="mt-3"
            bordered
            style={{ margin: '0 8px' }} // Set thin margin for cells
          />
          <Pagination
            current={currentPage}
            pageSize={usersPerPage}
            total={users.length}
            onChange={handlePageChange}
            showSizeChanger={false}
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default UserVerification;
