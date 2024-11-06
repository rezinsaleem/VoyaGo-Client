import  { useEffect, useState } from 'react';
import { Table, Button, Avatar, Pagination } from 'antd';
import { axiosAdmin } from '../../../service/axios/axiosAdmin';
import { toast } from 'react-toastify';

interface VerificationDetails {
  govIdType: string;
  govIdNumber: string;
  document: string;
}
type AccountStatus = 'Blocked' | 'UnBlocked';
interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: number;
  userImage: string;
  accountStatus: AccountStatus;
  isVerified: string;
  verificationDetails: VerificationDetails;
}

const BUCKET = import.meta.env.VITE_AWS_S3_BUCKET;
const REGION = import.meta.env.VITE_AWS_S3_REGION;

const UserManage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const { data } = await axiosAdmin().get<User[]>('/getUsers');
      console.log(data);
      if (data) {
        setUsers(data);
        console.log('heyyyy')
      } else {
        toast.error('No Users Found');
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUnblock = async (userId: string, currentStatus: 'Blocked' | 'UnBlocked') => {
    try {
      const newStatus = currentStatus === 'UnBlocked' ? 'Blocked' : 'UnBlocked';
      const {data} = await axiosAdmin().patch(`/users/${userId}/block-unblock`, { accountStatus: newStatus });
      if(data.message === 'success') {
        toast.success(`User has been ${newStatus.toLowerCase()} successfully!`);
        fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const dataSource = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage).map((user) => ({
    _id: user._id,
    userImage: user.userImage ? `https://${BUCKET}.s3.${REGION}.amazonaws.com/${user.userImage}` : '',
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    accountStatus: user.accountStatus,
    isVerified: user.isVerified,
    verificationDetails:user.verificationDetails,
  }));

  const columns = [
    {
      title: 'User Image',
      dataIndex: 'userImage',
      render: (text: string) => <Avatar src={text || '/userdefault.jpg'} />,
      width: '15%',
    },
    {
      title: 'User Name',
      dataIndex: 'name',
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
      width: '25%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
      width: '30%',
    },
    {
      title: 'Mobile',
      dataIndex: 'phoneNumber',
      width: '15%',
    },
    {
      title: 'Action',
      dataIndex: 'accountStatus',
      render: (status: AccountStatus, record: User) => (
        <Button
          onClick={() => handleBlockUnblock(record._id, status)}
          type={status === 'UnBlocked' ? 'default' : 'primary'}
          className='w-24'
        >
          {status === 'UnBlocked' ? 'Block' : 'Unblock'}
        </Button>
      ),
      width: '15%',
    },
  ];

  return (
    <div className="ml-60 mt-16 p-8 overflow-y-auto bg-gray-200 w-[80%] min-h-[600px] mx-auto">
      {users.length === 0 ? (
        <div>
          <h1 className="flex justify-center items-center text-grey-800 text-3xl pt-3 mt-7">
            Users List is Empty
          </h1>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col w-full">
          <h1 className="p-2 m-2 mb-6 text-3xl text-slate-800 font-medium">User Management</h1>
          <Table
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            pagination={false}
            bordered
            rowClassName=""
          />
          <Pagination
            current={currentPage}
            pageSize={usersPerPage}
            total={users.length}
            onChange={handleChangePage}
            showSizeChanger={false}
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
  
};

export default UserManage;
